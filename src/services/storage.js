export default class DataStorage {
    getItem(key) {
        return localStorage.getItem(key);
    }

    setItem(key, data) {
        localStorage.setItem(key, data);
    }

    remove(key) {
        localStorage.removeItem(key);
    }

    removeAll() {
        localStorage.clear();
    }
}