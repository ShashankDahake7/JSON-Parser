import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xl font-bold">JSONify</span>
                    </Link>

                    <nav>
                        <ul className="flex space-x-6">
                            <Link to="/" className="bg-transparent text-white font-semibold py-2 px-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor" />
                                Home
                            </Link>
                            <Link to="/signup" className="bg-white text-indigo-700 hover:bg-indigo-100 font-semibold py-2 px-4 rounded transition duration-150">
                                Signup
                            </Link>
                            <Link to="/signin" className="bg-transparent hover:bg-indigo-800 text-white border-2 border-white font-semibold py-2 px-4 rounded transition duration-150">
                                Signin
                            </Link>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;