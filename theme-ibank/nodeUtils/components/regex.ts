export const isReadme = /^(.*(\/|\\))?readme.md$/i;
export const isMarkdown = /\.md$/i;
export const isNumber = /^\d+(\.\d+)?$/;
export const isInteger = /^\d+$/;
export const ignoreFormatter = /(\/|\\)(_|@)/; // 匹配以 "_@" 开头的目录或文件

export const matchAny = (str: string, regs: RegExp[]) => {
  for (const reg of regs) if (reg.test(str)) return true;
  return false;
};
