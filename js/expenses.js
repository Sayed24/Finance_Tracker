const form = document.getElementById("expenseForm");
const list = document.getElementById("expenseList");

form.onsubmit = e => {
  e.preventDefault();
  const [title, category, amount, date] = form.elements;
  add("expenses", {
    id: crypto.randomUUID(),
    title: title.value,
    category: category.value,
    amount: +amount.value,
    date: date.value
  });
  form.reset();
  render();
};

function render() {
  getAll("expenses", data => {
    list.innerHTML = "";
    data.forEach(e => {
      const li = document.createElement("li");
      li.innerHTML = `${e.title} - $${e.amount}
        <button onclick="remove('expenses','${e.id}');render()">❌</button>`;
      list.appendChild(li);
    });
  });
}

render();

