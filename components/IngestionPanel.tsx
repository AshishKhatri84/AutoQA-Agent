import React, { useRef, useState } from 'react';
import { Upload, FileText, Code, CheckCircle, Trash2, Loader2 } from 'lucide-react';
import { UploadedFile } from '../types';

interface IngestionPanelProps {
  files: UploadedFile[];
  onFilesAdded: (newFiles: UploadedFile[]) => void;
  onRemoveFile: (name: string) => void;
  onBuild: () => void;
}

const IngestionPanel: React.FC<IngestionPanelProps> = ({ files, onFilesAdded, onRemoveFile, onBuild }) => {
  const docInputRef = useRef<HTMLInputElement>(null);
  const htmlInputRef = useRef<HTMLInputElement>(null);
  const [isBuilding, setIsBuilding] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'document' | 'html') => {
    if (e.target.files) {
      const newFiles: UploadedFile[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const text = await file.text();
        newFiles.push({
          name: file.name,
          content: text,
          type: type,
          size: file.size
        });
      }
      onFilesAdded(newFiles);
      // Reset input
      e.target.value = '';
    }
  };

  const handleBuildClick = () => {
    setIsBuilding(true);
    // Simulate vector embedding/chunking process
    setTimeout(() => {
        setIsBuilding(false);
        onBuild();
    }, 1500);
  };

  const docs = files.filter(f => f.type === 'document');
  const html = files.find(f => f.type === 'html');
  const canBuild = docs.length > 0 && !!html;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-slate-800">Knowledge Base Ingestion</h2>
        <p className="text-slate-500">Upload your project documentation and target HTML file to train the QA Agent.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Support Documents Upload */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-slate-700 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Support Documents
            </h3>
            <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
              {docs.length} uploaded
            </span>
          </div>
          
          <div 
            onClick={() => docInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:bg-slate-50 transition-colors group"
          >
            <Upload className="w-8 h-8 mx-auto text-slate-400 group-hover:text-blue-500 mb-2" />
            <p className="text-sm text-slate-600">Click to upload TXT, MD, JSON</p>
            <input 
              type="file" 
              multiple 
              accept=".txt,.md,.json,.csv"
              ref={docInputRef} 
              className="hidden" 
              onChange={(e) => handleFileChange(e, 'document')}
            />
          </div>

          <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
            {docs.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between text-sm p-2 bg-slate-50 rounded border border-slate-100">
                <span className="truncate max-w-[200px] text-slate-700">{doc.name}</span>
                <button onClick={() => onRemoveFile(doc.name)} className="text-slate-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* HTML Upload */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-teal-400 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-slate-700 flex items-center gap-2">
              <Code className="w-5 h-5 text-teal-500" />
              Target HTML
            </h3>
            {html && (
              <span className="text-xs font-medium px-2 py-1 bg-teal-50 text-teal-700 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Ready
              </span>
            )}
          </div>
          
          <div 
            onClick={() => htmlInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:bg-slate-50 transition-colors group"
          >
            <Upload className="w-8 h-8 mx-auto text-slate-400 group-hover:text-teal-500 mb-2" />
            <p className="text-sm text-slate-600">Click to upload checkout.html</p>
            <input 
              type="file" 
              accept=".html,.htm"
              ref={htmlInputRef} 
              className="hidden" 
              onChange={(e) => handleFileChange(e, 'html')}
            />
          </div>

          <div className="mt-4 min-h-[40px]">
            {html ? (
              <div className="flex items-center justify-between text-sm p-2 bg-teal-50/50 rounded border border-teal-100">
                <span className="truncate text-teal-800 font-medium">{html.name}</span>
                <button onClick={() => onRemoveFile(html.name)} className="text-teal-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic text-center">No HTML file selected</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <button
          onClick={handleBuildClick}
          disabled={!canBuild || isBuilding}
          className={`
            px-8 py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2
            ${canBuild && !isBuilding
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/30' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}
          `}
        >
          {isBuilding && <Loader2 className="w-5 h-5 animate-spin" />}
          {isBuilding ? 'Processing Knowledge Base...' : 'Build Knowledge Base'}
        </button>
      </div>
    </div>
  );
};

export default IngestionPanel;