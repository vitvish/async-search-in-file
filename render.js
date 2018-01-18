const fs = require("fs");
const path = require("path");
const pathFiles = {
  js: "js",
  html: "view",
  css: "css"
};
/**
 * Standart mime-types
 * @type {Object}
 */
const mimeTypes = {
  js: "text/javascript",
  html: "text/html",
  css: "text/css"
};

/**
 * Module render files
 * @param  {Object} res      Response module http
 * @param  {String} typeFile File type
 * @param  {String} fileName Filename
 * @param  {Number} status   Status http code, default - 200
 * @return void
 */
module.exports = function(res, typeFile, fileName, status = 200) {
  let pathFile = "",
    mime = String(mimeTypes[typeFile]);
  pathFile = path.resolve("assets", String(pathFiles[typeFile]));

  if (fs.existsSync(pathFile + "/" + fileName + `.${typeFile}`)) {
    pathFile = pathFile + "/" + fileName + `.${typeFile}`;
  } else {
    pathFile = path.resolve("assets", "view", "error.html");
    mime = "text/html";
    status = 400;
  }

  res.statusCode = status;
  res.setHeader("Content-Type", mime);
  let fileRead = fs.createReadStream(pathFile);
  fileRead.on("data", data => {
    res.write(data);
  });
  fileRead.on("close", data => {
    res.end();
  });
};
