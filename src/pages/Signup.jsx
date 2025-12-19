import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Hammer, User, Mail, Lock, Briefcase, ArrowRight, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO/SEO';

const Signup = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer', // Default role
        serviceCategory: 'Plumbing' // Default for provider
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            const result = signup(formData);
            setIsLoading(false);

            if (!result.success) {
                setError(result.message);
            } else {
                // Redirect based on role
                if (formData.role === 'provider') navigate('/provider');
                else navigate('/customer');
            }
        }, 800);
    };

    return (
        <div className="login-page">
            <SEO
                title="Sign Up"
                description="Create your Karigar account. Join as a customer to find local services or as a provider to offer your expertise."
                keywords="sign up, create account, register, join karigar, become a service provider"
                url="/signup"
            />
            <div className="login-container animate-fade-in max-w-md w-full my-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-xl mb-4 shadow-lg shadow-blue-600/20">
                        <Hammer size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2 font-display">Create Account</h1>
                    <p className="text-slate-500">Join Karigar as a Customer or Professional</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Role Selection */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'customer' })}
                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${formData.role === 'customer'
                                ? 'border-blue-600 bg-blue-50 text-blue-700'
                                : 'border-slate-200 hover:border-slate-300 text-slate-500'
                                }`}
                        >
                            <User className="w-6 h-6" />
                            <span className="font-semibold text-sm">Customer</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'provider' })}
                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${formData.role === 'provider'
                                ? 'border-blue-600 bg-blue-50 text-blue-700'
                                : 'border-slate-200 hover:border-slate-300 text-slate-500'
                                }`}
                        >
                            <Briefcase className="w-6 h-6" />
                            <span className="font-semibold text-sm">Provider</span>
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                required
                                className="input pl-10"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

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
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    {formData.role === 'provider' && (
                        <div className="animate-fade-in">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Primary Service</label>
                            <select
                                className="input"
                                value={formData.serviceCategory}
                                onChange={e => setFormData({ ...formData, serviceCategory: e.target.value })}
                            >
                                <option value="Plumbing">Plumbing</option>
                                <option value="Electrician">Electrician</option>
                                <option value="Cleaning">Cleaning</option>
                                <option value="Carpentry">Carpentry</option>
                                <option value="Painting">Painting</option>
                            </select>
                        </div>
                    )}

                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-full py-3 text-lg shadow-lg shadow-blue-600/20 mt-2"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'} <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-slate-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
