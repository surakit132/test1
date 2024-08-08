export const useLocalStorage = () => {
  const setItem = (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
            console.log("error", error);
    }
  };

  const getItem = (key) => {
    try {
      const item = window.localStorage.getItem(key);
      return item === null ? null : JSON.parse(item);
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };

  const removeItem = (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
            console.log("error", error);
    }
  };

  return { setItem, getItem, removeItem };
};