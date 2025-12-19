import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Search, Star, Shield, ShieldAlert, CheckCircle, Trash2 } from 'lucide-react';

const Providers = () => {
    const { users, deleteUser, updateUserStatus, getProviderStats } = useData();
    const [filter, setFilter] = useState('all'); // all, pending, verified, suspended

    // Get only providers
    const providers = users.filter(u => u.role === 'provider');

    const filteredProviders = providers.filter(p => {
        if (filter === 'all') return true;
        if (filter === 'verified') return p.verified;
        // In a real app we'd have a 'status' field. For now, we mock statuses.
        // Assuming 'verified' is the main status toggle for this demo.
        if (filter === 'pending') return !p.verified;
        return true;
    });

    const handleVerify = (id) => {
        updateUserStatus(id, { verified: true });
    };

    const handleSuspend = (id) => {
        updateUserStatus(id, { verified: false }); // Mock suspension as un-verifying
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to remove this provider?')) {
            deleteUser(id);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Service Providers</h2>
                <p className="text-gray-500">Manage and verify professional accounts</p>
            </div>

            <div className="flex gap-4 border-b">
                {['all', 'verified', 'pending'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`pb-2 px-1 capitalize font-medium transition-colors border-b-2 ${filter === f
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProviders.map(provider => {
                    const stats = getProviderStats(provider.id);

                    return (
                        <div key={provider.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center">
                                    <img src={provider.avatar} alt="" className="w-12 h-12 rounded-full object-cover mr-3" />
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{provider.name}</h3>
                                        <p className="text-sm text-gray-500">{provider.serviceCategory}</p>
                                    </div>
                                </div>
                                {provider.verified && <Shield className="w-5 h-5 text-green-500" />}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-3 rounded-lg">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-gray-800">{stats.completed}</div>
                                    <div className="text-xs text-gray-500">Jobs Done</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-gray-800 flex items-center justify-center">
                                        <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                                        {provider.rating}
                                    </div>
                                    <div className="text-xs text-gray-500">Rating</div>
                                </div>
                            </div>

                            <div className="mt-auto flex gap-2">
                                {!provider.verified ? (
                                    <button
                                        onClick={() => handleVerify(provider.id)}
                                        className="flex-1 flex items-center justify-center py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Approve
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleSuspend(provider.id)}
                                        className="flex-1 flex items-center justify-center py-2 bg-yellow-50 text-yellow-600 rounded-lg text-sm font-medium hover:bg-yellow-100 transition-colors"
                                    >
                                        <ShieldAlert className="w-4 h-4 mr-2" />
                                        Suspend
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(provider.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Providers;
