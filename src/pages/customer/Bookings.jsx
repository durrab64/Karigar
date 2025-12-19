import { useState, useMemo } from 'react';
import { BOOKINGS, USERS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, Star, AlertTriangle } from 'lucide-react';

const CustomerBookings = () => {
    const { user } = useAuth();
    const [trigger, setTrigger] = useState(0); // Hack to force re-render on mock data change

    const bookings = useMemo(() => {
        return BOOKINGS.filter(b => b.customerId === user.id).map(booking => {
            const provider = USERS.find(u => u.id === booking.providerId);
            const serviceName = provider?.services?.find(s => s.id === booking.serviceId)?.name || 'Service';
            return { ...booking, provider, serviceName };
        }).sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [user.id, trigger]);

    const handleCancel = (bookingId) => {
        if (confirm('Are you sure you want to cancel this booking?')) {
            const booking = BOOKINGS.find(b => b.id === bookingId);
            if (booking) {
                booking.status = 'cancelled';
                setTrigger(t => t + 1); // Refresh UI
            }
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'confirmed': return <span className="badge success">Confirmed</span>;
            case 'completed': return <span className="badge success bg-emerald-100 text-emerald-800">Completed</span>;
            case 'cancelled': return <span className="badge destructive">Cancelled</span>;
            default: return <span className="badge warning">Requested</span>;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <h1 className="h2 text-slate-900">My Bookings</h1>
                <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-500 shadow-sm">
                    Total Bookings: <span className="font-bold text-slate-900">{bookings.length}</span>
                </div>
            </div>

            <div className="grid gap-4">
                {bookings.map(booking => (
                    <div key={booking.id} className={`card p-6 flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden
                    ${booking.status === 'cancelled' ? 'opacity-75 bg-slate-50' : 'bg-white'}`}>

                        {/* Visual bar for status */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 
                        ${booking.status === 'confirmed' ? 'bg-emerald-500' :
                                booking.status === 'requested' ? 'bg-amber-400' :
                                    booking.status === 'cancelled' ? 'bg-red-300' : 'bg-blue-500'}`}>
                        </div>

                        <img src={booking.provider.avatar} className="w-16 h-16 rounded-full bg-slate-100 object-cover border border-slate-200" />

                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-lg text-slate-900">{booking.serviceName}</h3>
                                {getStatusBadge(booking.status)}
                            </div>
                            <p className="text-slate-600 mb-2 font-medium">with {booking.provider.name}</p>

                            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                                    <Calendar className="w-4 h-4" /> {booking.date}
                                </div>
                                <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                                    <Clock className="w-4 h-4" /> {booking.time}
                                </div>
                                <div className="flex items-center gap-1 font-semibold text-slate-700">
                                    ₹{booking.totalAmount}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 min-w-[140px]">
                            {['requested', 'confirmed'].includes(booking.status) && (
                                <button
                                    onClick={() => handleCancel(booking.id)}
                                    className="btn btn-secondary text-red-600 hover:bg-red-50 hover:border-red-200 text-sm py-1.5"
                                >
                                    <AlertTriangle className="w-3 h-3" /> Cancel
                                </button>
                            )}

                            {booking.status === 'completed' && !booking.review && (
                                <button className="btn btn-primary text-sm py-1.5">Write Review</button>
                            )}
                            {booking.status === 'completed' && booking.review && (
                                <div className="flex items-center justify-center gap-1 text-amber-600 font-medium text-sm bg-amber-50 py-1 rounded">
                                    <Star className="w-4 h-4 fill-current" /> {booking.review.rating} Rated
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {bookings.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No bookings yet</h3>
                        <p className="text-slate-500">Go explore services to make your first booking.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerBookings;
