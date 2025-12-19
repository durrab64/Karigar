import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, Clock, DollarSign } from 'lucide-react';

const MyServices = () => {
    const { user } = useAuth();
    // In a real app, services would be state derived from API
    // Here we just use the user.services mock

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="h2 text-slate-900">My Services</h1>
                <button className="btn btn-primary gap-2">
                    <Plus className="w-4 h-4" /> Add New Service
                </button>
            </div>

            <div className="grid gap-4">
                {user.services?.map(service => (
                    <div key={service.id} className="card p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
                            <div className="flex gap-4 text-sm text-slate-500 mt-1">
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {service.duration}</span>
                                <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> ₹{service.price}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <button className="btn btn-secondary gap-2 text-sm flex-1 md:flex-none">
                                <Edit2 className="w-3 h-3" /> Edit
                            </button>
                            <button className="btn btn-ghost gap-2 text-sm text-red-600 hover:bg-red-50 flex-1 md:flex-none">
                                <Trash2 className="w-3 h-3" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-8 text-center">
                <p className="text-slate-500 mb-4">Want to offer more services?</p>
                <div className="inline-block p-4 bg-white rounded-full shadow-sm mb-2">
                    <Plus className="w-6 h-6 text-slate-400" />
                </div>
            </div>
        </div>
    );
};

export default MyServices;
