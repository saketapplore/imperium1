// Format date
export const formatDate = (date, format = 'MM/DD/YYYY') => {
    if (!date) return '';

    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    switch (format) {
        case 'MM/DD/YYYY':
            return `${month}/${day}/${year}`;
        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`;
        case 'MMM DD, YYYY':
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        case 'FULL':
            return d.toLocaleString('en-US');
        case 'TIME':
            return `${hours}:${minutes}`;
        default:
            return d.toLocaleDateString();
    }
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// Capitalize first letter
export const capitalizeFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Format currency
export const formatCurrency = (amount, currency = 'USD') => {
    if (amount === null || amount === undefined) return '';

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};

// Format number
export const formatNumber = (number, decimals = 0) => {
    if (number === null || number === undefined) return '';

    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(number);
};

// Validate email
export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Generate random ID
export const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
};

// Deep clone object
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

// Remove empty fields from object
export const removeEmptyFields = (obj) => {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
        if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
            newObj[key] = obj[key];
        }
    });
    return newObj;
};

// Get file size in readable format
export const getFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

// Check if file type is valid
export const isValidFileType = (file, allowedTypes) => {
    return allowedTypes.includes(file.type);
};

// Debounce function
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function
export const throttle = (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

// Get initials from name
export const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    return parts.map(part => part[0]).join('').toUpperCase().substring(0, 2);
};

// Convert object to query string
export const objectToQueryString = (obj) => {
    const params = new URLSearchParams();
    Object.keys(obj).forEach(key => {
        if (obj[key] !== null && obj[key] !== undefined) {
            params.append(key, obj[key]);
        }
    });
    return params.toString();
};

// Parse query string to object
export const queryStringToObject = (queryString) => {
    const params = new URLSearchParams(queryString);
    const obj = {};
    for (const [key, value] of params) {
        obj[key] = value;
    }
    return obj;
};

// Sort array of objects
export const sortBy = (array, key, order = 'asc') => {
    return [...array].sort((a, b) => {
        if (order === 'asc') {
            return a[key] > b[key] ? 1 : -1;
        } else {
            return a[key] < b[key] ? 1 : -1;
        }
    });
};

// Group array by key
export const groupBy = (array, key) => {
    return array.reduce((result, item) => {
        (result[item[key]] = result[item[key]] || []).push(item);
        return result;
    }, {});
};
