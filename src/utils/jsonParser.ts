// utils/jsonParser.ts

/**
 * Custom JSON parser implemented from scratch with detailed error reporting
 * @param jsonString The JSON string to parse
 * @returns Parsed JavaScript object or array
 * @throws Error with detailed message about parsing issues
 */
export function parseJSON(jsonString: string): any {
    if (!jsonString || jsonString.trim() === '') {
        throw new Error('Empty JSON string provided');
    }

    // Lexer state
    let pos = 0;
    const length = jsonString.length;

    // Utility function to skip whitespace
    function skipWhitespace() {
        while (pos < length && /\s/.test(jsonString[pos])) {
            pos++;
        }
    }

    // Helper to track line and column for error reporting
    function getLineAndColumn(position: number): { line: number; column: number } {
        const substr = jsonString.substring(0, position);
        const lines = substr.split('\n');
        return {
            line: lines.length,
            column: lines[lines.length - 1].length + 1
        };
    }

    // Create detailed error with line and column info
    function createError(message: string): Error {
        const { line, column } = getLineAndColumn(pos);
        const lines = jsonString.split('\n');
        const errorLine = lines[line - 1] || '';
        let preview = errorLine + '\n';
        preview += ' '.repeat(column - 1) + '^';

        return new Error(
            `JSON parsing error: ${message}\n` +
            `At line ${line}, column ${column}:\n` +
            `${preview}`
        );
    }

    // Check if the current character matches expected
    function expect(char: string) {
        if (pos >= length) {
            throw createError(`Expected '${char}' but reached end of input`);
        }
        if (jsonString[pos] !== char) {
            throw createError(`Expected '${char}' but found '${jsonString[pos]}'`);
        }
        pos++;
    }

    // Parse a JSON string value
    function parseString(): string {
        expect('"');
        let result = '';
        let escaped = false;

        while (pos < length) {
            const char = jsonString[pos++];

            if (escaped) {
                switch (char) {
                    case '"': result += '"'; break;
                    case '\\': result += '\\'; break;
                    case '/': result += '/'; break;
                    case 'b': result += '\b'; break;
                    case 'f': result += '\f'; break;
                    case 'n': result += '\n'; break;
                    case 'r': result += '\r'; break;
                    case 't': result += '\t'; break;
                    case 'u': {
                        if (pos + 4 > length) {
                            throw createError('Incomplete Unicode escape sequence');
                        }
                        const hexCode = jsonString.substring(pos, pos + 4);
                        if (!/^[0-9a-fA-F]{4}$/.test(hexCode)) {
                            throw createError(`Invalid Unicode escape sequence: \\u${hexCode}`);
                        }
                        result += String.fromCharCode(parseInt(hexCode, 16));
                        pos += 4;
                        break;
                    }
                    default:
                        throw createError(`Invalid escape sequence: \\${char}`);
                }
                escaped = false;
            } else if (char === '\\') {
                escaped = true;
            } else if (char === '"') {
                // End of string
                return result;
            } else if (char.charCodeAt(0) < 32) {
                throw createError('Unescaped control character in string');
            } else {
                result += char;
            }
        }

        throw createError('Unterminated string');
    }

    // Parse a JSON number value
    function parseNumber(): number {
        const start = pos;
        let isNegative = false;
        let hasDecimal = false;
        let hasExponent = false;

        // Handle negative sign
        if (jsonString[pos] === '-') {
            isNegative = true;
            pos++;
        }

        // Integer part
        if (jsonString[pos] === '0') {
            pos++;
        } else if (/[1-9]/.test(jsonString[pos])) {
            pos++;
            while (pos < length && /[0-9]/.test(jsonString[pos])) {
                pos++;
            }
        } else {
            throw createError('Invalid number format');
        }

        // Fraction part
        if (pos < length && jsonString[pos] === '.') {
            hasDecimal = true;
            pos++;
            if (!/[0-9]/.test(jsonString[pos])) {
                throw createError('Expected digit after decimal point');
            }
            while (pos < length && /[0-9]/.test(jsonString[pos])) {
                pos++;
            }
        }

        // Exponent part
        if (pos < length && (jsonString[pos] === 'e' || jsonString[pos] === 'E')) {
            hasExponent = true;
            pos++;
            if (jsonString[pos] === '+' || jsonString[pos] === '-') {
                pos++;
            }
            if (!/[0-9]/.test(jsonString[pos])) {
                throw createError('Expected digit in exponent');
            }
            while (pos < length && /[0-9]/.test(jsonString[pos])) {
                pos++;
            }
        }

        const numStr = jsonString.substring(start, pos);
        const num = Number(numStr);

        if (isNaN(num)) {
            throw createError(`Invalid number: ${numStr}`);
        }

        return num;
    }

    // Forward declaration for recursive reference
    let parseValue: () => any;

    // Parse a JSON array
    function parseArray(): any[] {
        const result: any[] = [];
        expect('[');
        skipWhitespace();

        // Handle empty array
        if (pos < length && jsonString[pos] === ']') {
            pos++;
            return result;
        }

        while (pos < length) {
            result.push(parseValue());
            skipWhitespace();

            if (pos < length && jsonString[pos] === ']') {
                pos++;
                return result;
            }

            expect(',');
            skipWhitespace();
        }

        throw createError('Unterminated array');
    }

    // Parse a JSON object
    function parseObject(): Record<string, any> {
        const result: Record<string, any> = {};
        expect('{');
        skipWhitespace();

        // Handle empty object
        if (pos < length && jsonString[pos] === '}') {
            pos++;
            return result;
        }

        while (pos < length) {
            // Keys must be strings
            if (jsonString[pos] !== '"') {
                throw createError('Object key must be a string');
            }

            const key = parseString();
            skipWhitespace();
            expect(':');
            skipWhitespace();

            result[key] = parseValue();
            skipWhitespace();

            if (pos < length && jsonString[pos] === '}') {
                pos++;
                return result;
            }

            expect(',');
            skipWhitespace();
        }

        throw createError('Unterminated object');
    }

    // Parse any JSON value
    parseValue = function (): any {
        skipWhitespace();

        if (pos >= length) {
            throw createError('Unexpected end of input');
        }

        const char = jsonString[pos];

        switch (char) {
            case '{': return parseObject();
            case '[': return parseArray();
            case '"': return parseString();
            case 't':
                if (jsonString.substr(pos, 4) === 'true') {
                    pos += 4;
                    return true;
                }
                throw createError("Expected 'true'");
            case 'f':
                if (jsonString.substr(pos, 5) === 'false') {
                    pos += 5;
                    return false;
                }
                throw createError("Expected 'false'");
            case 'n':
                if (jsonString.substr(pos, 4) === 'null') {
                    pos += 4;
                    return null;
                }
                throw createError("Expected 'null'");
            case '-':
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                return parseNumber();
            default:
                throw createError(`Unexpected character: ${char}`);
        }
    };

    // Start parsing at the root
    const result = parseValue();
    skipWhitespace();

    // Ensure we consumed all input
    if (pos < length) {
        throw createError('Unexpected data after JSON root element');
    }

    return result;
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
        return stringifyJSON(parsed, spaces);
    } catch (err) {
        // If parsing fails, return the original string
        return jsonString;
    }
}

