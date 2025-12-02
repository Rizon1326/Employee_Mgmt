import axios from 'axios';

// Environment configuration
const config = {
  development: {
    baseURL: 'http://localhost:8000/api/',
    timeout: 15000,
    enableLogging: true,
  },
//   production: {
//     baseURL: 'https://your-domain.com/api/',
//     timeout: 10000,
//     enableLogging: false,
//   }
};

// Get current environment config
const currentConfig = config[import.meta.env.MODE as keyof typeof config] || config.development;

// Create Axios instance
export const apiClient = axios.create({
  baseURL: currentConfig.baseURL,
  timeout: currentConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor (for logging in development)
apiClient.interceptors.request.use(
  (config) => {
    if (currentConfig.enableLogging) {
      console.log(`🚀 API Request:`, {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        params: config.params,
        data: config.data,
      });
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor (for error handling and logging)
apiClient.interceptors.response.use(
  (response) => {
    if (currentConfig.enableLogging) {
      console.log(`✅ API Response:`, {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      console.error(`❌ API Error [${status}]:`, {
        url: error.config?.url,
        status,
        data,
      });
      
      // Transform Django REST Framework errors
      const transformedError = {
        message: data?.detail || 'An error occurred',
        errors: data || {},
        status,
      };
      
      return Promise.reject(transformedError);
    } else if (error.request) {
      // Network error
      console.error('❌ Network Error:', error.message);
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        errors: {},
        status: 0,
      });
    } else {
      // Other error
      console.error('❌ Unknown Error:', error.message);
      return Promise.reject({
        message: error.message,
        errors: {},
        status: 0,
      });
    }
  }
);
