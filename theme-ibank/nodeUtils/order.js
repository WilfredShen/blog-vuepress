const parseOrder = filePath =>
  filePath
    .split(/\/|\\/)
    .map(s => s.split(".")[0])
    .filter(s => !/readme/i.test(s));

module.exports = { parseOrder };
