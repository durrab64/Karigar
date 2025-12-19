import { useMemo } from 'react';
import { BOOKINGS, USERS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, XCircle, Clock, Calendar, DollarSign, Star, TrendingUp } from 'lucide-react';

const ProviderDashboard = () => {
    const { user } = useAuth();

    // Booking Data Logic
    const { requests, upcoming, stats } = useMemo(() => {
        const myBookings = BOOKINGS.filter(b => b.providerId === user.id);

        const reqs = myBookings.filter(b => b.status === 'requested');
        const upc = myBookings.filter(b => b.status === 'confirmed');
        const completed = myBookings.filter(b => b.status === 'completed');

        const totalEarnings = completed.reduce((sum, b) => sum + b.totalAmount, 0);

        return {
            requests: reqs,
            upcoming: upc,
            stats: {
                earnings: totalEarnings,
                completedCount: completed.length,
                pendingCount: reqs.length
            }
        };
    }, [user.id]);

    const handleAction = (bookingId, action) => {
        // Mock action
        alert(`Booking ${action}ed! (Mock Action)`);
        // In real app, update state/backend
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="h2 text-slate-900">Dashboard</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-500">Current Status:</span>
                    <span className="badge success">Available</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Total Earnings</p>
                        <p className="text-2xl font-bold text-slate-900">₹{stats.earnings}</p>
                    </div>
                </div>
                <div className="card p-6 flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Completed Jobs</p>
                        <p className="text-2xl font-bold text-slate-900">{stats.completedCount}</p>
                    </div>
                </div>
                <div className="card p-6 flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-full">
                        <Star className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Average Rating</p>
                        <p className="text-2xl font-bold text-slate-900">{user.rating}</p>
                    </div>
                </div>
            </div>

            {/* Incoming Requests */}
            <div>
                <h3 className="h3 text-slate-900 mb-4">Incoming Requests ({requests.length})</h3>
                <div className="space-y-4">
                    {requests.map(req => {
                        const customer = USERS.find(u => u.id === req.customerId);
                        return (
                            <div key={req.id} className="card p-6 border-l-4 border-l-amber-400">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <img src={customer?.avatar || ''} className="w-12 h-12 rounded-full bg-slate-200" />
                                        <div>
                                            <h4 className="font-semibold text-slate-900">{customer?.name}</h4>
                                            <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {req.date}</span>
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {req.time}</span>
                                                <span className="font-medium text-slate-700">₹{req.totalAmount}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <button
                                            onClick={() => handleAction(req.id, 'accept')}
                                            className="btn btn-primary flex-1 md:flex-none"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleAction(req.id, 'reject')}
                                            className="btn btn-secondary text-red-600 hover:bg-red-50 hover:border-red-200 flex-1 md:flex-none"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {requests.length === 0 && (
                        <div className="text-center py-8 bg-slate-50 rounded-lg dashed border-2 border-slate-200">
                            <p className="text-slate-500">No pending requests</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Upcoming Jobs */}
            <div className="pt-4">
                <h3 className="h4 text-slate-900 mb-4">Upcoming Schedule</h3>
                <div className="grid gap-4">
                    {upcoming.map(job => {
                        const customer = USERS.find(u => u.id === job.customerId);
                        return (
                            <div key={job.id} className="card p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600 font-bold text-center w-14">
                                        <div className="text-xs uppercase">{new Date(job.date).toLocaleString('default', { month: 'short' })}</div>
                                        <div className="text-lg leading-none">{new Date(job.date).getDate()}</div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900">Service for {customer?.name}</h4>
                                        <p className="text-sm text-slate-500">{job.time} • ₹{job.totalAmount}</p>
                                    </div>
                                </div>
                                <span className="badge success">Confirmed</span>
                            </div>
                        )
                    })}
                    {upcoming.length === 0 && (
                        <p className="text-slate-500 text-sm">No upcoming confirmed bookings.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProviderDashboard;
