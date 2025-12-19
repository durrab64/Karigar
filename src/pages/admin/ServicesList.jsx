import { useData } from '../../context/DataContext';
import { Tag, Trash2, ExternalLink } from 'lucide-react';

const ServicesList = () => {
    const { users, deleteService } = useData();

    // Flatten all services from all providers
    const allServices = users
        .filter(u => u.role === 'provider' && u.services)
        .flatMap(provider =>
            provider.services.map(service => ({
                ...service,
                providerName: provider.name,
                providerId: provider.id,
                category: provider.serviceCategory
            }))
        );

    const handleDelete = (providerId, serviceId) => {
        if (window.confirm('Are you sure you want to remove this listing?')) {
            deleteService(providerId, serviceId);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Service Listings</h2>
                <p className="text-gray-500">Monitor and moderate services offered</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-3">Service Name</th>
                            <th className="px-6 py-3">Provider</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {allServices.length > 0 ? (
                            allServices.map((service) => (
                                <tr key={`${service.providerId}-${service.id}`} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{service.name}</div>
                                        <div className="text-xs text-gray-500">{service.duration}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-600">{service.providerName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                                            <Tag className="w-3 h-3 mr-1" />
                                            {service.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        ₹{service.price}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(service.providerId, service.id)}
                                            className="text-gray-400 hover:text-red-600 transition-colors"
                                            title="Delete Listing"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                    No services listed yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServicesList;
