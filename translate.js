const readLine = require('readline');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, "enua.dic");


module.exports = {
   translate(word) {
      return new Promise(function (res, rej) {
         const rl = readLine.createInterface({
            input: fs.createReadStream(filePath, "utf-8")
         });
         let matchets = {};
         rl.on('line', (line) => {
            let itemArray = line.split("=");
            if (itemArray[0].startsWith(word)) {
               matchets[itemArray[0]] = itemArray[1];
            }

         });
         rl.on('close', () => {
            if (Object.keys(matchets).length === 0)
               rej("Not object");
            res(matchets);
         });
      });
   }

}
