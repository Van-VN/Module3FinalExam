const http = require("http");
const fs = require("fs");
const qs = require("qs");
const url = require("url");
const port = 8088;
const HomeController = require("./src/controller/home.controller");

const server = http.createServer((req, res) => {
  let parsedUrl = url.parse(req.url, true).pathname;
  let chosenHandlers;
  if (typeof router[parsedUrl] !== "undefined") {
    chosenHandlers = router[parsedUrl];
  } else {
    chosenHandlers = HomeController.notFound;
  }
  chosenHandlers(req, res);
});

server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

const router = {
  "/": HomeController.getHomePage,
  "/detail": HomeController.getHomeStayByID,
  "/add": HomeController.addHomeStay,
  "/delete": HomeController.deleteHome,
  "/edit": HomeController.editHome,
};
