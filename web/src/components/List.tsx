import { useEffect } from 'react';
import { Link as LinkIcon, DownloadSimpleIcon } from '@phosphor-icons/react';
import { useGetLinks } from '../http/get-links';
import { useExport } from '../http/export';
import { Link } from './Link';
import { downloadFile } from '../utils/download-file';

export const List: React.FC = () => {
  const { data: links, isLoading } = useGetLinks();
  const { mutate: exportLinks, isSuccess, data } = useExport();
  
  useEffect(() => {
    if (isSuccess && data) {
      downloadFile(data.reportUrl);
    }
  }, [isSuccess, data]);

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-600">Meus links</h2>
        <button
          onClick={() => exportLinks()}
          disabled={isLoading}
          className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <DownloadSimpleIcon size={20} />
          <span>Baixar CSV</span>
        </button>
      </div>

      {links && links.length > 0 ? (
        <ul className="space-y-4">
          {links.map((link) => (
            <Link link={link} key={link.id}/>
          ))}
        </ul>
      ) : (
        <div className="text-gray-400 text-center py-10 flex flex-col items-center">
          <LinkIcon size={48} />
          <span>AINDA NÃO EXISTEM LINKS CADASTRADOS</span>
        </div>
      )}
    </div>
  );
};
