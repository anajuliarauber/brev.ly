import { useMutation, type UseMutationResult } from 'react-query';
import type { AxiosError } from 'axios';
import { api } from './api';

export interface ExportOutput {
  reportUrl: string;
}

export const exportLinks = async (): Promise<ExportOutput> => {
  const { data } = await api.post<ExportOutput>('/links/export');
  return data;
};

export function useExport(): UseMutationResult<ExportOutput, AxiosError, void> {
  return useMutation<ExportOutput, AxiosError, void>(() => exportLinks(), {
    onError: (error) => {
      console.error('[useExport] Error al exportar enlaces:', error);
    },
  });
}
