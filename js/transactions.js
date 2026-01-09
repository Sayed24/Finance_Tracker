/* =====================================================
   Transactions Page Logic
===================================================== */

const listEl = document.getElementById("list");
const searchEl = document.getElementById("search");

const typeEl = document.getElementById("type");
const titleEl = document.getElementById("title");
const amountEl = document.getElementById("amount");
const categoryEl = document.getElementById("category");

const editModal = document.getElementById("editModal");
const editTitle = document.getElementById("editTitle");
const editAmount = document.getElementById("editAmount");
const editCategory = document.getElementById("editCategory");
const saveEditBtn = document.getElementById("saveEdit");

let editTarget = null;
let editType = null;

/* -----------------------------
   ADD
----------------------------- */
document.getElementById("addBtn").onclick = async () => {
  if (!titleEl.value || !amountEl.value) return;

  const data = {
    id: Date.now(),
    title: titleEl.value,
    amount: Number(amountEl.value),
    category: categoryEl.value || "General"
  };

  if (typeEl.value === "income") {
    await State.addIncome(data);
  } else {
    await State.addExpense(data);
  }

  titleEl.value = "";
  amountEl.value = "";
  categoryEl.value = "";
};

/* -----------------------------
   RENDER
----------------------------- */
function renderList() {
  const query = searchEl.value.toLowerCase();
  listEl.innerHTML = "";

  const all = [
    ...State.AppState.income.map(i => ({ ...i, type: "income" })),
    ...State.AppState.expenses.map(e => ({ ...e, type: "expense" }))
  ];

  all
    .filter(i => i.title.toLowerCase().includes(query))
    .sort((a, b) => b.id - a.id)
    .forEach(item => {
      const li = document.createElement("li");

      li.innerHTML = `
        <div class="left">
          <span class="icon">${item.type === "income" ? "➕" : "➖"}</span>
          <div>
            <strong>${item.title}</strong><br>
            <small>${item.category}</small>
          </div>
        </div>

        <div>
          <span class="${item.type === "income" ? "amount-positive" : "amount-negative"}">
            $${item.amount.toFixed(2)}
          </span>
          <div class="actions">
            <button onclick="openEdit(${item.id}, '${item.type}')">
              <i class="fa fa-edit"></i>
            </button>
            <button onclick="removeItem(${item.id}, '${item.type}')">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
      `;

      listEl.appendChild(li);
    });
}

/* -----------------------------
   DELETE
----------------------------- */
async function removeItem(id, type) {
  if (type === "income") {
    await State.deleteIncome(id);
  } else {
    await State.deleteExpense(id);
  }
}

/* -----------------------------
   EDIT
----------------------------- */
function openEdit(id, type) {
  editType = type;
  editTarget = type === "income"
    ? State.AppState.income.find(i => i.id === id)
    : State.AppState.expenses.find(e => e.id === id);

  editTitle.value = editTarget.title;
  editAmount.value = editTarget.amount;
  editCategory.value = editTarget.category;

  editModal.classList.add("active");
}

saveEditBtn.onclick = async () => {
  editTarget.title = editTitle.value;
  editTarget.amount = Number(editAmount.value);
  editTarget.category = editCategory.value;

  if (editType === "income") {
    await State.updateIncome(editTarget);
  } else {
    await State.updateExpense(editTarget);
  }

  editModal.classList.remove("active");
};

/* -----------------------------
   CSV EXPORT
----------------------------- */
function exportCSV() {
  const rows = [
    ["Type", "Title", "Amount", "Category"],
    ...State.AppState.income.map(i => ["Income", i.title, i.amount, i.category]),
    ...State.AppState.expenses.map(e => ["Expense", e.title, e.amount, e.category])
  ];

  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "transactions.csv";
  a.click();
}

/* -----------------------------
   INIT
----------------------------- */
(async function init() {
  await State.loadState();
  State.subscribe(renderList);
  renderList();
})();

searchEl.oninput = renderList;
