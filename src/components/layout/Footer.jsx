import React from 'react';
import { Hammer, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Heart, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer-section bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
            <div className="container mx-auto px-6">

                {/* Newsletter Section - "Award Winning" Element */}
                <div className="mb-20">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl shadow-blue-900/40">
                        {/* Decorative Blobs */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>

                        <div className="relative z-10 mb-8 md:mb-0 md:w-1/2">
                            <h2 className="text-3xl font-display font-bold text-white mb-2">Join the Karigar Community</h2>
                            <p className="text-blue-100 text-lg">Get the latest tips, provider updates, and exclusive offers delivered to your inbox.</p>
                        </div>

                        <div className="relative z-10 w-full md:w-auto flex-1 max-w-md">
                            <form className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all backdrop-blur-sm"
                                />
                                <button type="button" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Subscribe
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <div className="bg-blue-600 text-white p-2.5 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-900/20">
                                <Hammer size={24} fill="white" />
                            </div>
                            <span className="font-display font-bold text-2xl text-slate-100 tracking-tight">Karigar</span>
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            Connecting you with top-rated local professionals for all your home service needs. Trusted, verified, and always on time.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Facebook, href: '#' },
                                { icon: Twitter, href: '#' },
                                { icon: Instagram, href: '#' },
                                { icon: Linkedin, href: '#' }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-600/30"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="font-display font-bold text-lg text-slate-100 mb-6">Popular Services</h4>
                        <ul className="space-y-4">
                            {['Plumbing Services', 'Electrical Repair', 'Home Cleaning', 'Carpentry', 'Painting'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="flex items-center gap-2 group text-slate-400 hover:text-blue-400 transition-colors">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors"></span>
                                        <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="font-display font-bold text-lg text-slate-100 mb-6">Company</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Become a Provider', 'Success Stories', 'Blog', 'Contact Support'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="flex items-center gap-2 group text-slate-400 hover:text-blue-400 transition-colors">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors"></span>
                                        <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 3 */}
                    <div>
                        <h4 className="font-display font-bold text-lg text-slate-100 mb-6">Get in Touch</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-slate-400 hover:text-white transition-colors">
                                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                                <span>support@karigar.com</span>
                            </li>
                            <li className="flex gap-3 text-slate-400">
                                <span className="w-5 h-5 flex items-center justify-center font-bold text-blue-500 shrink-0">P</span>
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex gap-3 text-slate-400">
                                <span className="w-5 h-5 flex items-center justify-center font-bold text-blue-500 shrink-0">A</span>
                                <span>123 Innovation Dr,<br />Tech City, TC 90210</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} Karigar Inc. All rights reserved.
                    </p>

                    <div className="flex gap-8 text-sm font-medium text-slate-500">
                        <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                        <span>Made with</span>
                        <Heart size={14} className="text-red-500 fill-current animate-pulse" />
                        <span>for Karigar</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
