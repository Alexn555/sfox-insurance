// @ts-nocheck
window.DataStorage = {
    getItem: function(key) {
        return localStorage.getItem(key);
    },
    getObject: function(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    save: function(key, data) {
        localStorage.setItem(key, data);
    },
    saveObject: function(key, object) {
        localStorage.setItem(key, JSON.stringify(object));
    },
    remove: function(key) {
        localStorage.removeItem(key);
    },
    cache: function(key, cbNotSaved, cbSaved, deltaHour, dateService) {
        let delta = deltaHour * 3600000;
        let saved = this.getObject(key);
        if (!saved) {
            cbNotSaved();
        } else {
            cbSaved(saved);
            if (dateService.compareWithCurrent(saved.timestamp) > delta) {
                window.DataStorage.remove(key);
            }
        }
    },
    removeList: function(keyList) {
        keyList.forEach(k => {
            localStorage.removeItem(k);
        });
    },
    removeAll: function() {
        localStorage.clear();
    }
};