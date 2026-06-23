import React, { useState } from 'react';
import { albumCoverUpdater } from '../services/albumCoverUpdater';
import { itunesApiService } from '../services/itunesApiService';
import { AlbumData } from '../data/albumsDatabase';

interface UpdateProgress {
  current: number;
  total: number;
  currentSong: string;
  completed: AlbumData[];
  failed: string[];
}

export function AlbumCoverAdmin() {
  const [isVisible, setIsVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState<UpdateProgress | null>(null);
  const [updatedDatabase, setUpdatedDatabase] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleUpdateAllCovers = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    setError('');
    setUpdatedDatabase('');
    
    try {
      const updatedAlbums = await albumCoverUpdater.updateAllCovers(
        (progressData) => setProgress(progressData),
        800 // 800ms delay between requests to be respectful to iTunes API
      );
      
      // Generate the new database file content
      const databaseContent = albumCoverUpdater.generateDatabaseFileContent(updatedAlbums);
      setUpdatedDatabase(databaseContent);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsUpdating(false);
    }
  };

    const handleClearCache = () => {
    itunesApiService.clearCache();
    alert('Cache da API do iTunes limpo com sucesso!');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(updatedDatabase);
    alert('Conteúdo do banco de dados copiado para a área de transferência! Agora você pode substituir o conteúdo de /data/albumsDatabase.ts');
  };


  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg shadow-lg transition-colors"
          title="Album Cover Admin"
        >
          ⚙️
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
         <div className="p-6 border-b border-gray-700">
           <div className="flex justify-between items-center">
             <h2 className="text-xl font-bold text-white">Painel de Administração de Capas</h2>
             <button
               onClick={() => setIsVisible(false)}
               className="text-gray-400 hover:text-white transition-colors"
             >
               ✕
             </button>
           </div>
           <p className="text-gray-400 mt-2">
             Atualize as capas dos álbuns usando a API de Busca do iTunes da Apple
           </p>
         </div>


        <div className="p-6 space-y-6">
          {/* Controls */}
          <div className="flex gap-4">
             <button
               onClick={handleUpdateAllCovers}
               disabled={isUpdating}
               className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed 
                          text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
             >
               {isUpdating ? (
                 <>
                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                   Atualizando...
                 </>
               ) : (
                 'Atualizar Todas as Capas'
               )}
             </button>


             <button
               onClick={handleClearCache}
               className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
             >
               Limpar Cache
             </button>

          </div>

          {/* Progress */}
          {progress && (
            <div className="bg-gray-800 rounded-lg p-4">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-white font-medium">
                   Progresso: {progress.current}/{progress.total}
                 </span>
                 <span className="text-gray-400 text-sm">
                   {Math.round((progress.current / progress.total) * 100)}%
                 </span>
               </div>

              
              <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                ></div>
              </div>

               <div className="text-sm text-gray-300 mb-2">
                 Processando agora: {progress.currentSong}
               </div>


               {progress.failed.length > 0 && (
                 <div className="text-sm">
                   <span className="text-red-400">Falhas: {progress.failed.length}</span>
                   <details className="mt-2">
                     <summary className="cursor-pointer text-gray-400">Mostrar itens com falha</summary>
                     <ul className="mt-1 text-xs text-red-300 max-h-20 overflow-auto">
                       {progress.failed.map((item, index) => (
                         <li key={index}>• {item}</li>
                       ))}
                     </ul>
                   </details>
                 </div>
               )}

            </div>
          )}

           {/* Error Display */}
           {error && (
             <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
               <h3 className="text-red-400 font-medium mb-2">Erro</h3>
               <p className="text-red-300 text-sm">{error}</p>
             </div>
           )}


           {/* Updated Database Content */}
           {updatedDatabase && (
             <div className="bg-gray-800 rounded-lg">
               <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                 <h3 className="text-white font-medium">Conteúdo do Banco Atualizado</h3>
                 <button
                   onClick={copyToClipboard}
                   className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
                 >
                   Copiar para Área de Transferência
                 </button>
               </div>
               <div className="p-4 max-h-80 overflow-auto">
                 <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                   {updatedDatabase}
                 </pre>
               </div>
               <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
                 Copie este conteúdo e substitua todo o conteúdo de <code>/data/albumsDatabase.ts</code>
               </div>
             </div>
           )}


           {/* Instructions */}
           <div className="bg-gray-800 rounded-lg p-4">
             <h3 className="text-white font-medium mb-2">Instruções</h3>
             <ul className="text-gray-300 text-sm space-y-1">
               <li>• Clique em "Atualizar Todas as Capas" para buscar as artes autênticas do iTunes</li>
               <li>• O processo levará cerca de 40-50 segundos (atraso de 800ms entre chamadas de API)</li>
               <li>• Itens com falha usarão artes de fallback geradas</li>
               <li>• Copie o conteúdo do banco atualizado e substitua /data/albumsDatabase.ts</li>
               <li>• Isso deve ser feito apenas anualmente ou ao adicionar novas músicas</li>
             </ul>
           </div>


           {/* Cache Stats */}
           <div className="bg-gray-800 rounded-lg p-4">
             <h3 className="text-white font-medium mb-2">Informações de Cache</h3>
             <p className="text-gray-300 text-sm">
               As respostas da API do iTunes são armazenadas em cache para evitar requisições repetidas. 
               Limpe o cache se precisar atualizar as capas dos álbuns.
             </p>
           </div>

        </div>
      </div>
    </div>
  );
}