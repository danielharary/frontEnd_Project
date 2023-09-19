const idb = {
    async openCostsDB(name, version) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(name, version);

            request.onupgradeneeded = function() {
                const db = request.result;
                if (!db.objectStoreNames.contains('costs')) {
                    db.createObjectStore('costs', { autoIncrement: true });
                }
            };

            request.onsuccess = function() {
                const db = request.result;
                
                db.addCost = function(cost) {
                    return idb.addCost(db, cost);
                };
                db.getAllCosts = function() {
                    return idb.getAllCosts(db);
                };

                resolve(db);
            };

            request.onerror = function() {
                reject(new Error('Error opening database'));
            };
        });
    },

    async addCost(db, cost) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['costs'], 'readwrite');
            const store = transaction.objectStore('costs');
            const request = store.add(cost);

            request.onsuccess = function() {
                resolve(true);
            };

            request.onerror = function() {
                reject(new Error('Error adding cost to the database'));
            };
        });
    },

    async getAllCosts(db) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['costs'], 'readonly');
            const store = transaction.objectStore('costs');
            const request = store.getAll();

            request.onsuccess = function() {
                resolve(request.result);
            };

            request.onerror = function() {
                reject(new Error('Error fetching all costs from the database'));
            };
        });
    }
};

window.idb = idb;
