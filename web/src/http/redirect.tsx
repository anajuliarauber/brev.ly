import { useQuery, type UseQueryResult } from 'react-query';

const API_URL = import.meta.env.VITE_API_URL;

export const REDIRECT_QUERY_KEY = 'redirect';

export const redirect = async (shortUrl: string): Promise<Response> => {
  const response = await fetch(`${API_URL}/${shortUrl}`, {
    // Do not automatically follow redirects so we can detect a 302 status
    redirect: 'manual',
  });

  if (response.status === 404) {
    throw new Error('Not Found');
  }

  return response;
};

export const useRedirect = (shortUrl: string): UseQueryResult<Response, Error> =>
  useQuery({
    queryKey: [REDIRECT_QUERY_KEY, shortUrl],
    queryFn: () => redirect(shortUrl),
    enabled: !!shortUrl,
    retry: false,  });