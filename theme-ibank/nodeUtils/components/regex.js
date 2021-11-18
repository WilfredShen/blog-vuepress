const isReadme = /^(.*(\/|\\))?readme.md$/i;
const isMarkdown = /\.md$/i;
const isNumber = /^\d+(\.\d+)?$/;
const isInteger = /^\d+$/;

const matchAny = (str, regs) => {
  for (const reg of regs) if (reg.test(str)) return true;
  return false;
};

module.exports = {
  isReadme,
  isMarkdown,
  isInteger,
  matchAny,
};
