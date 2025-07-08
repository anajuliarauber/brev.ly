import { LogoIcon } from '../components/icons/LogoIcon';
import { PageStatus } from '../layouts/PageStatus';

export const Redirecting = () => {
  return (
    <PageStatus
      title="Redirecionando..."
      icon={<LogoIcon />}
      children={
        <>
          <p className='text-center'> O link será aberto automaticamente em alguns instantes.</p>
          <p className='text-center'> Não foi redirecionado? Acesse aqui</p>
        </>
      }
    />
  );
};
