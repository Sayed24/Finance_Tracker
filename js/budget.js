/* =====================================================
   Budget Alerts
===================================================== */

const BUDGET_KEY = "monthlyBudget";

function setBudget(amount) {
  localStorage.setItem(BUDGET_KEY, amount);
}

function getBudget() {
  return Number(localStorage.getItem(BUDGET_KEY) || 0);
}

function checkBudget() {
  const budget = getBudget();
  if (!budget) return;

  const totals = State.calculateTotals();
  if (totals.totalExpenses > budget) {
    alert("⚠️ Budget exceeded!");
  }
}

State.subscribe(checkBudget);

window.Budget = { setBudget, getBudget };
