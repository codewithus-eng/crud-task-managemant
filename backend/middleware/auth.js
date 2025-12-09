const { verifyToken } = require('../utils/jwt');

function authMiddleware(req, res, next) {
  const auth = req.header('Authorization');
  if (!auth) return res.status(401).json({ message: 'Missing Authorization header' });

  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid Authorization format' });
  }
  const token = parts[1];

  try {
    const payload = verifyToken(token);
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware;
