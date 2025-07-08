import { CopyIcon, TrashIcon } from '@phosphor-icons/react';
import type { Link as LinkInterface } from '../shared/types';
import { useDeleteLink } from '../http/delete-link';
import { copyUrl } from '../utils/copy-url';

interface LinkProps {
  link: LinkInterface;
}

export const Link = ({ link }: LinkProps) => {
  const { mutate} = useDeleteLink();

  const handleDelete = (id: string) => {
    mutate({ id });
  };

  const handleCopy = (shortUrl: string) => {
    copyUrl(shortUrl);
    // TODO: show toast
  };

  return (
    <li
      key={link.id}
      className="flex justify-between items-center border border-gray-200 rounded-lg p-4"
    >
      <div className="flex-1">
        <a
          href={`${link.shortUrl}`}
          target="_blank"
          className="text-blue-base font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[160px] inline-block align-bottom"
          rel="noreferrer"
          title={`${link.shortUrl}`}
        >
          {link.shortUrl}
        </a>
        <p className="text-gray-400 text-sm overflow-hidden text-ellipsis whitespace-nowrap max-w-[160px] inline-block align-bottom" title={link.originalUrl}>
          {link.originalUrl}
        </p>
      </div>
      <div className="mx-4 text-sm text-gray-500">{link.accessCount} acessos</div>
      <div className="flex space-x-2">
        <button className="cursor-pointer" onClick={() => handleCopy(link.shortUrl)}>
          <CopyIcon size={20} />
        </button>
        <button className="cursor-pointer" onClick={() => handleDelete(link.id)}>
          <TrashIcon size={20} className="text-danger" />
        </button>
      </div>
    </li>
  );
};
