getAll("income", i =>
  getAll("expenses", e => {
    const income = i.reduce((s,x)=>s+x.amount,0);
    const expenses = e.reduce((s,x)=>s+x.amount,0);
    document.getElementById("totalIncome").textContent = `$${income}`;
    document.getElementById("totalExpenses").textContent = `$${expenses}`;
    document.getElementById("balance").textContent = `$${income-expenses}`;
  })
);

