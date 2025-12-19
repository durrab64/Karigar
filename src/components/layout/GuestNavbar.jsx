import { useNavigate, useLocation } from 'react-router-dom';
import { Hammer, Wrench, Zap, Sparkles, HammerIcon, PaintBucket, Tv, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { CATEGORIES } from '../../data/mockData';

const GuestNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showServicesDropdown, setShowServicesDropdown] = useState(false);

    // Icon mapping for categories
    const categoryIcons = {
        'Wrench': Wrench,
        'Zap': Zap,
        'SprayCan': Sparkles,
        'Hammer': HammerIcon,
        'PaintRoller': PaintBucket,
        'MonitorSpeaker': Tv,
    };

    // Check if we are on the landing page (transparent/white handling could be added here if needed)
    // For now, we'll keep a consistent look or adapt based on props if needed.
    // Given the LandingPage uses a specific style, let's make this consistent with a glassmorphism effect.

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300 dark:bg-slate-900/80 dark:border-slate-800">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => navigate('/')}
                >
                    <div className="bg-blue-600 p-2 rounded-lg transition-transform group-hover:scale-110">
                        <Hammer className="text-white w-6 h-6" />
                    </div>
                    <span className="font-display font-bold text-2xl text-slate-900 dark:text-white tracking-tight">Karigar</span>
                </div>

                {/* Nav Actions */}
                <div className="flex items-center gap-6">
                    {/* Services Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setShowServicesDropdown(true)}
                        onMouseLeave={() => setShowServicesDropdown(false)}
                    >
                        <button
                            onClick={() => navigate('/services')}
                            className={`relative font-medium text-lg transition-colors group flex items-center gap-1 ${location.pathname.startsWith('/services') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                                }`}
                        >
                            Services
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showServicesDropdown ? 'rotate-180' : ''}`} />
                            {/* Hover Effect: Underline expansion */}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </button>

                        {/* Dropdown Menu */}
                        <div className={`absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-200 origin-top ${showServicesDropdown ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                            }`}>
                            <div className="p-2">
                                {CATEGORIES.map((category) => {
                                    const Icon = categoryIcons[category.icon] || Wrench;
                                    const slug = category.name.toLowerCase().replace(/\s+/g, '-');

                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => {
                                                navigate(`/services/${slug}`);
                                                setShowServicesDropdown(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left group"
                                        >
                                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {category.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>

                    <button
                        onClick={() => navigate('/login')}
                        className="font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-white transition-colors"
                    >
                        Log In
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="btn btn-primary shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default GuestNavbar;
