const mongoose = require('mongoose');

let instance = null;

class Database {
  constructor() {
    if (!instance) {
      this.mongoConnection = null;
      instance = this;
    }

    return instance;
  }

  async connect(options) {
    try {
      let db = await mongoose.connect(options.CONNECTION_STRING);
      this.mongoConnection = await db;
      console.log('Database connection successful');
    } catch (error) {
      console.error('Database connection error :', err);
      process.exit(1);
    }
  }
}

module.exports = Database;
