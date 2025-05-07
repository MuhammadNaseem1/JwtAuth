const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.header('Authorization');
  console.log("authHeader", authHeader);

  // Ensure it starts with Bearer and extract the token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Get just the token
  try {
    const decoded = jwt.verify(token, 'pakistan');
    console.log("decoded", decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("error", error);
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = verifyToken;
