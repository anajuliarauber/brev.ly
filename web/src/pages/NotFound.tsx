import { PageStatus } from '../layouts/PageStatus';
import { NotFound as NotFoundIcon } from '../components/icons/NotFound';

export const NotFound = () => {
  return (
    <PageStatus
      title="Link não encontrado"
      icon={<NotFoundIcon />}
      children={
        <p className="text-center">
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida.
          Saiba mais em brev.ly.
        </p>
      }
    />
  );
};
