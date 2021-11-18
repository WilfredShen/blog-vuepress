export const get = name => {
  const data = window.localStorage.getItem(name);
  try {
    return JSON.parse(data);
  } catch (_) {
    return data;
  }
};

export const set = (name, value) => {
  if (typeof value === "object") value = JSON.stringify(value);
  window.localStorage.setItem(name, value);
};

export const remove = name => {
  window.localStorage.removeItem(name);
};
