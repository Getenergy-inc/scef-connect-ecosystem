/**
 * Security-aware error mapper utility
 * Maps internal error details to safe, user-friendly messages
 * Prevents information disclosure while maintaining good UX
 */

export const mapErrorToUserMessage = (error: unknown): string => {
  // Type guard for error objects
  const errorObj = error as { code?: string; status?: number; message?: string } | null;
  const errorCode = errorObj?.code || errorObj?.status?.toString();
  const errorMessage = errorObj?.message || '';

  // Database constraint errors
  if (errorCode === '23505') return 'This record already exists.';
  if (errorCode === '23503') return 'Referenced item not found.';
  if (errorCode === '42501') return 'You do not have permission for this action.';
  if (errorCode === '23514') return 'The data provided does not meet requirements.';
  
  // Row-level security errors
  if (errorCode === '42000' || errorMessage.includes('row-level security')) {
    return 'You do not have permission for this action.';
  }

  // Authentication errors - map common patterns
  if (errorMessage.toLowerCase().includes('already registered')) {
    return 'This email is already registered. Please sign in instead.';
  }
  if (errorMessage.toLowerCase().includes('invalid login credentials') || 
      errorMessage.toLowerCase().includes('invalid credentials')) {
    return 'Invalid email or password. Please try again.';
  }
  if (errorMessage.toLowerCase().includes('email not confirmed')) {
    return 'Please confirm your email address before signing in.';
  }
  if (errorMessage.toLowerCase().includes('password')) {
    return 'Password does not meet requirements. Please use at least 6 characters.';
  }
  if (errorMessage.toLowerCase().includes('rate limit')) {
    return 'Too many attempts. Please wait a moment and try again.';
  }
  if (errorMessage.toLowerCase().includes('session')) {
    return 'Your session has expired. Please sign in again.';
  }

  // Storage errors
  if (errorMessage.toLowerCase().includes('file too large')) {
    return 'File is too large. Please choose a smaller file.';
  }
  if (errorMessage.toLowerCase().includes('invalid file type') || 
      errorMessage.toLowerCase().includes('mime type')) {
    return 'Invalid file type. Please upload a supported file format.';
  }

  // Network errors
  if (errorMessage.toLowerCase().includes('network') || 
      errorMessage.toLowerCase().includes('fetch')) {
    return 'Network error. Please check your connection and try again.';
  }

  // Default - generic message that doesn't expose internals
  return 'An error occurred. Please try again.';
};

/**
 * Maps auth-specific errors with more context
 */
export const mapAuthErrorToUserMessage = (error: unknown): string => {
  const errorObj = error as { message?: string } | null;
  const errorMessage = errorObj?.message || '';

  if (errorMessage.toLowerCase().includes('already registered')) {
    return 'This email is already registered. Please sign in instead.';
  }
  if (errorMessage.toLowerCase().includes('invalid login') || 
      errorMessage.toLowerCase().includes('invalid credentials')) {
    return 'Invalid email or password.';
  }
  if (errorMessage.toLowerCase().includes('email not confirmed')) {
    return 'Please check your email and confirm your account.';
  }
  if (errorMessage.toLowerCase().includes('weak password')) {
    return 'Please choose a stronger password with at least 6 characters.';
  }

  return mapErrorToUserMessage(error);
};

/**
 * Maps admin operation errors
 */
export const mapAdminErrorToUserMessage = (operation: string, error: unknown): string => {
  const baseMessage = mapErrorToUserMessage(error);
  
  // If it's a generic error, add context
  if (baseMessage === 'An error occurred. Please try again.') {
    return `Failed to ${operation}. Please try again.`;
  }
  
  return baseMessage;
};
