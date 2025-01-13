var express = require('express');
var router = express.Router();

const fs = require('fs');

const files = fs.readdirSync(__dirname);

for (file of files) {
  if (file.endsWith('.js') && file !== 'index.js') {
    router.use(`/${file.split('.')[0]}`, require(`./${file}`));
  }
}

module.exports = router;
