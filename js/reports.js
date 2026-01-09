/* =====================================================
   Monthly Reports Logic
===================================================== */

const monthSelect = document.getElementById("monthSelect");
const incomeEl = document.getElementById("reportIncome");
const expenseEl = document.getElementById("reportExpense");
const balanceEl = document.getElementById("reportBalance");

let chart = null;

/* -----------------------------
   HELPERS
----------------------------- */
function getMonthKey(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/* -----------------------------
   BUILD MONTH LIST
----------------------------- */
function populateMonths() {
  const items = [
    ...State.AppState.income,
    ...State.AppState.expenses
  ];

  const months = [...new Set(items.map(i => getMonthKey(i.id)))].sort().reverse();

  monthSelect.innerHTML = months.map(m =>
    `<option value="${m}">${m}</option>`
  ).join("");
}

/* -----------------------------
   RENDER REPORT
----------------------------- */
function renderReport() {
  const month = monthSelect.value;

  const income = State.AppState.income
    .filter(i => getMonthKey(i.id) === month)
    .reduce((s, i) => s + i.amount, 0);

  const expenses = State.AppState.expenses
    .filter(e => getMonthKey(e.id) === month)
    .reduce((s, e) => s + e.amount, 0);

  incomeEl.textContent = "$" + income.toFixed(2);
  expenseEl.textContent = "$" + expenses.toFixed(2);
  balanceEl.textContent = "$" + (income - expenses).toFixed(2);

  renderChart(income, expenses);
}

/* -----------------------------
   CHART
----------------------------- */
function renderChart(income, expenses) {
  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("reportChart"), {
    type: "pie",
    data: {
      labels: ["Income", "Expenses"],
      datasets: [{
        data: [income, expenses]
      }]
    },
    options: {
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}

/* -----------------------------
   INIT
----------------------------- */
(async function init() {
  await State.loadState();
  populateMonths();
  if (monthSelect.value) renderReport();
})();

monthSelect.onchange = renderReport;
