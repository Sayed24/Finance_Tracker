export function filterByPeriod(data, period) {
  const now = new Date();

  return data.filter(item => {
    const d = new Date(item.date);

    if (period === "daily")
      return d.toDateString() === now.toDateString();

    if (period === "monthly")
      return d.getMonth() === now.getMonth() &&
             d.getFullYear() === now.getFullYear();

    if (period === "yearly")
      return d.getFullYear() === now.getFullYear();

    return true;
  });
}

export function sortData(data, type) {
  if (type === "amount-asc") return data.sort((a,b)=>a.amount-b.amount);
  if (type === "amount-desc") return data.sort((a,b)=>b.amount-a.amount);
  if (type === "date-new") return data.sort((a,b)=>new Date(b.date)-new Date(a.date));
  if (type === "date-old") return data.sort((a,b)=>new Date(a.date)-new Date(b.date));
  return data;
}
