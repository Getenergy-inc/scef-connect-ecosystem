/**
 * File validation utilities for secure file uploads
 * Prevents malicious file uploads and enforces consistent limits
 */

// Allowed MIME types by category
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml'
];

export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/epub+zip'
];

export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-msvideo'
];

export const ALLOWED_AUDIO_TYPES = [
  'audio/mpeg',
  'audio/wav',
  'audio/ogg',
  'audio/mp4',
  'audio/x-m4a'
];

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  image: 5 * 1024 * 1024,        // 5MB
  document: 50 * 1024 * 1024,    // 50MB
  video: 100 * 1024 * 1024,      // 100MB
  audio: 50 * 1024 * 1024,       // 50MB
  logo: 2 * 1024 * 1024,         // 2MB
  cover: 5 * 1024 * 1024,        // 5MB
} as const;

export type FileCategory = keyof typeof FILE_SIZE_LIMITS;

interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates a file against allowed types and size limits
 */
export const validateFile = (
  file: File,
  allowedTypes: string[],
  maxSize: number
): FileValidationResult => {
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    const friendlyTypes = allowedTypes
      .map(type => type.split('/')[1]?.toUpperCase() || type)
      .join(', ');
    return {
      isValid: false,
      error: `Invalid file type. Allowed: ${friendlyTypes}`
    };
  }

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return {
      isValid: false,
      error: `File too large. Maximum size: ${maxSizeMB}MB`
    };
  }

  // Additional checks for security
  // Check for potentially dangerous file extensions hidden in the name
  const dangerousExtensions = ['.exe', '.bat', '.cmd', '.sh', '.ps1', '.js', '.vbs'];
  const lowerName = file.name.toLowerCase();
  for (const ext of dangerousExtensions) {
    if (lowerName.includes(ext)) {
      return {
        isValid: false,
        error: 'Invalid file type.'
      };
    }
  }

  return { isValid: true };
};

/**
 * Validates an image file
 */
export const validateImageFile = (file: File, maxSize = FILE_SIZE_LIMITS.image): FileValidationResult => {
  return validateFile(file, ALLOWED_IMAGE_TYPES, maxSize);
};

/**
 * Validates a logo file (smaller size limit)
 */
export const validateLogoFile = (file: File): FileValidationResult => {
  return validateFile(file, ALLOWED_IMAGE_TYPES, FILE_SIZE_LIMITS.logo);
};

/**
 * Validates a cover image file
 */
export const validateCoverFile = (file: File): FileValidationResult => {
  return validateFile(file, ALLOWED_IMAGE_TYPES, FILE_SIZE_LIMITS.cover);
};

/**
 * Validates a document file
 */
export const validateDocumentFile = (file: File): FileValidationResult => {
  return validateFile(file, ALLOWED_DOCUMENT_TYPES, FILE_SIZE_LIMITS.document);
};

/**
 * Validates a video file
 */
export const validateVideoFile = (file: File): FileValidationResult => {
  return validateFile(file, ALLOWED_VIDEO_TYPES, FILE_SIZE_LIMITS.video);
};

/**
 * Validates an audio file
 */
export const validateAudioFile = (file: File): FileValidationResult => {
  return validateFile(file, ALLOWED_AUDIO_TYPES, FILE_SIZE_LIMITS.audio);
};

/**
 * Validates a resource file based on resource type
 */
export const validateResourceFile = (
  file: File,
  resourceType: 'ebook' | 'journal' | 'video' | 'audio'
): FileValidationResult => {
  switch (resourceType) {
    case 'ebook':
    case 'journal':
      return validateDocumentFile(file);
    case 'video':
      return validateVideoFile(file);
    case 'audio':
      return validateAudioFile(file);
    default:
      return { isValid: false, error: 'Unknown resource type' };
  }
};

/**
 * Generates a secure random filename
 */
export const generateSecureFileName = (originalName: string, folder: string): string => {
  const ext = originalName.split('.').pop()?.toLowerCase() || 'bin';
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${folder}/${timestamp}-${randomPart}.${ext}`;
};
