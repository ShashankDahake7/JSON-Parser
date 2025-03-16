import React, { useState } from 'react';
import JSONTree from '../components/JSONTree';

const ValidateJSON: React.FC = () => {
    const [jsonInput, setJsonInput] = useState<string>('');
    const [parsedData, setParsedData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const validateJSON = () => {
        try {
            if (!jsonInput.trim()) {
                setError('Please enter JSON data');
                setIsValid(false);
                setParsedData(null);
                return;
            }

            const parsed = JSON.parse(jsonInput);
            setParsedData(parsed);
            setError(null);
            setIsValid(true);
        } catch (err) {
            setParsedData(null);
            setError((err as Error).message);
            setIsValid(false);
        }
    };

    const handleClear = () => {
        setJsonInput('');
        setParsedData(null);
        setError(null);
        setIsValid(null);
    };

    const handleFormat = () => {
        if (!jsonInput.trim()) return;

        try {
            const parsed = JSON.parse(jsonInput);
            setJsonInput(JSON.stringify(parsed, null, 2));
        } catch (err) {
            // If not valid JSON, don't format
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Validate JSON</h1>
                <p className="text-gray-600 mb-8">Paste your JSON data below to validate and visualize it.</p>

                <div className="mb-6">
                    <textarea
                        className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Paste your JSON here..."
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                    />
                </div>

                <div className="flex space-x-3 mb-8">
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-150"
                        onClick={validateJSON}
                    >
                        Validate
                    </button>
                    <button
                        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition duration-150"
                        onClick={handleFormat}
                    >
                        Format
                    </button>
                    <button
                        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition duration-150"
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                </div>

                {isValid === true && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center text-green-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Valid JSON</span>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start text-red-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <p className="font-medium">Invalid JSON</p>
                                <p className="text-sm mt-1">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {parsedData && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">JSON Tree View</h2>
                        <div className="bg-gray-50 p-4 rounded-md overflow-auto max-h-96">
                            <JSONTree data={parsedData} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ValidateJSON;