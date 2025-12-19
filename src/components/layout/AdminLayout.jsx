import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, UserCog, ListChecks, MessageSquare, AlertTriangle, LogOut } from 'lucide-react';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/admin', label: 'Overview', icon: LayoutDashboard },
        { path: '/admin/users', label: 'Users', icon: Users },
        { path: '/admin/providers', label: 'Service Providers', icon: UserCog },
        { path: '/admin/services', label: 'Service Listings', icon: ListChecks },
        { path: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
        { path: '/admin/disputes', label: 'Disputes', icon: AlertTriangle },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 border-b flex items-center justify-center">
                    <h1 className="text-2xl font-bold text-blue-600">Karigar Admin</h1>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive
                                                ? 'bg-blue-50 text-blue-600 font-medium'
                                                : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5 mr-3" />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t">
                    <div className="flex items-center mb-4 px-4">
                        <img
                            src={user?.avatar || 'https://i.pravatar.cc/150?u=admin'}
                            alt="Admin"
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                            <p className="font-medium text-sm text-gray-800">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
