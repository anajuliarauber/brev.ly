import { useMutation, type UseMutationResult, useQueryClient } from 'react-query';
import { z } from 'zod';
import type { AxiosError, AxiosResponse } from 'axios';
import type { Link } from '../shared/types';
import { api } from './api';
import { LINKS_QUERY_KEY } from './get-links';
import toast from 'react-hot-toast';

export const createLinkInput = z.object({
  originalUrl: z.string().url({ message: "Informe uma url válida" }),
  shortUrl: z
    .string()
    .min(1, { message: 'Deve conter pelo menos 1 caractere' })
    .regex(/^[a-zA-Z0-9_-]+$/, { message: 'Não são permitidos caracteres especiais' }),
});

export type CreateLinkInput = z.infer<typeof createLinkInput>;

export const createLink = async (input: CreateLinkInput): Promise<Link> => {
  const { originalUrl, shortUrl } = createLinkInput.parse(input);

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
      if (error.response?.status === 409) {
       toast.error('Esse link encurtado já existe', {
        position: 'top-right',
       });
    }   }  
  });
}
