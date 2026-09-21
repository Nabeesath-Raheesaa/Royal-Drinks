import jwt from 'jsonwebtoken';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'royal_drinks_super_secret_jwt_key_2026', {
    expiresIn: '30d',
  });
};

export default generateToken;
