const process = require('process');
const fs = require('fs');

let path;

if (process.argv.length === 3) {
  path = process.argv[2];
}

function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}`);
      console.log(err.message);
      return;
    }
    console.log(data);
  });
}

cat(path);
