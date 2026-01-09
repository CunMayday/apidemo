import React, { useState, useCallback } from 'react';
import { callLLM } from '../services/api';
import { calculateCost, formatCost } from '../utils/pricing';
import { Upload, FileText, X, Play, Loader2, CheckCircle2 } from 'lucide-react';

export default function BatchProcessTab({ provider, model, apiKey }) {
    const [prompt, setPrompt] = useState('');
    const [files, setFiles] = useState([]);
    const [results, setResults] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [currentFileIndex, setCurrentFileIndex] = useState(-1);
    const [totalCost, setTotalCost] = useState(0);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files).filter(
            file => file.type === 'text/plain' || file.name.endsWith('.md') || file.name.endsWith('.txt')
        );
        setFiles(prev => [...prev, ...droppedFiles]);
    }, []);

    const handleDragOver = (e) => e.preventDefault();

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const processBatch = async () => {
        if (!prompt.trim() || files.length === 0) return;

        setProcessing(true);
        setResults([]);
        setTotalCost(0);
        setCurrentFileIndex(-1);

        const newResults = [];

        for (let i = 0; i < files.length; i++) {
            setCurrentFileIndex(i);
            const file = files[i];
            let resultItem = { fileName: file.name, status: 'pending', response: '' };

            try {
                const text = await file.text();
                const fullPrompt = `${prompt}\n\n--- File: ${file.name} ---\n${text}`;

                const { text: responseText, usage } = await callLLM({ provider, model, apiKey, prompt: fullPrompt });
                const cost = calculateCost(model, usage.input, usage.output);
                setTotalCost(prev => prev + (cost || 0));
                
                resultItem = { 
                    fileName: file.name, 
                    status: 'success', 
                    response: responseText,
                    usage,
                    cost
                };
            } catch (error) {
                resultItem = { fileName: file.name, status: 'error', response: error.message };
            }

            newResults.push(resultItem);
            setResults([...newResults]);
        }

        setProcessing(false);
        setCurrentFileIndex(-1);
    };

    return (
        <div className="space-y-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Inputs */}
                <div className="space-y-6">

                    {/* Prompt Input */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-bold text-purdue-darkGray uppercase tracking-wide">
                            Base Prompt
                        </label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g. Summarize this document..."
                            className="w-full h-24 p-4 border border-purdue-gray/30 rounded-lg focus:ring-2 focus:ring-purdue-campusGold bg-gray-50 resize-none"
                        />
                    </div>

                    {/* File Drop Zone */}
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="border-2 border-dashed border-purdue-gray/40 rounded-lg p-8 text-center bg-gray-50 hover:bg-purdue-gray/5 transition-colors cursor-pointer"
                    >
                        <Upload className="mx-auto h-10 w-10 text-purdue-gray mb-3" />
                        <p className="text-purdue-darkGray font-medium">
                            Drag & Drop text files here
                        </p>
                        <p className="text-xs text-purdue-gray mt-1">
                            (.txt or .md files supported)
                        </p>
                        <input
                            type="file"
                            multiple
                            accept=".txt,.md"
                            onChange={(e) => {
                                const selected = Array.from(e.target.files);
                                setFiles(prev => [...prev, ...selected]);
                            }}
                            className="hidden"
                            id="fileInput"
                        />
                        <label htmlFor="fileInput" className="mt-4 inline-block text-purdue-campusGold font-bold cursor-pointer hover:underline text-sm">
                            or Browse Files
                        </label>
                    </div>

                    {/* File List */}
                    {files.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold text-purdue-gray uppercase">Selected Files ({files.length})</h4>
                            <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                                {files.map((file, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-white p-2 border border-purdue-gray/20 rounded shadow-sm text-sm">
                                        <div className="flex items-center truncate">
                                            <FileText className="h-4 w-4 mr-2 text-purdue-campusGold" />
                                            <span className="truncate max-w-[200px]">{file.name}</span>
                                        </div>
                                        <button onClick={() => removeFile(idx)} className="text-purdue-gray hover:text-red-500">
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={processBatch}
                        disabled={processing || !prompt.trim() || files.length === 0}
                        className="w-full py-3 bg-purdue-campusGold text-purdue-black font-bold rounded shadow-sm hover:bg-yellow-500 transition-colors disabled:opacity-50 flex items-center justify-center"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                                Processing Batch...
                            </>
                        ) : (
                            <>
                                <Play className="mr-2 h-5 w-5 fill-current" />
                                Start Processing
                            </>
                        )}
                    </button>

                </div>

                {/* Right Column: Results */}
                <div className="bg-purdue-gray/5 rounded-lg border border-purdue-gray/20 p-6 h-full flex flex-col">
                    <h3 className="text-lg font-bold text-purdue-darkGray mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                            Results Output
                            {results.length > 0 && <span className="ml-2 text-xs bg-purdue-black text-white px-2 py-0.5 rounded-full">{results.length}</span>}
                        </div>
                        {totalCost > 0 && (
                            <div className="text-sm font-bold text-purdue-campusGold">
                                Total Cost: {formatCost(totalCost)}
                            </div>
                        )}
                    </h3>

                    <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                        {results.length === 0 && (
                            <div className="text-center text-purdue-gray py-10 italic">
                                Processed results will appear here...
                            </div>
                        )}

                        {results.map((res, idx) => (
                            <div key={idx} className="bg-white p-4 rounded border border-purdue-gray/10 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-sm text-purdue-black">{res.fileName}</span>
                                    {res.status === 'success' && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                                    {res.status === 'error' && <span className="text-xs text-red-600 font-bold">Error</span>}
                                    {res.status === 'pending' && <Loader2 className="h-3 w-3 animate-spin text-purdue-campusGold" />}
                                </div>
                                <div className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-gray-50 p-2 rounded">
                                    {res.response || '...'}
                                </div>
                                {res.cost !== undefined && (
                                    <div className="mt-2 text-xs text-right text-purdue-gray">
                                        Ref: {formatCost(res.cost)} ({res.usage?.input} in / {res.usage?.output} out)
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
