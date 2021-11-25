export const get = (name: string): string | object | null => {
  const data = window.localStorage.getItem(name);
  if (data)
    try {
      return JSON.parse(data);
    } catch (_) {
      return data;
    }
  return data;
};

export const set = (name: string, value: string | object): void => {
  if (typeof value === "object") value = JSON.stringify(value);
  window.localStorage.setItem(name, value);
};

export const remove = (name: string): void => {
  window.localStorage.removeItem(name);
};
