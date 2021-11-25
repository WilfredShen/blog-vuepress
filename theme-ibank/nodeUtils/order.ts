export const parseOrder = (filePath: string) =>
  filePath
    .split(/\/|\\/)
    .map(s => s.split(".")[0])
    .filter(s => !/readme/i.test(s));
