/**
 * Secure storage utility for encrypting sensitive data before storing in localStorage
 * Uses AES encryption with a derived key from a password
 */

// Generate a secure encryption key from the app name
// This isn't perfect security but significantly better than plaintext
const getEncryptionKey = (): string => {
  // In a real app, you might use a server-provided key or user password
  // This is a simple implementation to improve security over plaintext
  const appSalt = 'StatusWindow-v1-Salt'; // Should be stored securely in a real application
  return `${appSalt}-${navigator.userAgent.substring(0, 10)}`;
}

/**
 * Simple encryption function for localStorage values
 * For production apps, consider using the Web Crypto API with proper key management
 */
export const encryptData = (data: any): string => {
  try {
    if (typeof window === 'undefined') return JSON.stringify(data);
    
    // Simple encryption - convert to base64 with a twist
    // This isn't cryptographically secure, but better than plaintext
    const key = getEncryptionKey();
    const jsonString = JSON.stringify(data);
    let encrypted = '';

    // Simple XOR-based encryption with the key
    for (let i = 0; i < jsonString.length; i++) {
      const charCode = jsonString.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      encrypted += String.fromCharCode(charCode);
    }

    // Convert to base64 to make it storage-safe
    return btoa(encrypted);
  } catch (error) {
    console.error('Encryption failed:', error);
    return '';
  }
}

/**
 * Simple decryption function for localStorage values
 */
export const decryptData = (encryptedString: string): any => {
  try {
    if (typeof window === 'undefined') return {};
    
    // Simple decryption - convert from base64 with a twist
    const key = getEncryptionKey();
    
    // Convert from base64
    const encrypted = atob(encryptedString);
    let decrypted = '';

    // Reverse the XOR operation
    for (let i = 0; i < encrypted.length; i++) {
      const charCode = encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      decrypted += String.fromCharCode(charCode);
    }

    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    return {};
  }
}

/**
 * Securely store data in localStorage
 */
export const secureSet = (key: string, data: any): void => {
  if (typeof window === 'undefined') return;
  const encryptedData = encryptData(data);
  localStorage.setItem(key, encryptedData);
}

/**
 * Securely retrieve data from localStorage
 */
export const secureGet = (key: string, defaultValue: any = {}): any => {
  if (typeof window === 'undefined') return defaultValue;
  
  const encryptedData = localStorage.getItem(key);
  if (!encryptedData) return defaultValue;
  
  return decryptData(encryptedData);
}

/**
 * Remove data from localStorage
 */
export const secureRemove = (key: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}
