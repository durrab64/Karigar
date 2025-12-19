import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { USERS, CATEGORIES } from '../data/mockData';
import { Search, MapPin, Star, ArrowRight, Filter, SlidersHorizontal } from 'lucide-react';
import GuestNavbar from '../components/layout/GuestNavbar';

const ServiceCategory = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('all');
    const [ratingFilter, setRatingFilter] = useState(0);

    // Convert slug back to category name
    const categoryName = category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Get category info
    const categoryInfo = CATEGORIES.find(c => c.name === categoryName);

    // Filter providers by category and search
    const providers = USERS.filter(user => {
        if (user.role !== 'provider') return false;
        if (user.serviceCategory !== categoryName) return false;

        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.bio.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRating = user.rating >= ratingFilter;

        let matchesPrice = true;
        if (priceFilter === 'low') matchesPrice = user.hourlyRate < 400;
        if (priceFilter === 'medium') matchesPrice = user.hourlyRate >= 400 && user.hourlyRate < 700;
        if (priceFilter === 'high') matchesPrice = user.hourlyRate >= 700;

        return matchesSearch && matchesRating && matchesPrice;
    });

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100">
            <GuestNavbar />

            <div className="pt-28 pb-12 px-6">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <button
                                onClick={() => navigate('/services')}
                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-2 flex items-center gap-1"
                            >
                                ← Back to All Services
                            </button>
                            <h1 className="text-4xl font-bold font-display text-slate-900 dark:text-white">
                                {categoryName} Services
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-2">
                                {providers.length} professional{providers.length !== 1 ? 's' : ''} available
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-4">
                            <SlidersHorizontal className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                            <h3 className="font-semibold text-slate-900 dark:text-white">Filters</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search providers..."
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Price Range */}
                            <div>
                                <select
                                    value={priceFilter}
                                    onChange={(e) => setPriceFilter(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                >
                                    <option value="all">All Prices</option>
                                    <option value="low">Budget (Under ₹400/hr)</option>
                                    <option value="medium">Standard (₹400-700/hr)</option>
                                    <option value="high">Premium (₹700+/hr)</option>
                                </select>
                            </div>

                            {/* Rating */}
                            <div>
                                <select
                                    value={ratingFilter}
                                    onChange={(e) => setRatingFilter(Number(e.target.value))}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                >
                                    <option value="0">All Ratings</option>
                                    <option value="4">4+ Stars</option>
                                    <option value="4.5">4.5+ Stars</option>
                                    <option value="4.8">4.8+ Stars</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Provider Grid */}
                    {providers.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-slate-500 dark:text-slate-400 text-lg">No providers found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {providers.map(provider => (
                                <div key={provider.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-700 group flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img src={provider.avatar} alt={provider.name} className="w-16 h-16 rounded-xl object-cover bg-slate-100 dark:bg-slate-700" />
                                                {provider.verified && (
                                                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800"></div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{provider.name}</h3>
                                                <p className="text-blue-600 dark:text-blue-400 font-medium">{provider.serviceCategory}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg text-amber-600 dark:text-amber-500 font-bold border border-amber-100 dark:border-amber-900/30">
                                            <Star className="w-4 h-4 fill-current" /> {provider.rating}
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8 flex-1">
                                        <p className="text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">{provider.bio}</p>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
                                                <span className="text-slate-400">Reviews:</span> {provider.reviews}
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                                                <span className="text-lg">₹{provider.hourlyRate}</span><span className="text-sm text-slate-500 font-normal">/hr</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-auto">
                                        <button onClick={() => navigate('/login')} className="px-4 py-3 rounded-xl font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm">
                                            View Profile
                                        </button>
                                        <button onClick={() => navigate('/login')} className="px-4 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 text-sm flex items-center justify-center gap-2">
                                            Book Now <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceCategory;
