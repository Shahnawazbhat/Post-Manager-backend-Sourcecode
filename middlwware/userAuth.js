const jwt = require("jsonwebtoken");
const User = require('../models/user');
const dotenv = require('dotenv');


const authentication = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new Error('Authorization header is missing');
    }
console.log(token,"token")
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken?.userId; // Use `userId` here (not `user_id`)
    console.log(userId,"userId")
    if (!userId) {
      return res.status(401).json({ status: 401, error: 'Invalid token' });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(501).json({ success: false, status: 501, message: "Your Account has been Deleted By Admin" });
    }

    console.log('User found:', user);

    // Check account status
    if (user?.account_status === 'Deleted') {
      console.log('User account is deleted');
      return res.status(501).json({ success: false, status: 501, message: "Your Account has been Deleted By Admin" });
    }

    if (user?.account_status === 'Suspended') {
      console.log('User account is suspended');
      return res.status(403).json({ success: false, status: 403, message: "Your Account has been Suspended By Admin" });
    }

    req.user = user;
    await user.save();
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({
      status: 401,
      error: 'Token verification failed',
      message: 'Token verification failed'
    });
  }
};

module.exports = authentication; 
