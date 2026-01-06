/**
 * Environment-aware logging utility
 * Only logs errors in development mode to prevent information disclosure in production
 */
export const logger = {
  error: (message: string, error?: unknown) => {
    if (import.meta.env.DEV) {
      console.error(message, error);
    }
    // In production, errors are silently handled without console output
    // For production error tracking, integrate with a service like Sentry
  },
  warn: (message: string, data?: unknown) => {
    if (import.meta.env.DEV) {
      console.warn(message, data);
    }
  },
  log: (message: string, data?: unknown) => {
    if (import.meta.env.DEV) {
      console.log(message, data);
    }
  }
};
