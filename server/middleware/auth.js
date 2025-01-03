// Importing the JSON Web Token library for token validation
const jwt = require('jsonwebtoken');

// Middleware to protect routes by verifying the user's JWT
module.exports = (req, res, next) => {
  try {
    // Check if the Authorization header is present
    if (!req.headers.authorization) {
      console.error('No Authorization header found');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    console.log('Received token:', token);

    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID from the token to the request object
    req.auth = { userId: decodedToken.userId };
    console.log('Authenticated userId:', req.auth.userId);

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    console.error('Authentication error:', error);

    // Respond with a 401 status if the token is invalid or missing
    res.status(401).json({ message: 'Unauthorized' });
  }
};
