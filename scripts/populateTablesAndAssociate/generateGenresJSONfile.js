/**
 * Generates genres JSON from genres.txt in which is text copied from www.musicgenrelist.com
 * @author vmlacic
 */
'use strict';
const fs = require('fs');

const generate = () => {
  const genresTxt = fs.readFileSync(__dirname + '/genres.txt');

  const genres = genresTxt.toString().split('\n');
  const writeStream = fs.createWriteStream(__dirname + '/genres.json');

  writeStream.write('[\n');
  genres.forEach((genre, index) => {
    if (index !== genres.length - 1) {
      writeStream.write(`"${genre}",\n`);

    } else {
      writeStream.write(`"${genre}"\n`);
      
    }
  });
  writeStream.write(']');

  writeStream.close();

};

generate();