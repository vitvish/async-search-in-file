const url = require("url");
const router = require("./router");
const http = require("http")
  .createServer((req, res) => {
	router(req, res, url.parse(req.url));
  })
  .listen(8080, () => {
    console.log("Server running on localhost port 8080...");
  });
