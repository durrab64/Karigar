import { useData } from '../../context/DataContext';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const Disputes = () => {
    const { disputes, users, resolveDispute } = useData();

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
            case 'resolved': return 'bg-green-50 text-green-700 border-green-100';
            case 'dismissed': return 'bg-gray-50 text-gray-700 border-gray-100';
            default: return 'bg-gray-50 text-gray-500';
        }
    };

    const handleResolve = (id) => {
        const resolution = prompt('Enter resolution details:');
        if (resolution) {
            resolveDispute(id, resolution);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Dispute Center</h2>
                <p className="text-gray-500">Handle reported issues and conflicts</p>
            </div>

            <div className="space-y-4">
                {disputes.length > 0 ? (
                    disputes.map(dispute => {
                        const raisedBy = users.find(u => u.id === dispute.raisedBy)?.name || 'Unknown';
                        const provider = users.find(u => u.id === dispute.providerId)?.name || 'Unknown';

                        return (
                            <div key={dispute.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(dispute.status)}capitalize`}>
                                                {dispute.status}
                                            </span>
                                            <span className="text-xs text-gray-400 font-mono">#{dispute.id.toUpperCase()}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">{dispute.date}</span>
                                    </div>

                                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{dispute.reason}</h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Raised by <span className="font-medium text-gray-800">{raisedBy}</span> against <span className="font-medium text-gray-800">{provider}</span>
                                    </p>

                                    <div className="bg-red-50 p-4 rounded-lg mb-4 border border-red-100">
                                        <div className="flex gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                            <p className="text-gray-700 text-sm">{dispute.description}</p>
                                        </div>
                                    </div>

                                    {dispute.resolution && (
                                        <div className="bg-green-50 p-4 rounded-lg mb-4 border border-green-100">
                                            <div className="flex gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="font-medium text-green-800 text-sm mb-1">Resolution</p>
                                                    <p className="text-green-700 text-sm">{dispute.resolution}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {dispute.status === 'pending' && (
                                        <div className="flex justify-end gap-3 pt-2">
                                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                                Contact Parties
                                            </button>
                                            <button
                                                onClick={() => handleResolve(dispute.id)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                                            >
                                                Resolve Dispute
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
                        No active disputes.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Disputes;
