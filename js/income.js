const form = document.getElementById("incomeForm");
const list = document.getElementById("incomeList");

form.onsubmit = e => {
  e.preventDefault();
  const [title, source, amount, date] = form.elements;

  addItem("income", {
    id: crypto.randomUUID(),
    title: title.value,
    source: source.value,
    amount: +amount.value,
    date: date.value
  });

  form.reset();
  render();
};

function render() {
  getAllItems("income", data => {
    list.innerHTML = "";
    data.forEach(i => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${i.title} ($${i.amount})
        <button onclick="deleteItem('income','${i.id}'); render()">❌</button>
      `;
      list.appendChild(li);
    });
  });
}

render();
