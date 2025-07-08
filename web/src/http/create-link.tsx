import { useMutation, type UseMutationResult, useQueryClient } from 'react-query';
import { z } from 'zod';
import type { AxiosError, AxiosResponse } from 'axios';
import type { Link } from '../shared/types';
import { api } from './api';
import { LINKS_QUERY_KEY } from './get-links';

export const createLinkInput = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string().min(1),
});

export type CreateLinkInput = z.infer<typeof createLinkInput>;

export const createLink = async (input: CreateLinkInput): Promise<Link> => {
  const { originalUrl, shortUrl } = createLinkInput.parse(input);
  console.log('Creating link:', { originalUrl, shortUrl });

  const response: AxiosResponse<Link> = await api.post('/links', {
    originalUrl,
    shortUrl,
  });

  return response.data;
};

export function useCreateLink(): UseMutationResult<Link, AxiosError, CreateLinkInput> {
  const queryClient = useQueryClient();

  return useMutation<Link, AxiosError, CreateLinkInput>((input) => createLink(input), {
    onSuccess: () => {
      queryClient.invalidateQueries([LINKS_QUERY_KEY]);
    },
    onError: (error) => {
      console.error('[useCreateLink] Error creando link:', error);
      // TODO show toast
    },
  });
}
