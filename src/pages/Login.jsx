import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { USERS } from '../data/mockData';
import { User, Briefcase, ShieldCheck, ArrowRight } from 'lucide-react';

const Login = () => {
    const { login, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    if (isAuthenticated) {
        if (user.role === 'admin') return <Navigate to="/admin" />;
        if (user.role === 'provider') return <Navigate to="/provider" />;
        return <Navigate to="/customer" />;
    }

    const handleLogin = (userId) => {
        const success = login(userId);
        if (!success) {
            setError('Failed to login. User not found.');
        }
        const loggedInUser = USERS.find(u => u.id === userId);
        if (loggedInUser) {
            if (loggedInUser.role === 'admin') navigate('/admin');
            else if (loggedInUser.role === 'provider') navigate('/provider');
            else navigate('/customer');
        }
    };

    const getIcon = (role) => {
        switch (role) {
            case 'admin': return <ShieldCheck className="role-icon admin" />;
            case 'provider': return <Briefcase className="role-icon provider" />;
            default: return <User className="role-icon customer" />;
        }
    };

    return (
        <div className="login-page">
            <div className="login-container animate-fade-in">
                <div className="login-header">
                    <h1 className="h1 gradient-text">Welcome Back</h1>
                    <p className="text-secondary">Select your persona to continue your journey with Karigar</p>
                </div>

                <div className="personas-grid">
                    {USERS.map((u) => (
                        <button
                            key={u.id}
                            onClick={() => handleLogin(u.id)}
                            className="persona-card"
                        >
                            <div className="persona-icon-wrapper">
                                {getIcon(u.role)}
                            </div>
                            <div className="persona-info">
                                <h3 className="persona-name">{u.name}</h3>
                                <span className={`badge ${u.role === 'admin' ? 'destructive' : u.role === 'provider' ? 'success' : 'info'}`}>
                                    {u.role === 'provider' ? 'Provider' : u.role}
                                </span>
                            </div>
                            <div className="persona-arrow">
                                <ArrowRight size={16} />
                            </div>
                        </button>
                    ))}
                </div>

                {error && (
                    <div className="error-banner">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
