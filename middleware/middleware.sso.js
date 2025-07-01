const { ConfidentialClientApplication } = require('@azure/msal-node');

const msalConfig = {
  auth: {
    clientId: process.env.AZURE_AD_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}`,
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
  },
};

const cca = new ConfidentialClientApplication(msalConfig);

/**
 * Fastify middleware for Azure AD SSO authentication
 */
async function ssoMiddleware(request, reply) {
  const authHeader = request.headers['authorization'];
  if (!authHeader) {
    return reply.code(401).send({ success: false, message: 'Authorization header missing. Please login via SSO.' });
  }
  if (!authHeader.startsWith('Bearer ')) {
    return reply.code(401).send({ success: false, message: 'Invalid authorization format. Expected Bearer token.' });
  }
  const token = authHeader.split(' ')[1];

  try {
    // Placeholder for real validation
    // In production, validate the JWT token here
    if (!token || token.length < 10) { // rudimentary check
      throw new Error('Token is too short or missing.');
    }
    request.user = { token }; // Placeholder
    return;
  } catch (error) {
    request.log.error(error);
    return reply.code(401).send({ success: false, message: 'SSO authentication failed', error: error.message });
  }
}

module.exports = ssoMiddleware; 