import { useState } from 'react';
import { USERS, CATEGORIES } from '../../data/mockData';
import { Search, MapPin, Star, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Explore = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Filter Providers
    const providers = USERS.filter(user => {
        if (user.role !== 'provider') return false;
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.serviceCategory.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || user.serviceCategory === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 font-display mb-2">Find a Professional</h1>
                    <p className="text-slate-500 text-lg">Connect with top-rated local service providers for your needs.</p>
                </div>
            </header>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Try 'Leak repair' or 'House cleaning'..."
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-base"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${selectedCategory === 'All'
                                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                            }`}
                    >
                        All Services
                    </button>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${selectedCategory === cat
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {providers.map(provider => (
                    <div key={provider.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-200 transition-all duration-300 flex flex-col">
                        <div className="p-6 flex gap-4 items-start">
                            <img
                                src={provider.avatar}
                                alt={provider.name}
                                className="w-20 h-20 rounded-2xl object-cover shadow-sm bg-slate-100 group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-xl text-slate-900 truncate mb-1">{provider.name}</h3>
                                    <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-lg text-xs font-bold border border-amber-100">
                                        <Star className="w-3.5 h-3.5 fill-current" /> {provider.rating}
                                    </div>
                                </div>
                                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 mb-2">
                                    {provider.serviceCategory}
                                </span>
                                <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span className="truncate">5km away</span>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 pb-6 flex-1">
                            <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed mb-4">{provider.bio}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {provider.services.slice(0, 2).map(service => (
                                    <span key={service.id} className="bg-slate-50 text-slate-600 px-2 py-1 rounded text-xs border border-slate-100">
                                        {service.name}
                                    </span>
                                ))}
                                {provider.services.length > 2 && (
                                    <span className="bg-slate-50 text-slate-500 px-2 py-1 rounded text-xs border border-slate-100">
                                        +{provider.services.length - 2} more
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                            <div className="pl-2">
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Starting at</p>
                                <p className="text-lg font-bold text-slate-900">₹{provider.hourlyRate}<span className="text-sm font-normal text-slate-500">/hr</span></p>
                            </div>
                            <Link to={`/customer/provider/${provider.id}`} className="btn btn-primary shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40">
                                Book Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {providers.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No professionals found</h3>
                    <p className="text-slate-500 max-w-md mx-auto">We couldn't find any providers matching your search. Try different keywords or category.</p>
                </div>
            )}
        </div>
    );
};

export default Explore;
