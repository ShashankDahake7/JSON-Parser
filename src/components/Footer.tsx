import React, { useState } from 'react';

const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState<null | 'success' | 'error'>(null);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && email.includes('@')) {
            setSubscriptionStatus('success');
            setEmail('');
            setTimeout(() => setSubscriptionStatus(null), 3000);
        } else {
            setSubscriptionStatus('error');
        }
    };

    return (
        <footer className="bg-[#0e1525] text-white w-full">
            {/* Main content area */}
            <div className="w-full max-w-screen-2xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {/* Brand info */}
                    <div className="col-span-1">
                        <div className="flex items-center mb-4">
                            <div className="bg-blue-600 w-10 h-10 flex items-center justify-center rounded">
                                <span className="text-xl font-bold">{'{}'}</span>
                            </div>
                            <h2 className="text-2xl font-bold ml-3">JSONify</h2>
                        </div>
                        <p className="text-gray-300 mb-6">
                            Modern JSON Parser & Validator with advanced features for developers and teams.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#github" aria-label="GitHub">
                                <svg className="h-6 w-6 text-gray-400 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#twitter" aria-label="Twitter">
                                <svg className="h-6 w-6 text-gray-400 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#linkedin" aria-label="LinkedIn">
                                <svg className="h-6 w-6 text-gray-400 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a href="#discord" aria-label="Discord">
                                <svg className="h-6 w-6 text-gray-400 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.885-.608 1.283a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.283.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-blue-400">Product</h3>
                        <ul className="space-y-2">
                            <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                            <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#documentation" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#api" className="text-gray-300 hover:text-white transition-colors">API Reference</a></li>
                            <li><a href="#changelog" className="text-gray-300 hover:text-white transition-colors">Changelog</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-blue-400">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#blog" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#tutorials" className="text-gray-300 hover:text-white transition-colors">Tutorials</a></li>
                            <li><a href="#examples" className="text-gray-300 hover:text-white transition-colors">Examples</a></li>
                            <li><a href="#community" className="text-gray-300 hover:text-white transition-colors">Community</a></li>
                            <li><a href="#support" className="text-gray-300 hover:text-white transition-colors">Support</a></li>
                        </ul>
                    </div>

                    {/* Subscribe */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-blue-400">Stay Updated</h3>
                        <p className="text-gray-300 mb-4">
                            Subscribe to our newsletter for the latest updates, tips, and tutorials.
                        </p>
                        <form onSubmit={handleSubscribe}>
                            <div className="flex flex-col space-y-2">
                                <div className="flex">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email address"
                                        className="bg-gray-800 text-white px-4 py-2 rounded-l flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r font-medium transition-colors"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                                {subscriptionStatus === 'success' && (
                                    <p className="text-green-400 text-sm">Thanks for subscribing!</p>
                                )}
                                {subscriptionStatus === 'error' && (
                                    <p className="text-red-400 text-sm">Please enter a valid email.</p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800 w-full">
                <div className="max-w-screen-2xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-gray-400 mb-4 sm:mb-0">
                        © {new Date().getFullYear()} JSONify. All rights reserved.
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                        <a href="#terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                        <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#cookie" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
                        <a href="#security" className="text-gray-400 hover:text-white transition-colors">Security</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;