import { useMutation, type UseMutationResult, useQueryClient } from 'react-query';
import { z } from 'zod';
import type { AxiosError, AxiosResponse } from 'axios';
import type { Link } from '../shared/types';
import { api } from './api';
import { LINKS_QUERY_KEY } from './get-links';
import toast from 'react-hot-toast';

const deleteLinkInput = z.object({
  id: z.string().uuid(),
});

export type DeleteLinkInput = z.infer<typeof deleteLinkInput>;

export const deleteLink = async (input: DeleteLinkInput): Promise<Link> => {
  const { id } = deleteLinkInput.parse(input);

  const response: AxiosResponse<Link> = await api.delete(`/links/${id}`);
  return response.data;
};

export function useDeleteLink(): UseMutationResult<Link, AxiosError, DeleteLinkInput> {
  const queryClient = useQueryClient();

  return useMutation<Link, AxiosError, DeleteLinkInput>((input) => deleteLink(input), {
    onSuccess: () => {
      queryClient.invalidateQueries(LINKS_QUERY_KEY);
    },
    onError: (error) => {
      if (error.response?.status === 404) {
        toast.error('Link não encontrado', {
          position: 'top-right',
        });
      } else if (error.response?.status === 500) {
        toast.error('Erro ao deletar o link', {
          position: 'top-right',
        });
      }
    },
  });
}
