import React, { useState } from 'react';
import { Send, FileText, CheckCircle2, PlayCircle, Loader2 } from 'lucide-react';
import { TestCase } from '../types';
import { generateTestCases } from '../services/geminiService';
import { UploadedFile } from '../types';

interface TestCasePanelProps {
  documents: UploadedFile[];
  onSelectTestCase: (tc: TestCase) => void;
}

const TestCasePanel: React.FC<TestCasePanelProps> = ({ documents, onSelectTestCase }) => {
  const [prompt, setPrompt] = useState("Generate all positive and negative test cases for the discount code feature.");
  const [loading, setLoading] = useState(false);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const results = await generateTestCases(prompt, documents);
      setTestCases(results);
    } catch (err) {
      setError("Failed to generate test cases. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in slide-in-from-right-8 duration-500">
      
      {/* Input Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="prompt" className="text-sm font-semibold text-slate-700">Test Generation Prompt</label>
          <div className="flex gap-2">
            <input
              id="prompt"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. Generate tests for the payment form..."
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      {/* Results List */}
      <div className="flex-1 overflow-auto space-y-4 pr-2">
        {testCases.length > 0 ? (
          <>
             <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Generated Test Plan</h3>
                <span className="text-sm text-slate-500">{testCases.length} Cases</span>
             </div>
             
             <div className="grid grid-cols-1 gap-4">
               {testCases.map((tc) => (
                 <div key={tc.testId} className="bg-white p-5 rounded-lg border border-slate-200 hover:shadow-md transition-shadow group relative">
                   <div className="flex justify-between items-start mb-2">
                     <div className="flex items-center gap-2">
                        <span className="bg-slate-100 text-slate-600 text-xs font-mono px-2 py-1 rounded">{tc.testId}</span>
                        <span className="font-semibold text-slate-800">{tc.feature}</span>
                     </div>
                     <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {tc.groundedIn}
                     </span>
                   </div>
                   
                   <p className="text-slate-600 text-sm mb-3"><span className="font-medium text-slate-900">Scenario:</span> {tc.scenario}</p>
                   <p className="text-slate-600 text-sm mb-4"><span className="font-medium text-slate-900">Expected:</span> {tc.expectedResult}</p>

                   <div className="flex justify-end pt-2 border-t border-slate-100">
                      <button
                        onClick={() => onSelectTestCase(tc)}
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <PlayCircle className="w-4 h-4" />
                        Generate Script
                      </button>
                   </div>
                 </div>
               ))}
             </div>
          </>
        ) : (
          !loading && (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
              <CheckCircle2 className="w-12 h-12 mb-3 opacity-20" />
              <p>Ready to generate test cases based on your Knowledge Base.</p>
            </div>
          )
        )}
        
        {loading && (
             <div className="space-y-4">
                 {[1,2,3].map(i => (
                     <div key={i} className="h-40 bg-slate-100 rounded-xl animate-pulse"></div>
                 ))}
             </div>
        )}
      </div>
    </div>
  );
};

export default TestCasePanel;
