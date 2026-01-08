Promise.all([
  getAllItems("income"),
  getAllItems("expenses")
]).then(([income, expenses]) => {
  const totalIncome = income.reduce((s, i) => s + i.amount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

  document.getElementById("totalIncome").textContent = `$${totalIncome}`;
  document.getElementById("totalExpenses").textContent = `$${totalExpenses}`;
  document.getElementById("balance").textContent =
    `$${totalIncome - totalExpenses}`;
});
