export const getRaw = (name: string) => window.localStorage.getItem(name);

export const get = (name: string): string | object | null => {
  const data = getRaw(name);
  if (data)
    try {
      return JSON.parse(data);
    } catch (_) {}
  return data;
};

export const set = (name: string, value: string | object) => {
  if (typeof value === "object") value = JSON.stringify(value);
  window.localStorage.setItem(name, value);
};

export const remove = (name: string) => window.localStorage.removeItem(name);
