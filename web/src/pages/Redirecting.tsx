import { useNavigate, useParams } from 'react-router-dom';
import { LogoIcon } from '../components/icons/LogoIcon';
import { PageStatus } from '../layouts/PageStatus';
import { useEffect } from 'react';
import { useRedirect } from '../http/redirect';

export const Redirecting = () => {
   const { shortUrl } = useParams<{ shortUrl: string }>();
  const navigate = useNavigate();

  const { isSuccess,data,  error } = useRedirect(shortUrl ?? '');

 useEffect(() => {
    if (isSuccess && data) {
      window.location.href = data;
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (error) {
      navigate('/*');
    }
  }, [error, navigate]);

  useEffect(() => {
    if (error) {
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
            <a href={data ?? ''} className="text-blue-base underline">
              Acesse aqui
            </a>
          </p>
        </>
      }
    />
  );
};
