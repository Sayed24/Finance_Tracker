let db;
const DB_NAME = "FinanceTrackerDB";

const dbReady = new Promise((resolve, reject) => {
  const request = indexedDB.open(DB_NAME, 1);

  request.onupgradeneeded = e => {
    db = e.target.result;
    if (!db.objectStoreNames.contains("income")) {
      db.createObjectStore("income", { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains("expenses")) {
      db.createObjectStore("expenses", { keyPath: "id" });
    }
  };

  request.onsuccess = e => {
    db = e.target.result;
    resolve();
  };

  request.onerror = () => reject("DB failed");
});

function addItem(store, data) {
  return dbReady.then(() =>
    db.transaction(store, "readwrite").objectStore(store).add(data)
  );
}

function getAllItems(store) {
  return dbReady.then(() =>
    new Promise(resolve => {
      const req = db.transaction(store).objectStore(store).getAll();
      req.onsuccess = () => resolve(req.result);
    })
  );
}

function updateItem(store, data) {
  return dbReady.then(() =>
    db.transaction(store, "readwrite").objectStore(store).put(data)
  );
}

function deleteItem(store, id) {
  return dbReady.then(() =>
    db.transaction(store, "readwrite").objectStore(store).delete(id)
  );
}
