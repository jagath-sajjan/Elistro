import 'dotenv/config';
import jwt from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';

// Initialize JWKS client for Neon Auth
const client = new jwksRsa.JwksClient({
  jwksUri: `https://api.stack-auth.com/api/v1/projects/${process.env.STACK_PROJECT_ID}/.well-known/jwks.json`,
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5
});

// Get signing key from JWKS
function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// Verify JWT token from Neon Auth
function verifyNeonAuthToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, {}, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
}

// Verify JWT token signed by our application
function verifyAppToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
}

// Authentication middleware
async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const token = authHeader.split(' ')[1];
    let decoded;
    
    // Try to verify as Neon Auth token first
    try {
      decoded = await verifyNeonAuthToken(token);
    } catch (neonAuthError) {
      // If Neon Auth verification fails, try as app token
      try {
        decoded = await verifyAppToken(token);
      } catch (appTokenError) {
        return res.status(401).json({ error: 'Invalid token' });
      }
    }
    
    // Add user info to request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
}

export { authenticate, verifyNeonAuthToken, verifyAppToken };