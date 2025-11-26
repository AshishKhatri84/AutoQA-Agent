import React, { useState, useEffect } from 'react';
import { UploadedFile, TestCase } from '../types';
import { generateSeleniumScript } from '../services/geminiService';
import { ArrowLeft, Copy, Check, Code2, Loader2, Download } from 'lucide-react';

interface ScriptPanelProps {
  testCase: TestCase;
  documents: UploadedFile[];
  onBack: () => void;
}

const ScriptPanel: React.FC<ScriptPanelProps> = ({ testCase, documents, onBack }) => {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Auto-generate on mount
    const generate = async () => {
      setLoading(true);
      try {
        const script = await generateSeleniumScript(testCase, documents);
        setCode(script);
      } catch (e) {
        setCode("# Error generating script. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCase]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([code], {type: 'text/x-python'});
    element.href = URL.createObjectURL(file);
    element.download = `${testCase.testId}_selenium.py`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="h-full flex flex-col space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
      <button 
        onClick={onBack}
        className="self-start text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Test Cases
      </button>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
         <div className="flex items-start justify-between mb-4">
            <div>
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <span className="text-teal-600 font-mono text-lg">{testCase.testId}</span>
                    Selenium Script Generation
                </h3>
                <p className="text-slate-600 mt-1">{testCase.scenario}</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
                <Code2 className="w-6 h-6 text-blue-600" />
            </div>
         </div>
         
         <div className="grid grid-cols-2 gap-4 text-sm text-slate-500 border-t border-slate-100 pt-4">
            <div>
                <span className="font-semibold text-slate-700">Feature:</span> {testCase.feature}
            </div>
            <div>
                <span className="font-semibold text-slate-700">Expected:</span> {testCase.expectedResult}
            </div>
         </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-xl overflow-hidden flex flex-col shadow-lg border border-slate-800">
        <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
            <span className="text-slate-400 text-xs font-mono">python_selenium_test.py</span>
            <div className="flex items-center gap-2">
                 {loading && <span className="text-xs text-blue-400 flex items-center gap-1 mr-2"><Loader2 className="w-3 h-3 animate-spin"/> AI Generating...</span>}
                 
                 {!loading && code && (
                    <>
                        <button 
                            onClick={handleDownload}
                            className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded transition-colors"
                            title="Download Python File"
                        >
                            <Download className="w-3 h-3" />
                            Download .py
                        </button>
                        <button 
                            onClick={handleCopy}
                            className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded transition-colors"
                        >
                            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </>
                 )}
            </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4 font-mono text-sm relative">
            {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 space-y-4">
                   <div className="relative w-16 h-16">
                      <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
                   </div>
                   <p className="animate-pulse">Writing robust Selenium code...</p>
                </div>
            ) : (
                <pre className="text-blue-100 whitespace-pre-wrap leading-relaxed">
                    <code>{code}</code>
                </pre>
            )}
        </div>
      </div>
    </div>
  );
};

export default ScriptPanel;