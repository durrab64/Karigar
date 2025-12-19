import { useState } from 'react';
import { USERS } from '../../data/mockData';
import { Search, MoreHorizontal, Shield, Trash2, Ban } from 'lucide-react';

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = USERS.filter(u =>
        u.role !== 'admin' &&
        (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="h2 text-slate-900">User Management</h1>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="input pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="card overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={user.avatar} className="w-10 h-10 rounded-full bg-slate-200" />
                                        <div>
                                            <p className="font-medium text-slate-900">{user.name}</p>
                                            <p className="text-sm text-slate-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 capitalize text-sm text-slate-600">
                                    {user.role === 'provider' ? 'Service Provider' : 'Customer'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`badge ${user.role === 'provider' ? 'success' : 'info'}`}>
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full">
                                            <Ban className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        No users found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManagement;
