export function escapeCsvValue(value: unknown) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

export function formatCsv(rows: Array<Array<unknown>>) {
  return rows.map((row) => row.map(escapeCsvValue).join(",")).join("\r\n");
}

export function downloadTextFile(filename: string, content: string, mimeType = "text/plain;charset=utf-8") {
  try {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    // Log to console so failures are visible in browser devtools
    // calling code may still show a toast
    // eslint-disable-next-line no-console
    console.error("downloadTextFile failed:", err);
    return false;
  }
}
