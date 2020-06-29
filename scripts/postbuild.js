console.log("\n\n------ Postbuild Started ------");

var ncp = require("ncp").ncp;

ncp.limit = 16;

/*
 *
 *   Copies all non .tsx and .ts files into the dist folder
 *   Regex: /^(?!.*(tsx|ts)).*$/
 */
ncp(
  "./src",
  "./dist",
  ({ filter: /^(?!.*(tsx|ts)).*$/ },
  (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("done!");
  })
);
