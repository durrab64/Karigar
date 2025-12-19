import { useState, useMemo } from 'react';
import { Search, MapPin, Star, Filter } from 'lucide-react';
import { USERS, CATEGORIES } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Filter providers
    const providers = useMemo(() => {
        return USERS.filter(u => {
            if (u.role !== 'provider') return false;

            const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.serviceCategory.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || u.serviceCategory === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="h2 text-slate-900">Find a Professional</h1>
                    <p className="text-slate-500 mt-1">Connect with top-rated local service providers</p>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search for plumbers, cleaning, etc..."
                        className="input pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Categories */}
            <div>
                <h3 className="h4 text-slate-900 mb-4">Categories</h3>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border
                        ${selectedCategory === 'All'
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                    >
                        All
                    </button>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border
                            ${selectedCategory === cat.name
                                    ? 'bg-slate-900 text-white border-slate-900'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Providers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers.map(provider => (
                    <div key={provider.id} className="card hover:-translate-y-1 cursor-pointer flex flex-col h-full" onClick={() => navigate(`/customer/provider/${provider.id}`)}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <img src={provider.avatar} alt={provider.name} className="w-12 h-12 rounded-full object-cover bg-slate-100" />
                                <div>
                                    <h3 className="font-semibold text-slate-900">{provider.name}</h3>
                                    <p className="text-sm text-slate-500">{provider.serviceCategory}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-yellow-700 text-xs font-bold">
                                <Star className="w-3 h-3 fill-current" />
                                {provider.rating}
                            </div>
                        </div>

                        <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-grow">
                            {provider.bio}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                            <span className="text-sm font-medium text-slate-900">
                                ₹{provider.hourlyRate}/hr
                            </span>
                            <span className="text-xs text-slate-500">
                                {provider.reviews} reviews
                            </span>
                        </div>
                    </div>
                ))}

                {providers.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        <p className="text-lg">No providers found matching your search.</p>
                        <button onClick={() => { setSearchQuery(''); setSelectedCategory('All') }} className="mt-2 text-indigo-600 font-medium hover:underline">
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Explore;
