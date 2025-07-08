import { useQuery, type UseQueryResult } from 'react-query';
import { api } from './api';
import type { AxiosError, AxiosResponse } from 'axios';

export const REDIRECT_QUERY_KEY = 'redirect';

export const redirect = async (shortUrl: string): Promise<AxiosResponse<void>> => {
  return api.get(`/${shortUrl}`);
};

export const useRedirect = (shortUrl: string): UseQueryResult<AxiosResponse<void>, AxiosError> =>
  useQuery({
    queryKey: [REDIRECT_QUERY_KEY, shortUrl],
    queryFn: () => redirect(shortUrl),
    enabled: !!shortUrl,
    retry: false,
  });