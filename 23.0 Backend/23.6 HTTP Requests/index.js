import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h3>+65 92964804</h3>");
});

app.get("/about", (req, res) => {
  res.send(
    "<h3>I am learning web dev and hope to eventually learn react and react native 🤯</h3>"
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port} http://localhost:${port}`);
});
