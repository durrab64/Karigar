import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Search, Filter, Trash2, MoreVertical, Eye } from 'lucide-react';

const UserManagement = () => {
    const { users, deleteUser } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                    <p className="text-gray-500">Manage customer and provider accounts</p>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b flex gap-2">
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${roleFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
                        onClick={() => setRoleFilter('all')}
                    >
                        All Users
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${roleFilter === 'customer' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                        onClick={() => setRoleFilter('customer')}
                    >
                        Customers
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${roleFilter === 'provider' ? 'bg-green-50 text-green-600' : 'text-gray-500 hover:bg-gray-50'}`}
                        onClick={() => setRoleFilter('provider')}
                    >
                        Providers
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <img className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt="" />
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${user.role === 'customer' ? 'bg-blue-100 text-blue-800' :
                                                    user.role === 'provider' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                                {user.role !== 'admin' && (
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="p-1 text-gray-400 hover:text-red-600 rounded"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                        No users found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
