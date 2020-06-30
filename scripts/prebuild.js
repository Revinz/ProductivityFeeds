console.log("\n\n------ Prebuild Started ------");

const rimraf = require("rimraf");

rimraf("./dist", function () {
  console.log("Removed ./dist folder");
});
