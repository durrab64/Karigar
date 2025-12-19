import { useData } from '../../context/DataContext';
import { Users, UserCog, AlertTriangle, CreditCard } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-800">{value}</span>
        </div>
        <h3 className="text-gray-500 font-medium text-sm mb-1">{title}</h3>
        {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
    </div>
);

const AdminOverview = () => {
    const { users, disputes, bookings } = useData();

    const totalUsers = users.length;
    const customers = users.filter(u => u.role === 'customer').length;
    const providers = users.filter(u => u.role === 'provider').length;
    const pendingDisputes = disputes.filter(d => d.status === 'pending').length;

    // Calculate total revenue from completed bookings
    const totalRevenue = bookings
        .filter(b => b.status === 'completed')
        .reduce((sum, b) => sum + b.totalAmount, 0);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                <p className="text-gray-500">Welcome back, here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={totalUsers}
                    icon={Users}
                    color="bg-blue-500"
                    subtext={`${customers} Customers, ${providers} Providers`}
                />
                <StatCard
                    title="Active Providers"
                    value={providers}
                    icon={UserCog}
                    color="bg-green-500"
                    subtext="Verified Professionals"
                />
                <StatCard
                    title="Pending Disputes"
                    value={pendingDisputes}
                    icon={AlertTriangle}
                    color="bg-red-500"
                    subtext="Requires Attention"
                />
                <StatCard
                    title="Total Revenue"
                    value={`₹${totalRevenue.toLocaleString()}`}
                    icon={CreditCard}
                    color="bg-purple-500"
                    subtext="From Completed Bookings"
                />
            </div>

            {/* Recent Activity Section could go here */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                        Verify New Providers
                    </button>
                    <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                        Review Disputes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
