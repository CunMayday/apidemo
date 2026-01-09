import React, { useState } from 'react';
import { callLLM } from '../services/api';
import { calculateCost, formatCost } from '../utils/pricing';
import { Send, Loader2 } from 'lucide-react';

export default function SinglePromptTab({ provider, model, apiKey }) {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [usageStats, setUsageStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        setError('');
        setResponse('');

        try {
            const { text, usage } = await callLLM({ provider, model, apiKey, prompt });
            setResponse(text);
            const cost = calculateCost(model, usage.input, usage.output);
            setUsageStats({ ...usage, cost });
        } catch (err) {
            setError(err.message || 'An error occurred');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-bold text-purdue-darkGray uppercase tracking-wide">
                    Enter Your Prompt
                </label>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={`Ask ${model} something...`}
                    className="w-full h-32 p-4 border border-purdue-gray/30 rounded-lg focus:ring-2 focus:ring-purdue-campusGold focus:border-transparent resize-none bg-gray-50"
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading || !prompt.trim()}
                className="flex items-center justify-center px-6 py-3 bg-purdue-black text-white font-bold rounded hover:bg-purdue-darkGray transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin mr-2 h-5 w-5" />
                        Processing...
                    </>
                ) : (
                    <>
                        <Send className="mr-2 h-5 w-5" />
                        Submit Prompt
                    </>
                )}
            </button>

            {error && (
                <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded">
                    {error}
                </div>
            )}

            {response && (
                <div className="mt-8">
                    <h3 className="text-lg font-bold text-purdue-campusGold mb-3 border-b border-purdue-gray/20 pb-2 flex justify-between items-end">
                        <span>Response</span>
                        {usageStats && (
                             <div className="text-xs font-normal text-purdue-gray text-right">
                                 <span className="block">Input Tokens: {usageStats.input}</span>
                                 <span className="block">Output Tokens: {usageStats.output}</span>
                                 <span className="block font-bold text-purdue-darkGray mt-1">
                                     Estimated Cost: {formatCost(usageStats.cost)}
                                 </span>
                             </div>
                        )}
                    </h3>
                    <div className="bg-purdue-gray/10 p-6 rounded-lg border border-purdue-gray/20 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                        {response}
                    </div>
                </div>
            )}
        </div>
    );
}
