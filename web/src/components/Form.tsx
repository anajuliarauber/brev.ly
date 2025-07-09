import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLinkInput, useCreateLink, type CreateLinkInput } from '../http/create-link';

const PREFIX = 'brev.ly/'

export const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors,isValid},
  } = useForm<CreateLinkInput>({
    resolver: zodResolver(createLinkInput),
    defaultValues: { originalUrl: '', shortUrl: '' },
  });

  const { mutate, isLoading } = useCreateLink();

  const onSubmit = (data: CreateLinkInput) => {
    const formattedData = {
      ...data,
      shortUrl: `http://localhost:5173/${data.shortUrl}`,
    };
    mutate(formattedData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg p-6 shadow flex flex-col gap-4"
      noValidate
    >
      <h2 className="text-lg font-semibold text-gray-600">Novo link</h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="originalUrl" className="block text-gray-500 mb-1 text-xs">
          LINK ORIGINAL
        </label>
        <input
          id="originalUrl"
          {...register('originalUrl')}
          placeholder="https://google.com"
          className={`w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-base focus:border-blue-base ${
            errors.originalUrl ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.originalUrl && (
          <p className="text-red-500 text-xs mt-1">
            {errors.originalUrl.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="shortUrl" className="block text-gray-500 mb-1 text-xs">
          LINK ENCURTADO
        </label>
       <Controller
          name="shortUrl"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <input
              id="shortUrl"
              // always show the prefix + the raw value
              value={PREFIX + (value || '')}
              onBlur={onBlur}
              onChange={(e) => {
                let v = e.target.value
                // if they delete the prefix, force it back
                if (!v.startsWith(PREFIX)) {
                  v = PREFIX + v.replace(new RegExp(`^${PREFIX}`), '')
                }
                // strip prefix before storing in RHF
                onChange(v.slice(PREFIX.length))
              }}
              placeholder="ex: meu-link"
              className={`
                w-full border rounded px-3 py-2 text-gray-700
                focus:ring-blue-base focus:border-blue-base
                ${errors.shortUrl ? 'border-red-500' : 'border-gray-300'}
              `}
            />
          )}
        />
        {errors.shortUrl && (
          <p className="text-red-500 text-xs mt-1">
            {errors.shortUrl.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || !isValid}
        className="w-full py-3 mt-4 rounded-lg bg-blue-base text-white font-medium hover:bg-blue-dark transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Salvando...' : 'Salvar link'}
      </button>
    </form>
  );
}
