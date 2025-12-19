import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/mockData';
import { Wrench, Zap, Sparkles, HammerIcon, PaintBucket, Tv, ArrowRight } from 'lucide-react';
import GuestNavbar from '../components/layout/GuestNavbar';

const PublicServices = () => {
    const navigate = useNavigate();

    // Icon mapping for categories
    const categoryIcons = {
        'Wrench': Wrench,
        'Zap': Zap,
        'SprayCan': Sparkles,
        'Hammer': HammerIcon,
        'PaintRoller': PaintBucket,
        'MonitorSpeaker': Tv,
    };

    const categoryDescriptions = {
        'Plumbing': 'Expert plumbers for installations, repairs, and emergency services',
        'Electrician': 'Licensed electricians for wiring, repairs, and installations',
        'Cleaning': 'Professional cleaning services for homes and offices',
        'Carpentry': 'Skilled carpenters for furniture, repairs, and custom work',
        'Painting': 'Quality painting services for interior and exterior projects',
        'Appliance Repair': 'Fast and reliable appliance repair technicians',
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100">
            <GuestNavbar />

            <div className="pt-28 pb-12 px-6">
                <div className="max-w-7xl mx-auto space-y-12">

                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-5xl font-bold font-display tracking-tight text-white">
                            Browse All <span className="text-blue-400">Services</span>
                        </h1>
                        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                            Choose from our wide range of professional services. Select a category to find the perfect expert for your needs.
                        </p>
                    </div>

                    {/* Service Categories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {CATEGORIES.map((category) => {
                            const Icon = categoryIcons[category.icon] || Wrench;
                            const slug = category.name.toLowerCase().replace(/\s+/g, '-');
                            const description = categoryDescriptions[category.name] || 'Professional service providers ready to help';

                            return (
                                <button
                                    key={category.id}
                                    onClick={() => navigate(`/services/${slug}`)}
                                    className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700 group text-left relative overflow-hidden"
                                >
                                    {/* Background Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className="inline-flex p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl mb-6 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-all group-hover:scale-110">
                                            <Icon className="w-8 h-8" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                            {description}
                                        </p>

                                        {/* CTA */}
                                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all">
                                            <span>View Professionals</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                            We're constantly adding new services and professionals. Sign up to get notified when new categories become available.
                        </p>
                        <button
                            onClick={() => navigate('/signup')}
                            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
                        >
                            Get Started Today
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicServices;
