const render = require("./render");
const { translate } = require("./translate");

/**
 * Module routes
 * @param  {Object} req   Request module http
 * @param  {[Object]} res   Response module http
 * @param  {Object} route Object url
 * @return {void}
 */
module.exports = (req, res, route) => {
  const routeSplit = route.path.split(/\.(js|css|html|jpg|jpeg|png|gif)$/i);

  routeSplit[0] =
    routeSplit[0] != "/" ? routeSplit[0].substr(1) : routeSplit[0];

  if (routeSplit[1]) {
    render(res, routeSplit[1], routeSplit[0]);
  } else if (routeSplit[0] == "/") {
    render(res, "html", "translate-node");
  } else if (routeSplit[0] == "word") {
    req.on("data", function(data) {
      if (data) {
        translate(data)
          .then(function(results) {
            res.statusCode = 200;
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(JSON.stringify(results));
          })
          .catch(function() {
              res.end("Not found!");
          });
      }
    });
  } else {
    render(res, "html", "error", 404);
  }
};
