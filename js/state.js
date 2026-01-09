/* =====================================================
   Global App State – Finance Tracker
===================================================== */

const AppState = {
  income: [],
  expenses: [],
  subscribers: []
};

/* -----------------------------
   LOAD ALL DATA
----------------------------- */
async function loadState() {
  AppState.income = await DB.getAllItems("income");
  AppState.expenses = await DB.getAllItems("expenses");
  notifySubscribers();
}

/* -----------------------------
   SUBSCRIBE SYSTEM
----------------------------- */
function subscribe(fn) {
  AppState.subscribers.push(fn);
}

/* -----------------------------
   NOTIFY ALL PAGES
----------------------------- */
function notifySubscribers() {
  AppState.subscribers.forEach(fn => fn());
}

/* -----------------------------
   CALCULATIONS (SINGLE SOURCE)
----------------------------- */
function calculateTotals() {
  const totalIncome = AppState.income.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalExpenses = AppState.expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses
  };
}

/* -----------------------------
   MUTATIONS (ALWAYS SAFE)
----------------------------- */
async function addIncome(data) {
  await DB.addOrUpdate("income", data);
  await loadState();
}

async function updateIncome(data) {
  await DB.addOrUpdate("income", data);
  await loadState();
}

async function deleteIncome(id) {
  await DB.deleteItem("income", id);
  await loadState();
}

async function addExpense(data) {
  await DB.addOrUpdate("expenses", data);
  await loadState();
}

async function updateExpense(data) {
  await DB.addOrUpdate("expenses", data);
  await loadState();
}

async function deleteExpense(id) {
  await DB.deleteItem("expenses", id);
  await loadState();
}

/* -----------------------------
   EXPOSE GLOBAL
----------------------------- */
window.State = {
  AppState,
  loadState,
  subscribe,
  calculateTotals,
  addIncome,
  updateIncome,
  deleteIncome,
  addExpense,
  updateExpense,
  deleteExpense
};
