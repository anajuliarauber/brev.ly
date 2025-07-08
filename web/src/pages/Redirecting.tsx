import { useNavigate, useParams } from 'react-router-dom';
import { LogoIcon } from '../components/icons/LogoIcon';
import { PageStatus } from '../layouts/PageStatus';
import { useEffect } from 'react';
import type { AxiosError } from 'axios';
import { useRedirect } from '../http/redirect';

export const Redirecting = () => {
   const { shortUrl } = useParams<{ shortUrl: string }>();
  const navigate = useNavigate();

  const { isSuccess, error } = useRedirect(shortUrl ?? '');

  useEffect(() => {
    if (isSuccess && shortUrl) {
      window.location.href = `http://localhost:3333/${shortUrl}`;
    }
  }, [isSuccess, shortUrl]);

  useEffect(() => {
    if (error && (error as AxiosError).response?.status === 404) {
      navigate('/*');
    }
  }, [error, navigate]);

  return (
    <PageStatus
      title="Redirecionando..."
      icon={<LogoIcon />}
      children={
        <>
          <p className="text-center"> O link será aberto automaticamente em alguns instantes.</p>
          <p className="text-center">
            {' '}
            Não foi redirecionado?{' '}
            <a
              href={`http://localhost:3333/${shortUrl ?? ''}`}
              className="text-blue-base underline"
            >
              Acesse aqui
            </a>
          </p>
        </>
      }
    />
  );
};
