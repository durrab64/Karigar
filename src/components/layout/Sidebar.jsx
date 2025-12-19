import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, Calendar, User, Settings, LogOut, Hammer } from 'lucide-react';

const Sidebar = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    const getLinks = (role) => {
        switch (role) {
            case 'customer':
                return [
                    { to: '/customer', label: 'Explore Services', icon: Search },
                    { to: '/customer/bookings', label: 'My Bookings', icon: Calendar },
                ];
            case 'provider':
                return [
                    { to: '/provider', label: 'Dashboard', icon: LayoutDashboard },
                    { to: '/provider/services', label: 'My Services', icon: Settings },
                ];
            case 'admin':
                return [
                    { to: '/admin', label: 'Overview', icon: LayoutDashboard },
                    { to: '/admin/users', label: 'User Management', icon: User },
                ];
            default:
                return [];
        }
    };

    const links = getLinks(user.role);

    return (
        <aside className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col shadow-sm">
            <div className="h-20 flex items-center px-6 border-b border-slate-100">
                <div className="flex items-center gap-3 text-blue-700">
                    <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                        <Hammer size={20} fill="white" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight font-display">Karigar</h1>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.to !== '/customer'} // Exact match for customer root if needed, but usually explore is root
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm
              ${isActive
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        <link.icon className="w-5 h-5" />
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <div className="flex items-center gap-3 px-3 py-3 mb-2">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-slate-200" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate capitalize">{user.role}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
