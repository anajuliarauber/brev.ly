export function downloadFile(reportUrl: string): void {
  const a = document.createElement('a');
  a.href = reportUrl;
  // TODO set a better file name
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(reportUrl);
}