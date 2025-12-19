import { createContext, useContext, useState, useEffect } from 'react';
import { USERS, CATEGORIES, BOOKINGS, REVIEWS, DISPUTES } from '../data/mockData';

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [disputes, setDisputes] = useState([]);

    // Initialize data from mock source
    useEffect(() => {
        setUsers([...USERS]);
        setCategories([...CATEGORIES]);
        setBookings([...BOOKINGS]);
        setReviews([...REVIEWS]);
        setDisputes([...DISPUTES]);
    }, []);

    // --- Actions ---

    const deleteUser = (userId) => {
        setUsers(prev => prev.filter(u => u.id !== userId));
    };

    const updateUserStatus = (userId, updates) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
    };

    const deleteService = (providerId, serviceId) => {
        setUsers(prev => prev.map(u => {
            if (u.id === providerId && u.services) {
                return {
                    ...u,
                    services: u.services.filter(s => s.id !== serviceId)
                };
            }
            return u;
        }));
    };

    const deleteReview = (reviewId) => {
        setReviews(prev => prev.filter(r => r.id !== reviewId));
    };

    const resolveDispute = (disputeId, resolution) => {
        setDisputes(prev => prev.map(d => d.id === disputeId ? { ...d, status: 'resolved', resolution } : d));
    };

    const getProviderStats = (providerId) => {
        const providerBookings = bookings.filter(b => b.providerId === providerId);
        const completed = providerBookings.filter(b => b.status === 'completed').length;
        const revenue = providerBookings
            .filter(b => b.status === 'completed')
            .reduce((sum, b) => sum + b.totalAmount, 0);
        return { completed, revenue };
    };

    const value = {
        users,
        categories,
        bookings,
        reviews,
        disputes,
        deleteUser,
        updateUserStatus,
        deleteService,
        deleteReview,
        resolveDispute,
        getProviderStats
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
