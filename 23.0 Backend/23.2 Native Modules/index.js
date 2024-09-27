const fs = require("fs");

fs.writeFile("message.txt", "Hello from Sam.js", (err) => {
  if (err) throw err;
  console.log("The files has been saved.");
});

fs.readFile("./message.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
