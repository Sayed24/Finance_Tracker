let editingId = null;

function render() {
  getAllItems("income").then(data => {
    list.innerHTML = "";
    data.forEach(i => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${i.title} ($${i.amount})</span>
        <div>
          <button onclick='edit("${i.id}")'>✏️</button>
          <button onclick='remove("${i.id}")'>❌</button>
        </div>
      `;
      list.appendChild(li);
    });
  });
}

window.edit = id => {
  getAllItems("income").then(data => {
    const item = data.find(i => i.id === id);
    if (!item) return;

    editingId = id;
    form.elements[0].value = item.title;
    form.elements[1].value = item.source;
    form.elements[2].value = item.amount;
    form.elements[3].value = item.date;
  });
};

window.remove = id => {
  deleteItem("income", id).then(render);
};

form.onsubmit = e => {
  e.preventDefault();
  const [title, source, amount, date] = form.elements;

  const record = {
    id: editingId || crypto.randomUUID(),
    title: title.value,
    source: source.value,
    amount: +amount.value,
    date: date.value
  };

  (editingId
    ? updateItem("income", record)
    : addItem("income", record)
  ).then(() => {
    editingId = null;
    form.reset();
    render();
  });
};

render();
