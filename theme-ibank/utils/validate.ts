export function isExternal(str: string) {
  return /^(https?:|mailto:|tel:)/.test(str);
}

export function isWebLink(str: string) {
  return /^(https?:)/.test(str);
}

export function isMailto(str: string) {
  return /^(mailto:)/.test(str);
}

export function isTel(str: string) {
  return /^(tel:)/.test(str);
}

export function validURL(url: string) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

export function isString(str: any) {
  return typeof str === "string" || str instanceof String;
}

export function isArray(arg: any) {
  if (typeof Array.isArray === "undefined") return Object.prototype.toString.call(arg) === "[object Array]";
  return Array.isArray(arg);
}
