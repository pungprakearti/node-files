const process = require('process');
const fs = require('fs');
const axios = require('axios');

let path;

if (process.argv.length === 3) {
  path = process.argv[2];
  if (path.split(':')[0] === 'http') {
    webCat(path);
  } else {
    cat(path);
  }
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

function webCat(URL) {
  axios
    .get(URL)
    .then(resp => {
      console.log(resp.data);
    })
    .catch(error => {
      console.error(`Error getting ${URL}`);
      console.log(error.message);
    });
}
