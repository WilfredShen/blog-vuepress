export const isExternal = (str: string) => /^(https?:\/\/|mailto:|tel:)/.test(str);
export const isWebLink = (str: string) => /^(https?:\/\/)/.test(str);
export const isMailto = (str: string) => /^(mailto:)/.test(str);
export const isTel = (str: string) => /^(tel:)/.test(str);
export const isURL = (str: string) => /^(https?|ftp):\/\/$/.test(str);
export const isString = (str: unknown) => typeof str === "string" || str instanceof String;
export const isArray = (arg: unknown) => (Array.isArray ? Array.isArray(arg) : Object.prototype.toString.call(arg) === "[object Array]");
