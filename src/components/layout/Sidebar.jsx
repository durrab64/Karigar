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
        <aside className="w-72 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col shadow-xl z-20">
            <div className="h-24 flex items-center px-8 border-b border-slate-100">
                <div className="flex items-center gap-3 text-blue-700">
                    <div className="bg-blue-600 text-white p-2 rounded-lg shadow-lg shadow-blue-600/20">
                        <Hammer size={24} fill="white" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight font-display text-slate-900">Karigar</h1>
                </div>
            </div>

            <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.to !== '/customer'}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-medium text-base
              ${isActive
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 translate-x-1'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600 hover:translate-x-1'
                            }`
                        }
                    >
                        <link.icon className={`w-5 h-5 ${({ isActive }) => isActive ? 'text-white' : 'text-current'}`} />
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-4 p-3 bg-white border border-slate-200 rounded-xl shadow-sm mb-4">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 capitalize border border-slate-200">
                            {user.role}
                        </span>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
