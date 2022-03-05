exports.authToken = process.env.AUTH_TOKEN;
exports.debug = !!process.env.DEBUG;

exports.port = process.env.PORT || '3000';
exports.baseUrl =  `http://localhost:${exports.port}`;
exports.secretKey = process.env.JWT_SECRET_KEY || 'changeme';