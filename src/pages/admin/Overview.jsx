import { useMemo } from 'react';
import { USERS, BOOKINGS } from '../../data/mockData';
import { Users, Calendar, DollarSign, Activity } from 'lucide-react';

const AdminOverview = () => {
    const stats = useMemo(() => {
        const totalUsers = USERS.filter(u => u.role !== 'admin').length;
        const totalBookings = BOOKINGS.length;
        const totalRevenue = BOOKINGS.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.totalAmount, 0);

        return { totalUsers, totalBookings, totalRevenue };
    }, []);

    return (
        <div className="space-y-8 animate-fade-in">
            <h1 className="h2 text-slate-900">Platform Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="card p-6 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Total Users</p>
                        <p className="text-2xl font-bold text-slate-900">{stats.totalUsers}</p>
                    </div>
                </div>
                <div className="card p-6 flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Total Bookings</p>
                        <p className="text-2xl font-bold text-slate-900">{stats.totalBookings}</p>
                    </div>
                </div>
                <div className="card p-6 flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Total Revenue</p>
                        <p className="text-2xl font-bold text-slate-900">₹{stats.totalRevenue}</p>
                    </div>
                </div>
                <div className="card p-6 flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-full">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Active Sessions</p>
                        <p className="text-2xl font-bold text-slate-900">12</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-6">
                    <h3 className="h4 text-slate-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {BOOKINGS.slice(0, 5).map(b => {
                            const user = USERS.find(u => u.id === b.customerId);
                            return (
                                <div key={b.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                                    <div className={`w-2 h-2 rounded-full ${b.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-900">New Booking Mock</p>
                                        <p className="text-xs text-slate-500">Customer {user?.name} booked a service</p>
                                    </div>
                                    <span className="text-xs text-slate-400">{b.date}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="card p-6 bg-slate-900 text-white border-slate-900">
                    <h3 className="h4 text-white mb-4">System Health</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm">Server Status</span>
                            <span className="badge success">Optimal</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm">Database</span>
                            <span className="badge success">Connected</span>
                        </div>
                        <div className="mt-8 pt-8 border-t border-slate-800">
                            <p className="text-slate-400 text-xs text-center">Karigar Platform v1.0.0-prototype</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
