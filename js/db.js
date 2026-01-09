/* =====================================================
   IndexedDB Core – Finance Tracker
   This file is the SINGLE source of DB truth
===================================================== */

const DB_NAME = "FinanceTrackerDB";
const DB_VERSION = 1;

let dbInstance = null;

/* -----------------------------
   OPEN DATABASE
----------------------------- */
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = event => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("income")) {
        db.createObjectStore("income", { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains("expenses")) {
        db.createObjectStore("expenses", { keyPath: "id" });
      }
    };

    request.onsuccess = event => {
      dbInstance = event.target.result;
      resolve(dbInstance);
    };

    request.onerror = () => {
      reject("❌ Failed to open IndexedDB");
    };
  });
}

/* -----------------------------
   ENSURE DB READY
----------------------------- */
async function getDB() {
  if (dbInstance) return dbInstance;
  return await openDatabase();
}

/* -----------------------------
   CRUD HELPERS
----------------------------- */

async function addOrUpdate(storeName, data) {
  const db = await getDB();
  return new Promise(resolve => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).put(data);
    tx.oncomplete = resolve;
  });
}

async function deleteItem(storeName, id) {
  const db = await getDB();
  return new Promise(resolve => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).delete(id);
    tx.oncomplete = resolve;
  });
}

async function getAllItems(storeName) {
  const db = await getDB();
  return new Promise(resolve => {
    const tx = db.transaction(storeName, "readonly");
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => resolve(req.result || []);
  });
}

async function getItemById(storeName, id) {
  const db = await getDB();
  return new Promise(resolve => {
    const tx = db.transaction(storeName, "readonly");
    const req = tx.objectStore(storeName).get(id);
    req.onsuccess = () => resolve(req.result || null);
  });
}

/* -----------------------------
   EXPOSE GLOBAL (IMPORTANT)
----------------------------- */
window.DB = {
  addOrUpdate,
  deleteItem,
  getAllItems,
  getItemById
};
