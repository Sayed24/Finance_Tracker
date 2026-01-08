let db;
const request = indexedDB.open("FinanceTrackerDB", 1);

request.onupgradeneeded = e => {
  db = e.target.result;
  db.createObjectStore("income", { keyPath: "id" });
  db.createObjectStore("expenses", { keyPath: "id" });
};

request.onsuccess = e => db = e.target.result;

function addItem(store, data) {
  db.transaction(store, "readwrite").objectStore(store).add(data);
}

function getAllItems(store, cb) {
  const req = db.transaction(store).objectStore(store).getAll();
  req.onsuccess = () => cb(req.result);
}

function deleteItem(store, id) {
  db.transaction(store, "readwrite").objectStore(store).delete(id);
}
