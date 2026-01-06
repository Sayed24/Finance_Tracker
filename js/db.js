let db;

const request = indexedDB.open("FinanceDB", 1);

request.onupgradeneeded = e => {
  db = e.target.result;
  db.createObjectStore("income", { keyPath: "id" });
  db.createObjectStore("expenses", { keyPath: "id" });
};

request.onsuccess = e => db = e.target.result;

function add(store, data) {
  db.transaction(store, "readwrite").objectStore(store).add(data);
}

function getAll(store, cb) {
  const req = db.transaction(store).objectStore(store).getAll();
  req.onsuccess = () => cb(req.result);
}

function remove(store, id) {
  db.transaction(store, "readwrite").objectStore(store).delete(id);
}

