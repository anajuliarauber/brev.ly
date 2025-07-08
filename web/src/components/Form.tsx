import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLinkInput, useCreateLink, type CreateLinkInput } from '../http/create-link';

export const Form = () => {
  const { register, handleSubmit, reset } = useForm<CreateLinkInput>({
    resolver: zodResolver(createLinkInput),
    defaultValues: { originalUrl: '', shortUrl: '' },
  });

  const { mutate, isLoading } = useCreateLink();

  const onSubmit = (data: CreateLinkInput) => {
    const formattedData = { ...data, shortUrl: `http://localhost:5173/${data.shortUrl}` };
    mutate(formattedData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl p-6 shadow flex flex-col gap-4"
    >
      <h2 className="text-lg font-semibold text-gray-600">Novo link</h2>

      <div className="flex flex-col gap-2">
        <label className="block text-gray-500 mb-1 text-xs">LINK ORIGINAL</label>
        <input
          {...register('originalUrl')}
          placeholder="www.exemplo.com.br"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:ring-blue-base focus:border-blue-base"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="block text-gray-500 mb-1 text-xs">LINK ENCURTADO</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-l text-gray-600">
            brev.ly/
          </span>
          <input
            {...register('shortUrl')}
            placeholder=""
            className="flex-1 border border-gray-300 rounded-r px-3 py-2 text-gray-700 focus:ring-blue-base focus:border-blue-base"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 mt-4 rounded-lg bg-blue-base text-white font-medium hover:bg-blue-dark transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Salvar link
      </button>
    </form>
  );
};
