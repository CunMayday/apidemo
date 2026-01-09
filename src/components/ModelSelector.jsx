import React from 'react';

const MODELS = {
    openai: [
        { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
        { id: 'gpt-5.2', name: 'GPT-5.2 (Pro Code)' },
        { id: 'gpt-5-mini', name: 'GPT-5 Mini' },
        { id: 'gpt-5', name: 'GPT-5' },
        { id: 'gpt-4.1', name: 'GPT-4.1' },
        { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
        { id: 'gpt-4o', name: 'GPT-4o' },
    ],
    gemini: [
        { id: 'gemini-3-pro-preview', name: 'Gemini 3 Pro' },
        { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash' },
        { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
        { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
        { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' },
    ]
};

export default function ModelSelector({
    provider,
    setProvider,
    model,
    setModel,
    openaiKey,
    setOpenaiKey,
    geminiKey,
    setGeminiKey
}) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-purdue-gray/20 mb-6 flex flex-wrap gap-4 items-end">

            {/* Provider Selector */}
            <div className="flex flex-col">
                <label className="text-xs font-bold text-purdue-darkGray uppercase tracking-wider mb-1">
                    Provider
                </label>
                <select
                    value={provider}
                    onChange={(e) => {
                        const newProvider = e.target.value;
                        setProvider(newProvider);
                        // Default to gemini-2.5-flash for Gemini, else first item
                        if (newProvider === 'gemini') {
                            setModel('gemini-2.5-flash');
                        } else {
                            setModel(MODELS[newProvider][0].id);
                        }
                    }}
                    className="bg-purdue-gray/10 border border-purdue-gray/30 rounded px-3 py-2 text-purdue-black focus:outline-none focus:ring-2 focus:ring-purdue-campusGold"
                >
                    <option value="openai">OpenAI</option>
                    <option value="gemini">Google Gemini</option>
                </select>
            </div>

            {/* Model Selector */}
            <div className="flex flex-col">
                <label className="text-xs font-bold text-purdue-darkGray uppercase tracking-wider mb-1">
                    Model
                </label>
                <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="bg-purdue-gray/10 border border-purdue-gray/30 rounded px-3 py-2 text-purdue-black focus:outline-none focus:ring-2 focus:ring-purdue-campusGold min-w-[200px]"
                >
                    {MODELS[provider]?.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                </select>
            </div>

            {/* API Key Input */}
            <div className="flex flex-col flex-grow">
                <label className="text-xs font-bold text-purdue-darkGray uppercase tracking-wider mb-1">
                    {provider === 'openai' ? 'OpenAI' : 'Gemini'} API Key
                </label>
                <input
                    type="password"
                    value={provider === 'openai' ? openaiKey : geminiKey}
                    onChange={(e) => provider === 'openai' ? setOpenaiKey(e.target.value) : setGeminiKey(e.target.value)}
                    placeholder={`Enter your ${provider === 'openai' ? 'OpenAI' : 'Gemini'} API Key`}
                    className="bg-purdue-gray/10 border border-purdue-gray/30 rounded px-3 py-2 text-purdue-black focus:outline-none focus:ring-2 focus:ring-purdue-campusGold w-full min-w-[300px]"
                />
            </div>

        </div>
    );
}
