const process = require('process');
const fs = require('fs');
const axios = require('axios');

let path;
let outputFile;

if (process.argv.length === 5) {
  if (process.argv[2] === '--out') {
    path = process.argv[4];
    outputFile = process.argv[3];
    if (path.split(':')[0] === 'http') {
      webCat(path, writeFile);
    } else {
      cat(path, writeFile);
    }
  }
}

if (process.argv.length === 3) {
  path = process.argv[2];
  if (path.split(':')[0] === 'http') {
    webCat(path, resp => console.log(resp));
  } else {
    cat(path, resp => console.log(resp));
  }
}

function cat(path, cb) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      cb(err.message);
      return;
    }
    cb(data, outputFile);
  });
}

async function webCat(URL, cb) {
  try {
    let promise = await axios.get(URL);
    return cb(promise.data, outputFile);
  } catch (e) {
    return cb(e.message);
  }
}

function writeFile(data, outputFile = '') {
  fs.writeFile(outputFile, data, 'utf8', function(err) {
    if (outputFile === '') {
      console.log(data);
      return;
    } else {
      if (err) {
        console.error(`Couldn't write ${outputFile}`);
        console.log(err.message);
        return;
      }
    }

    console.log(`Created ${outputFile}`);
  });
}
