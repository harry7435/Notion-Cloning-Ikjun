const storage = window.localStorage;

export const addStorage = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const getStorage = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);

    if (!storedValue) {
      return defaultValue;
    }

    return JSON.parse(storedValue);
  } catch (e) {
    console.log(e);
    return defaultValue;
  }
};

export const removeStorage = (key) => {
  storage.removeItem(key);
};
