// utils/jsonParser.ts

/**
 * Custom JSON parser with detailed error reporting
 * @param jsonString The JSON string to parse
 * @returns Parsed JavaScript object or array
 * @throws Error with detailed message about parsing issues
 */
export function parseJSON(jsonString: string): any {
    if (!jsonString || jsonString.trim() === '') {
        throw new Error('Empty JSON string provided');
    }
    try {
        // First attempt with native parser to handle most cases efficiently
        return JSON.parse(jsonString);
    } catch (initialError) {
        // If native parser fails, we'll provide more detailed error information
        try {
            // Find position of error
            const errorPosition = getErrorPosition(initialError as Error);
            const errorLineInfo = getErrorLineInfo(jsonString, errorPosition);
            throw new Error(
                `JSON parsing error: ${(initialError as Error).message}\n` +
                `At line ${errorLineInfo.line}, column ${errorLineInfo.column}:\n` +
                `${errorLineInfo.preview}`
            );
        } catch (detailedError) {
            // If our detailed error finding fails, fall back to the original error
            throw initialError;
        }
    }
}

/**
 * Extract position information from JSON parse error message
 */
function getErrorPosition(error: Error): number {
    const positionMatch = error.message.match(/position\s+(\d+)/i);
    if (positionMatch && positionMatch[1]) {
        return parseInt(positionMatch[1], 10);
    }
    return -1;
}

/**
 * Get line and column information based on position in string
 */
function getErrorLineInfo(jsonString: string, position: number): { line: number; column: number; preview: string } {
    if (position < 0) {
        return { line: 0, column: 0, preview: 'Unknown position' };
    }
    const lines = jsonString.substring(0, position + 1).split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length;
    // Get the problematic line for preview
    const allLines = jsonString.split('\n');
    const errorLine = allLines[line - 1] || '';
    // Create a preview with a pointer to the error position
    let preview = errorLine + '\n';
    preview += ' '.repeat(column - 1) + '^';
    return { line, column, preview };
}

/**
 * Check if a string is valid JSON without throwing
 * @param jsonString String to validate
 * @returns Object with validity and optional error message
 */
export function validateJSON(jsonString: string): { isValid: boolean; error?: string } {
    try {
        parseJSON(jsonString);
        return { isValid: true };
    } catch (err) {
        return {
            isValid: false,
            error: (err as Error).message
        };
    }
}

/**
 * Format JSON string with proper indentation
 * @param jsonString JSON string to format
 * @param spaces Number of spaces for indentation
 * @returns Formatted JSON string
 */
export function formatJSON(jsonString: string, spaces: number = 2): string {
    try {
        const parsed = parseJSON(jsonString);
        return JSON.stringify(parsed, null, spaces);
    } catch (err) {
        // If parsing fails, return the original string
        return jsonString;
    }
}