const jwt = require('jsonwebtoken');

const secret = 'thisisareallypowerfulsecret';

exports.authenticateUser = async (req, res, next) => {
  try {
    //Check if there is an auth token

    if (!req.headers.authorization) {
      return res.status(401).json({
        status: 'fail',
        message: 'Authorization header is required!',
      });
    }

    const tokenArray = req.headers.authorization.split(' ');

    //Check if token is valid format
    if (tokenArray[0] !== 'Bearer') {
      return res.status(401).json({
        status: 'fail',
        message: 'Authorization format must be: Bearer <token>',
      });
    }

    //Decode token
    const token = tokenArray[1];
    const decodedToken = await jwt.verify(token, secret);

    if (!decodedToken) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid authorization token. Please login!',
      });
    }
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.checkIfAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({
      status: 'fail',
      message: 'This route is restricted to admin users only!',
    });
  }

  next();
};
