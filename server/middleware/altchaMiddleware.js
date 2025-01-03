const crypto = require('crypto');
const querystring = require('querystring');


exports.verifyAltchaSolution = async (req, res, next) => {
  const { altchaToken } = req.body;
  
  
  if (!altchaToken) {
    return res.status(400).json({ message: 'ALTCHA token is required.' });
  }

  try {
    // Decode the ALTCHA token
    const payload = JSON.parse(Buffer.from(altchaToken, 'base64').toString('utf8'));
    const { verificationData, signature, algorithm, verified } = payload;

    // Ensure verification is true
    if (!verified) {
      return res.status(400).json({ message: 'ALTCHA verification failed.' });
    }

    // Validate algorithm
    if (algorithm !== 'SHA-256') {
      return res.status(400).json({ message: 'Unsupported algorithm.' });
    }

    // Hash verificationData (raw)
    const hash = crypto.createHash('sha256').update(verificationData).digest();

    // Compute HMAC signature
    const computedSignature = crypto
      .createHmac('sha256', process.env.REACT_APP_ALTCHA_SECRET_KEY)
      .update(hash)
      .digest('hex');

    // Verify signature
    if (computedSignature !== signature) {
      console.error('ALTCHA signature mismatch:', { verificationData, signature, computedSignature });
      return res.status(400).json({ message: 'Invalid ALTCHA signature.' });
    }

    // Parse verificationData to validate fields and classification
    const parsedData = querystring.parse(verificationData);

    // Check spam score
    if (parsedData.score < 3 ) {
      console.error('Spam detected:', { parsedData });
      return res.status(400).json({ message: 'Spam detected.' });
    }

    // Validate fieldsHash (if applicable)
    if (parsedData.fields && parsedData.fieldsHash) {
      const fields = parsedData.fields.split(',');
      const concatenatedFields = fields.map((field) => req.body[field]).join('\n');
      const fieldsHash = crypto.createHash('sha256').update(concatenatedFields).digest('hex');

      if (fieldsHash !== parsedData.fieldsHash) {
        return res.status(400).json({ message: 'Invalid form data.' });
      }
    }

    // Check expiration time
    if (parsedData.expire && parseInt(parsedData.expire, 10) < Date.now() / 1000) {
      console.error('ALTCHA challenge expired:', { parsedData });
      return res.status(400).json({ message: 'ALTCHA challenge expired.' });
    }

    console.log('ALTCHA verification successful:', { parsedData });
    next();
  } catch (err) {
    console.error('ALTCHA verification error:', err);
    return res.status(500).json({ message: 'ALTCHA verification error.', error: err });
  }
};
