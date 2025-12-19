import { createContext, useContext, useState, useEffect } from 'react';
import { USERS } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulate checking for a stored session on mount
    useEffect(() => {
        const storedUserId = localStorage.getItem('karigar_user_id');
        if (storedUserId) {
            const foundUser = USERS.find(u => u.id === storedUserId);
            if (foundUser) {
                setUser(foundUser);
            }
        }
        setLoading(false);
    }, []);

    const login = (userId) => {
        const foundUser = USERS.find(u => u.id === userId);
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('karigar_user_id', userId);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('karigar_user_id');
    };

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        role: user?.role || null
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
