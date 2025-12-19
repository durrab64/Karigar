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

    const login = (email, password) => {
        // Simple mock validation
        const foundUser = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

        // In a real app, we would hash and check password. 
        // For prototype, we accept any password if user exists
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('karigar_user_id', foundUser.id);
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const signup = (userData) => {
        // Check if email already exists
        if (USERS.some(u => u.email === userData.email)) {
            return { success: false, message: 'Email already registered' };
        }

        const newUser = {
            id: `u${Date.now()}`,
            ...userData,
            avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=random`
        };

        USERS.push(newUser);
        setUser(newUser);
        localStorage.setItem('karigar_user_id', newUser.id);
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('karigar_user_id');
    };

    const value = {
        user,
        loading,
        login,
        signup,
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
