/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import fs from "fs";
import inquirer from "inquirer";
import qr from "qr-image";
// const qr = require('qr-image');

inquirer
  .prompt([
    {
      type: "input",
      name: "question",
      message: "Enter a URL:",
    },
  ])
  .then((answer) => {
    let image = qr.image(answer.question, { type: 'png' });
    image.pipe(fs.createWriteStream("my_qr_img.png"));
    fs.writeFile("URL.txt", answer.question, (err) => {
        if (err) throw err;
        console.log(`Done!`);
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(`Prompt couldn't be rendered in the current environment`);
      // Prompt couldn't be rendered in the current environment
    } else {
      console.log(`Something went wrong! ${error}`);
      // Something else went wrong
    }
  });
