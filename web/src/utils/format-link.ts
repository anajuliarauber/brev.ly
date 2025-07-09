export function formatLink(shortUrl: string): string {
  console.log({shortUrl})
  const baseUrl = import.meta.env.VITE_FRONTEND_URL;
  return shortUrl.replace(baseUrl, "brev.ly");
}