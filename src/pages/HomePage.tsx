import React from 'react';
import Feature from '../components/Feature';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
    return (
        <div className="py-12">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Modern JSON Parser & Validator</h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        The easiest way to validate, format, and visualize your JSON data with a beautiful, interactive interface.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <a href="#features" className="bg-white text-blue-600 font-medium px-6 py-3 rounded-lg shadow hover:bg-blue-50 transition duration-150">
                            Explore Features
                        </a>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Feature
                        title="Validate JSON"
                        description="Instantly validate your JSON data and get detailed error messages to fix issues quickly."
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        linkTo="/validate"
                    />
                    <Feature
                        title="Upload JSON"
                        description="Upload and parse JSON files of any size. Visualize your data with a beautiful interactive tree view."
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        }
                        linkTo="/upload"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;