
export const fetchOpenSeaStats = async (slug) => {
  // Mock fallback data
  return {
    floor_price: 1.83,
    total_volume: 89000,
    count: 9999
  };
};

export const exportToCSV = (data, filename = "data.csv") => {
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map(row => Object.values(row).join(",")).join("\n");
  const csv = `${headers}\n${rows}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
