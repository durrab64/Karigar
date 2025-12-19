import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { USERS, BOOKINGS } from '../../data/mockData';
import { Star, Clock, MapPin, CheckCircle, ArrowLeft, Calendar, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../../context/AuthContext';

const ProviderProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();

    // Find Provider
    const provider = USERS.find(u => u.id === id);

    // State for Booking Form
    const [selectedService, setSelectedService] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [availabilityError, setAvailabilityError] = useState('');
    const [isBookingSuccess, setIsBookingSuccess] = useState(false);

    if (!provider) return <div className="p-8 text-center text-red-500">Provider not found</div>;

    // Check Availability Logic
    const checkAvailability = (date, time) => {
        const isConflict = BOOKINGS.some(b =>
            b.providerId === provider.id &&
            b.date === date &&
            b.time === time &&
            b.status !== 'cancelled'
        );
        return !isConflict;
    };

    const handleBookClick = (service) => {
        setSelectedService(service);
        setBookingDate('');
        setBookingTime('');
        setAvailabilityError('');
        setIsBookingSuccess(false);
        // Scroll to form or open modal (using inline form for simplicity)
    };

    const confirmBooking = () => {
        if (!bookingDate || !bookingTime) {
            setAvailabilityError('Please select both date and time.');
            return;
        }

        const isAvailable = checkAvailability(bookingDate, bookingTime);

        if (!isAvailable) {
            setAvailabilityError('This slot is already booked. Please choose another time.');
            return;
        }

        // Simulating Booking Creation
        const newBooking = {
            id: `b${Date.now()}`,
            customerId: currentUser.id,
            providerId: provider.id,
            serviceId: selectedService.id,
            status: 'requested',
            date: bookingDate,
            time: bookingTime,
            totalAmount: selectedService.price,
            review: null
        };

        // In a real app, this would be an API call
        // We will "push" to the mock array in memory for this session
        BOOKINGS.push(newBooking);

        setIsBookingSuccess(true);
        setTimeout(() => {
            navigate('/customer/bookings');
        }, 2000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
            <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-4">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Search</span>
            </button>

            {/* Profile Header */}
            <div className="card p-0 overflow-hidden border-0 shadow-md">
                <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="px-8 pb-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start relative -top-12 mb-[-3rem] md:mb-0">
                        <img
                            src={provider.avatar}
                            alt={provider.name}
                            className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
                        />
                        <div className="flex-1 pt-14 md:pt-14 w-full">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="h2 mb-1">{provider.name}</h1>
                                    <div className="flex items-center gap-3 text-slate-600 mb-4">
                                        <span className="badge info">{provider.serviceCategory}</span>
                                        <div className="flex items-center gap-1 text-sm bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="font-bold">{provider.rating}</span>
                                            <span className="text-amber-600/70">({provider.reviews} reviews)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right hidden md:block">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Hourly Rate</p>
                                    <p className="text-3xl font-bold text-slate-900">₹{provider.hourlyRate}</p>
                                </div>
                            </div>

                            <p className="text-slate-600 leading-relaxed max-w-2xl mb-6">
                                {provider.bio}
                            </p>

                            <div className="flex flex-wrap gap-6 text-sm text-slate-500 pt-4 border-t border-slate-100">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    <span>Serving local area (5km radius)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">Background Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Services List */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="h3 flex items-center gap-2">
                        Available Services
                        <span className="text-sm font-normal text-slate-500 ml-2">Select one to book</span>
                    </h3>
                    <div className="grid gap-4">
                        {provider.services?.map(service => (
                            <div
                                key={service.id}
                                className={clsx(
                                    "card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between transition-all cursor-pointer border-2",
                                    selectedService?.id === service.id
                                        ? "border-indigo-600 ring-4 ring-indigo-50 shadow-md"
                                        : "border-transparent hover:border-indigo-100 hover:shadow-md"
                                )}
                                onClick={() => handleBookClick(service)}
                            >
                                <div className="mb-4 sm:mb-0">
                                    <h4 className="font-bold text-lg text-slate-900 mb-1">{service.name}</h4>
                                    <div className="flex items-center gap-4 text-slate-500 text-sm">
                                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {service.duration}</span>
                                        <span>•</span>
                                        <span className="font-semibold text-slate-700">₹{service.price}</span>
                                    </div>
                                </div>
                                <button className={clsx(
                                    "btn btn-sm min-w-[100px]",
                                    selectedService?.id === service.id ? "btn-primary" : "btn-secondary"
                                )}>
                                    {selectedService?.id === service.id ? 'Selected' : 'Select'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Booking Form Sidebar */}
                <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-8 border-t-4 border-t-indigo-500">
                        <h3 className="h4 mb-4">Complete Your Booking</h3>

                        {!selectedService ? (
                            <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                                <Calendar className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                                <p>Select a service from the left to proceed.</p>
                            </div>
                        ) : isBookingSuccess ? (
                            <div className="text-center py-8 bg-green-50 text-green-800 rounded-lg animate-fade-in">
                                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
                                <h4 className="font-bold text-lg mb-1">Booking Requested!</h4>
                                <p className="text-sm">Redirecting to your bookings...</p>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-fade-in">
                                <div className="bg-indigo-50 p-4 rounded-lg mb-2">
                                    <p className="text-xs uppercase font-bold text-indigo-500 mb-1">Service</p>
                                    <p className="font-semibold text-indigo-900">{selectedService.name}</p>
                                    <p className="text-sm text-indigo-700">Total: ₹{selectedService.price}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Select Date</label>
                                    <input
                                        type="date"
                                        className="input"
                                        min={new Date().toISOString().split('T')[0]}
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Select Time</label>
                                    <select
                                        className="input"
                                        value={bookingTime}
                                        onChange={(e) => setBookingTime(e.target.value)}
                                    >
                                        <option value="">-- Select Time --</option>
                                        <option value="09:00">09:00 AM</option>
                                        <option value="10:00">10:00 AM</option>
                                        <option value="11:00">11:00 AM</option>
                                        <option value="12:00">12:00 PM</option>
                                        <option value="14:00">02:00 PM</option>
                                        <option value="15:00">03:00 PM</option>
                                        <option value="16:00">04:00 PM</option>
                                        <option value="17:00">05:00 PM</option>
                                    </select>
                                </div>

                                {availabilityError && (
                                    <div className="flex gap-2 items-start p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
                                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                        <p>{availabilityError}</p>
                                    </div>
                                )}

                                <button
                                    onClick={confirmBooking}
                                    className="btn btn-primary w-full py-3 text-lg shadow-lg shadow-indigo-200"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderProfile;
