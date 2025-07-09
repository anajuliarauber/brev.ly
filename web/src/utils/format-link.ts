export function formatLink(shortUrl: string): string {
  const baseUrl = import.meta.env.VITE_FRONTEND_URL;
  return shortUrl.replace(baseUrl, "brev.ly");
}