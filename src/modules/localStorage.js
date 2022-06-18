export const getStorage = (item) => JSON.parse(localStorage.getItem(item));

export const updateStorage = (item, arr) => localStorage.setItem(item, JSON.stringify(arr));