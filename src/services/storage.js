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

    cache(key, cbNotSaved, cbSaved, deltaHour, dateService) {
        let delta = deltaHour * 3600000;
        let saved = this.getObject(key);
        if (!saved) {
            cbNotSaved();
        } else {
            cbSaved(saved);
            if (dateService.compareWithCurrent(saved.timestamp) > delta) {
                this.remove(key);
            }
        }
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