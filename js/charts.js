function renderCharts(income, expenses) {

  // Expense Pie
  const categoryTotals = {};
  expenses.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  new Chart(document.getElementById("expenseChart"), {
    type: "pie",
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals)
      }]
    }
  });

  // Income vs Expense Bar
  new Chart(document.getElementById("summaryChart"), {
    type: "bar",
    data: {
      labels: ["Income", "Expenses"],
      datasets: [{
        data: [
          income.reduce((s,i)=>s+i.amount,0),
          expenses.reduce((s,e)=>s+e.amount,0)
        ]
      }]
    }
  });
}

getAllItems("income", income =>
  getAllItems("expenses", expenses =>
    renderCharts(income, expenses)
  )
);
