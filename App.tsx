import React, { useState } from 'react';
import { UploadedFile, TestCase, AppPhase } from './types';
import IngestionPanel from './components/IngestionPanel';
import TestCasePanel from './components/TestCasePanel';
import ScriptPanel from './components/ScriptPanel';
import { Bot, Layers, FileCode, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.INGESTION);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);

  const handleFilesAdded = (newFiles: UploadedFile[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (fileName: string) => {
    setFiles(prev => prev.filter(f => f.name !== fileName));
  };

  const handleBuildKnowledgeBase = () => {
    // In a real app, we would chunk and vector store here.
    // For this frontend demo, we transition to the next phase and pass files as context.
    setPhase(AppPhase.TEST_GENERATION);
  };

  const handleSelectTestCase = (tc: TestCase) => {
    setSelectedTestCase(tc);
    setPhase(AppPhase.SCRIPT_GENERATION);
  };

  const handleBackToTests = () => {
    setSelectedTestCase(null);
    setPhase(AppPhase.TEST_GENERATION);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
                <Bot className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
              Autonomous QA Agent
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
             <span>Gemini 2.5 Flash</span>
             <span className="h-4 w-px bg-slate-300"></span>
             <span>React + TypeScript</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        
        {/* Sidebar Navigation (Stepper) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <nav className="space-y-1 sticky top-24">
            <StepItem 
                active={phase === AppPhase.INGESTION} 
                completed={phase !== AppPhase.INGESTION}
                icon={Layers}
                title="Knowledge Base"
                desc="Upload docs & HTML"
            />
            <div className={`h-8 w-px ml-6 ${phase !== AppPhase.INGESTION ? 'bg-blue-200' : 'bg-slate-200'}`}></div>
            <StepItem 
                active={phase === AppPhase.TEST_GENERATION}
                completed={phase === AppPhase.SCRIPT_GENERATION}
                icon={CheckCircle2}
                title="Test Generator"
                desc="Create test plans"
            />
            <div className={`h-8 w-px ml-6 ${phase === AppPhase.SCRIPT_GENERATION ? 'bg-blue-200' : 'bg-slate-200'}`}></div>
            <StepItem 
                active={phase === AppPhase.SCRIPT_GENERATION}
                completed={false}
                icon={FileCode}
                title="Script Agent"
                desc="Generate Selenium code"
            />
          </nav>
          
          <div className="mt-8 p-4 bg-slate-100 rounded-lg text-xs text-slate-500 border border-slate-200">
            <p className="font-semibold mb-2 text-slate-700">Session Context</p>
            <p className="mb-1">Files: {files.length}</p>
            <p>KB Status: {phase === AppPhase.INGESTION ? 'Pending' : 'Ready'}</p>
          </div>
        </aside>

        {/* Dynamic Content Area */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[600px] overflow-hidden flex flex-col">
            <div className="flex-1 p-8">
                {phase === AppPhase.INGESTION && (
                    <IngestionPanel 
                        files={files} 
                        onFilesAdded={handleFilesAdded} 
                        onRemoveFile={handleRemoveFile} 
                        onBuild={handleBuildKnowledgeBase}
                    />
                )}
                {phase === AppPhase.TEST_GENERATION && (
                    <TestCasePanel 
                        documents={files} 
                        onSelectTestCase={handleSelectTestCase} 
                    />
                )}
                {phase === AppPhase.SCRIPT_GENERATION && selectedTestCase && (
                    <ScriptPanel 
                        testCase={selectedTestCase}
                        documents={files}
                        onBack={handleBackToTests}
                    />
                )}
            </div>
        </div>
      </main>
    </div>
  );
};

const StepItem = ({ active, completed, icon: Icon, title, desc }: any) => (
  <div className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${active ? 'bg-blue-50' : ''}`}>
    <div className={`
      mt-1 p-1.5 rounded-full flex items-center justify-center shrink-0 border-2
      ${completed ? 'bg-blue-600 border-blue-600 text-white' : active ? 'border-blue-600 text-blue-600' : 'border-slate-300 text-slate-400'}
    `}>
      {completed ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
    </div>
    <div>
      <p className={`font-semibold text-sm ${active || completed ? 'text-slate-900' : 'text-slate-500'}`}>{title}</p>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  </div>
);

export default App;
