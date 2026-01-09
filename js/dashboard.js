/* =====================================================
   Dashboard Logic – Finance Tracker
===================================================== */

let chart = null;

/* -----------------------------
   UPDATE UI
----------------------------- */
function renderDashboard() {
  const totals = State.calculateTotals();

  document.getElementById("totalIncome").textContent =
    "$" + totals.totalIncome.toFixed(2);

  document.getElementById("totalExpenses").textContent =
    "$" + totals.totalExpenses.toFixed(2);

  document.getElementById("balance").textContent =
    "$" + totals.balance.toFixed(2);

  renderChart(totals);
}

/* -----------------------------
   CHART
----------------------------- */
function renderChart(totals) {
  const ctx = document.getElementById("financeChart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Income", "Expenses"],
      datasets: [{
        data: [totals.totalIncome, totals.totalExpenses]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

/* -----------------------------
   INIT
----------------------------- */
(async function init() {
  await State.loadState();
  State.subscribe(renderDashboard);
  renderDashboard();
})();
