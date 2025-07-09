import { CopyIcon, TrashIcon } from '@phosphor-icons/react';
import type { Link as LinkInterface } from '../shared/types';
import { useDeleteLink } from '../http/delete-link';
import { copyUrl } from '../utils/copy-url';
import toast from 'react-hot-toast';
import { formatLink } from '../utils/format-link';
interface LinkProps {
  link: LinkInterface;
}

export const Link = ({ link }: LinkProps) => {
  const { mutate, isLoading } = useDeleteLink();

  const handleDelete = (id: string) => {
    mutate({ id });
  };

  const handleCopy = (shortUrl: string) => {
    copyUrl(shortUrl);
    toast.success('Link copiado com sucesso!', {
      position: 'top-right',
    });
  };

  return (
    <li key={link.id} className="flex justify-between items-center border-t border-gray-200 py-3.5">
      <div className="flex flex-col">
        <a
          href={`${link.shortUrl}`}
          target="_blank"
          className="text-blue-base font-medium overflow-hidden text-ellipsis whitespace-nowrap inline-block align-bottom max-w-[160px]"
          rel="noreferrer"
          title={`${link.shortUrl}`}
        >
          {formatLink(link.shortUrl)}
        </a>
        <p
          className="text-gray-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap inline-block align-bottom max-w-[160px] lg:max-w-[350px]"
          title={link.originalUrl}
        >
          {link.originalUrl}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="text-sm text-gray-500">{link.accessCount} acessos</div>
        <div className="flex space-x-1">
          <button
            className="cursor-pointer text-gray-600 p-2 bg-gray-200 rounded-sm"
            onClick={() => handleCopy(link.shortUrl)}
          >
            <CopyIcon size={20} className="text-gray-600" />
          </button>
          <button
            className="cursor-pointer text-gray-600 p-2 bg-gray-200 rounded-sm disabled:cursor-not-allowed"
            onClick={() => handleDelete(link.id)}
            disabled={isLoading}
          >
            <TrashIcon size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </li>
  );
};
