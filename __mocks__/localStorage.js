export default class LocalStorage {
    constructor() {
      this.localStorage = [];
    }
    
    getStorage = (key) => {
      return this.localStorage[key] || null;
    }
  
    updateStorage = (key, value) => {
      this.localStorage[key] = String(value);
    }

    removeItem = (key) => {
        delete this.localStorage[key];
    }
}

global.localStorage = new LocalStorageMock;