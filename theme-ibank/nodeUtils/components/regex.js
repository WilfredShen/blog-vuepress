const isReadme = /^(.*(\/|\\))?readme.md$/i;
const isMarkdown = /\.md$/i;
const isNumber = /^\d+(\.\d+)?$/;
const isInteger = /^\d+$/;
const ignoreFormatter = /(\/|\\)(_|@)/; // 匹配以 "_@" 开头的目录或文件

const matchAny = (str, regs) => {
  for (const reg of regs) if (reg.test(str)) return true;
  return false;
};

module.exports = {
  isReadme,
  isMarkdown,
  isInteger,
  ignoreFormatter,
  matchAny,
};
