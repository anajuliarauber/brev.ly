import { useQuery, type UseQueryResult } from 'react-query';
import { api } from './api';

export const REDIRECT_QUERY_KEY = 'redirect';

export const redirect = async (shortUrl: string): Promise<string> => {
  const response = await api.get<{ originalUrl: string }>(
    `/links/resolve/${shortUrl}`,
  );
  return response.data.originalUrl;
};

export const useRedirect = (shortUrl: string): UseQueryResult<string, Error> =>
  useQuery({
    queryKey: [REDIRECT_QUERY_KEY, shortUrl],
    queryFn: () => redirect(shortUrl),
    enabled: !!shortUrl,
    retry: false,
  });