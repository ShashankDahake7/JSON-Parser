/**
 * Attempts to parse a JSON string and returns the parsed object
 * @param jsonString - The JSON string to parse
 * @returns The parsed object or null if parsing fails
 */
export const parseJson = (jsonString: string): { data: any; error: string | null } => {
    try {
        const data = JSON.parse(jsonString);
        return { data, error: null };
    } catch (error) {
        return { data: null, error: (error as Error).message };
    }
};

/**
 * Formats a JSON string with proper indentation
 * @param jsonString - The JSON string to format
 * @returns The formatted JSON string or the original if parsing fails
 */
export const formatJson = (jsonString: string): string => {
    try {
        const parsed = JSON.parse(jsonString);
        return JSON.stringify(parsed, null, 2);
    } catch (error) {
        return jsonString;
    }
};

/**
 * Gets the size of a JSON object in kilobytes
 * @param jsonData - The JSON object to measure
 * @returns The size in kilobytes
 */
export const getJsonSize = (jsonData: any): number => {
    const jsonString = JSON.stringify(jsonData);
    // Calculate size in KB
    return jsonString.length / 1024;
};

/**
 * Checks if the provided value is a valid JSON string
 * @param value - The value to check
 * @returns True if the value is a valid JSON string, false otherwise
 */
export const isValidJson = (value: string): boolean => {
    try {
        JSON.parse(value);
        return true;
    } catch (error) {
        return false;
    }
};