/**
 * Custom JSON stringifier with indentation support
 * @param value Value to stringify
 * @param spaces Number of spaces for indentation
 * @returns Formatted JSON string
 */
export function stringifyJSON(value: any, spaces: number = 0): string {
    // Track indentation
    let indentLevel = 0;
    const indent = spaces > 0 ? ' '.repeat(spaces) : '';

    function getIndent(): string {
        return spaces > 0 ? indent.repeat(indentLevel) : '';
    }

    function stringify(val: any): string {
        if (val === null) return 'null';

        const type = typeof val;

        if (type === 'string') {
            return escapeString(val);
        } else if (type === 'number') {
            return isFinite(val) ? String(val) : 'null';
        } else if (type === 'boolean') {
            return val ? 'true' : 'false';
        } else if (type === 'object') {
            if (Array.isArray(val)) {
                return stringifyArray(val);
            } else {
                return stringifyObject(val);
            }
        }

        return 'null'; // Undefined and functions become null
    }

    function escapeString(str: string): string {
        const escapeMap: Record<string, string> = {
            '"': '\\"',
            '\\': '\\\\',
            '\b': '\\b',
            '\f': '\\f',
            '\n': '\\n',
            '\r': '\\r',
            '\t': '\\t'
        };

        return '"' + str.replace(/[\"\\\b\f\n\r\t\u0000-\u001f]/g, (char) => {
            if (escapeMap[char]) return escapeMap[char];
            return '\\u' + ('0000' + char.charCodeAt(0).toString(16)).slice(-4);
        }) + '"';
    }

    function stringifyArray(arr: any[]): string {
        if (arr.length === 0) return '[]';

        let result = '[';
        indentLevel++;

        if (spaces > 0) {
            result += '\n';
        }

        for (let i = 0; i < arr.length; i++) {
            if (spaces > 0) {
                result += getIndent();
            }

            result += stringify(arr[i]);

            if (i < arr.length - 1) {
                result += ',';
            }

            if (spaces > 0) {
                result += '\n';
            }
        }

        indentLevel--;

        if (spaces > 0) {
            result += getIndent();
        }

        return result + ']';
    }

    function stringifyObject(obj: Record<string, any>): string {
        const keys = Object.keys(obj);
        if (keys.length === 0) return '{}';

        let result = '{';
        indentLevel++;

        if (spaces > 0) {
            result += '\n';
        }

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            if (spaces > 0) {
                result += getIndent();
            }

            result += escapeString(key) + ':';

            if (spaces > 0) {
                result += ' ';
            }

            result += stringify(obj[key]);

            if (i < keys.length - 1) {
                result += ',';
            }

            if (spaces > 0) {
                result += '\n';
            }
        }

        indentLevel--;

        if (spaces > 0) {
            result += getIndent();
        }

        return result + '}';
    }

    return stringify(value);
}