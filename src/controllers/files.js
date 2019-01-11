const fs = require('fs');

module.exports.getFile = (filepath) => new Promise((resolve, reject) => {
  fs.readFile(filepath, (err, data) => {
    if (err) {
      return reject(err);
    }

    return resolve(data);
  })
});

module.exports.writeFile = (filepath, data) => new Promise((resolve, reject) => {
  fs.writeFile(filepath, data, (err) => {
    if (err) {
      return reject(err);
    }

    return resolve();
  })
});