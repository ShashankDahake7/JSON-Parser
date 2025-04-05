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
        <div className="group relative bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105">
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition duration-500" />

            <div className="relative p-8 flex flex-col h-full">
                {/* Icon Container */}
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white text-indigo-600 mb-6 transform transition group-hover:rotate-12 duration-500">
                    {icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 transition group-hover:text-yellow-300 duration-300">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-indigo-100 mb-6 flex-grow">
                    {description}
                </p>

                {/* Call to Action */}
                <Link
                    to={linkTo}
                    className="mt-auto inline-flex items-center px-5 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-md hover:bg-indigo-50 hover:shadow-lg transition duration-300"
                >
                    Try it now
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2 transform transition group-hover:translate-x-1 duration-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default Feature;
