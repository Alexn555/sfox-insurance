export default class DataStorage {
    getItem(key) {
        return localStorage.getItem(key);
    }

    getObject(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    save(key, data) {
        localStorage.setItem(key, data);
    }

    saveObject(key, object) {
        localStorage.setItem(key, JSON.stringify(object));
    }

    remove(key) {
        localStorage.removeItem(key);
    }

    removeList(keyList) {
        keyList.forEach(k => {
            localStorage.removeItem(k);
        });
    }

    removeAll() {
        localStorage.clear();
    }
}