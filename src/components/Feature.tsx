// components/Feature.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface FeatureProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    linkTo: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon, linkTo }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <Link to={linkTo} className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Try it now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </Link>
        </div>
    );
};

export default Feature;