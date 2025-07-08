import { useQuery } from 'react-query';
import { api } from './api';
import type { Link } from '../shared/types';

export const LINKS_QUERY_KEY = 'links';

export const getLinks = async (): Promise<Link[]> => {
  const { data } = await api.get('/links');
  return data;
};

export const useGetLinks = () =>
  useQuery({
    queryKey: [LINKS_QUERY_KEY],
    queryFn: getLinks,
    refetchOnWindowFocus: true,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
