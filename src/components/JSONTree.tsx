import React, { useState } from 'react';

interface JSONTreeProps {
    data: any;
    level?: number;
}

const JSONTree: React.FC<JSONTreeProps> = ({ data, level = 0 }) => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const isObject = (value: any) =>
        typeof value === 'object' && value !== null && !Array.isArray(value);

    const isArray = (value: any) => Array.isArray(value);

    const isPrimitive = (value: any) =>
        !isObject(value) && !isArray(value);

    const toggleExpand = (key: string) => {
        setExpanded(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const indentStyle = {
        paddingLeft: `${level * 16}px`
    };

    const renderValue = (value: any, path: string) => {
        if (value === null) {
            return <span className="text-gray-500">null</span>;
        }

        if (typeof value === 'boolean') {
            return <span className="text-purple-600">{value.toString()}</span>;
        }

        if (typeof value === 'number') {
            return <span className="text-blue-600">{value}</span>;
        }

        if (typeof value === 'string') {
            return <span className="text-green-600">"{value}"</span>;
        }

        if (isArray(value)) {
            if (value.length === 0) {
                return <span className="text-gray-500">[]</span>;
            }

            const isExpanded = expanded[path];

            return (
                <div>
                    <span
                        className="cursor-pointer text-gray-800 hover:underline"
                        onClick={() => toggleExpand(path)}
                    >
                        <span className="mr-1">{isExpanded ? '▼' : '▶'}</span>
                        Array({value.length})
                    </span>
                    {isExpanded && (
                        <div className="ml-4">
                            {value.map((item: any, index: number) => (
                                <div key={index} style={indentStyle} className="my-1">
                                    <span className="text-gray-500 mr-2">{index}:</span>
                                    {isPrimitive(item) ? (
                                        renderValue(item, `${path}.${index}`)
                                    ) : (
                                        <JSONTree data={item} level={level + 1} />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        if (isObject(value)) {
            const keys = Object.keys(value);
            if (keys.length === 0) {
                return <span className="text-gray-500">{"{}"}</span>;
            }

            const isExpanded = expanded[path];

            return (
                <div>
                    <span
                        className="cursor-pointer text-gray-800 hover:underline"
                        onClick={() => toggleExpand(path)}
                    >
                        <span className="mr-1">{isExpanded ? '▼' : '▶'}</span>
                        Object({keys.length})
                    </span>
                    {isExpanded && (
                        <div className="ml-4">
                            {keys.map(key => (
                                <div key={key} style={indentStyle} className="my-1">
                                    <span className="text-gray-800 mr-2">"{key}":</span>
                                    {isPrimitive(value[key]) ? (
                                        renderValue(value[key], `${path}.${key}`)
                                    ) : (
                                        <JSONTree data={value[key]} level={level + 1} />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return <span>{String(value)}</span>;
    };

    return (
        <div className="font-mono text-sm">
            {renderValue(data, 'root')}
        </div>
    );
};

export default JSONTree;