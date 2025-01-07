module.exports = {
  PORT: process.env.PORT || '8000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  CONNECTION_STRING:
    process.env.CONNECTION_STRING || 'mongodb://localhost:27017/',
};
