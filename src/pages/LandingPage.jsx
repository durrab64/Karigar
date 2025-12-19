import { useNavigate } from 'react-router-dom';
import { Search, Shield, Zap, Star, ArrowRight } from 'lucide-react';
import GuestNavbar from '../components/layout/GuestNavbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO/SEO';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page dark animate-fade-in">
            <SEO
                title="Home"
                description="Find trusted local service providers like plumbers, electricians, and carpenters in your area. Fast, secure, and reliable home services on demand."
                keywords="local services, home services, plumber, electrician, carpenter, handyman, home repair, karigar"
                url="/"
            />
            {/* Navbar */}
            <GuestNavbar />

            {/* Hero Section */}
            <header className="hero-section">
                <div className="container hero-content">
                    <h1 className="hero-title">
                        Your Local Experts,<br />
                        <span className="gradient-text">On Demand.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Connect with top-rated plumbers, electricians, and home service professionals in your neighborhood. Fast, secure, and reliable.
                    </p>
                    <div className="hero-actions">
                        <button onClick={() => navigate('/services')} className="btn btn-primary btn-lg">
                            Find a Professional <ArrowRight size={20} />
                        </button>
                        <button onClick={() => navigate('/login')} className="btn btn-secondary btn-lg">
                            Become a Provider
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-value">5k+</span>
                            <span className="stat-label">Active Providers</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-value">12k+</span>
                            <span className="stat-label">Happy Customers</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-value">4.8</span>
                            <span className="stat-label">Average Rating</span>
                        </div>
                    </div>
                </div>

                {/* Abstract Background Shapes */}
                <div className="hero-blobs">
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                </div>
            </header>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon bg-blue-50 text-blue-600">
                                <Search size={24} />
                            </div>
                            <h3>Smart Search</h3>
                            <p>Find the right professional for your needs in seconds with our advanced filtering.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon bg-purple-50 text-purple-600">
                                <Shield size={24} />
                            </div>
                            <h3>Verified Pros</h3>
                            <p>Every service provider is background checked and verified for your safety.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon bg-amber-50 text-amber-600">
                                <Zap size={24} />
                            </div>
                            <h3>Instant Booking</h3>
                            <p>Schedule appointments that work for you with instant confirmation.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon bg-emerald-50 text-emerald-600">
                                <Star size={24} />
                            </div>
                            <h3>Transparency</h3>
                            <p>Clear pricing, honest reviews, and no hidden fees. Pay for what you get.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LandingPage;
