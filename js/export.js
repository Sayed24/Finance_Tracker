function exportCSV(type) {
  getAllItems(type).then(data => {
    if (!data.length) return alert("No data");

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(r => Object.values(r).join(","));
    const csv = [headers, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${type}.csv`;
    a.click();
  });
}
