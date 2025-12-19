import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Hammer, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO/SEO';

const Login = () => {
    const { login, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (isAuthenticated) {
        if (user.role === 'admin') return <Navigate to="/admin" />;
        if (user.role === 'provider') return <Navigate to="/provider" />;
        return <Navigate to="/customer" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            const result = login(formData.email, formData.password);
            setIsLoading(false);

            if (!result.success) {
                setError(result.message);
            } else {
                // Navigation happens automatically due to isAuthenticated check above or we can force it here
                // user state update triggers re-render
            }
        }, 800);
    };

    return (
        <div className="login-page">
            <SEO
                title="Login"
                description="Sign in to your Karigar account to book local services or manage your service provider profile."
                keywords="login, sign in, karigar login, service provider login"
                url="/login"
            />
            <div className="login-container animate-fade-in max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-xl mb-4 shadow-lg shadow-blue-600/20">
                        <Hammer size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2 font-display">Welcome Back</h1>
                    <p className="text-slate-500">Sign in to continue to Karigar</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="email"
                                required
                                className="input pl-10"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="password"
                                required
                                className="input pl-10"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-full py-3 text-lg shadow-lg shadow-blue-600/20"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'} <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-slate-500">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700">
                            Create Account
                        </Link>
                    </p>
                </div>

                {/* Demo Credentials Hint */}
                <div className="mt-8 p-4 bg-slate-50 rounded-lg text-xs text-slate-500 border border-slate-200">
                    <p className="font-semibold mb-1">Demo Credentials:</p>
                    <div className="grid grid-cols-2 gap-2">
                        <div>Customer: <span className="font-mono text-slate-700">rahul@example.com</span></div>
                        <div>Provider: <span className="font-mono text-slate-700">amit@service.com</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
