const { isInteger } = require("./components/regex");

const parseOrder = filePath =>
  filePath
    .split(/\/|\\/)
    .map(s => s.split(".")[0])
    .filter(s => isInteger.test(s));

module.exports = { parseOrder };
