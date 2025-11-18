import crypto from 'crypto';

export function verify_signature(
  method: string,
  path: string,
  body: Buffer | string,
  timestamp: string,
  signature: string,
  secret: string
): boolean {
  try {
    // Check timestamp is within acceptable window (e.g., 5 minutes)
    const now = Math.floor(Date.now() / 1000);
    const requestTime = parseInt(timestamp, 10);
    
    if (isNaN(requestTime)) {
      return false;
    }
    
    // 5 minute window
    const timeDiff = Math.abs(now - requestTime);
    if (timeDiff > 300) {
      return false;
    }

    // Construct the message to sign
    const bodyStr = typeof body === 'string' ? body : body.toString();
    const message = `${method}|${path}|${bodyStr}|${timestamp}`;

    // Generate HMAC signature
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(message);
    const expectedSignature = hmac.digest('hex');

    // Compare signatures (constant-time comparison)
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}
