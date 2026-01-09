import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ModelSelector from './components/ModelSelector';
import SinglePromptTab from './components/SinglePromptTab';
import BatchProcessTab from './components/BatchProcessTab';



function App() {
  const [provider, setProvider] = useState('openai');
  const [model, setModel] = useState('gpt-4o-mini');
  const [openaiKey, setOpenaiKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [activeTab, setActiveTab] = useState('single');

  // Load API keys from localStorage on mount
  useEffect(() => {
    const savedOpenaiKey = localStorage.getItem('openai_api_key');
    const savedGeminiKey = localStorage.getItem('gemini_api_key');
    if (savedOpenaiKey) setOpenaiKey(savedOpenaiKey);
    if (savedGeminiKey) setGeminiKey(savedGeminiKey);
  }, []);

  // Save API keys to localStorage when they change
  useEffect(() => {
    if (openaiKey) localStorage.setItem('openai_api_key', openaiKey);
  }, [openaiKey]);

  useEffect(() => {
    if (geminiKey) localStorage.setItem('gemini_api_key', geminiKey);
  }, [geminiKey]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-purdue-darkGray">
      <Header />

      <main className="container mx-auto p-6 flex-grow">

        <ModelSelector
          provider={provider}
          setProvider={setProvider}
          model={model}
          setModel={setModel}
          openaiKey={openaiKey}
          setOpenaiKey={setOpenaiKey}
          geminiKey={geminiKey}
          setGeminiKey={setGeminiKey}
        />

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-purdue-gray/30">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('single')}
              className={`pb-3 px-1 text-lg font-medium transition-colors duration-200 border-b-2 ${activeTab === 'single'
                  ? 'border-purdue-campusGold text-purdue-black'
                  : 'border-transparent text-purdue-gray hover:text-purdue-athleticGold'
                }`}
            >
              Single Prompt
            </button>
            <button
              onClick={() => setActiveTab('batch')}
              className={`pb-3 px-1 text-lg font-medium transition-colors duration-200 border-b-2 ${activeTab === 'batch'
                  ? 'border-purdue-campusGold text-purdue-black'
                  : 'border-transparent text-purdue-gray hover:text-purdue-athleticGold'
                }`}
            >
              Batch Processing (File Drop)
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-purdue-gray/20 p-6 min-h-[500px]">
          {activeTab === 'single' ? (
            <SinglePromptTab
              provider={provider}
              model={model}
              apiKey={provider === 'openai' ? openaiKey : geminiKey}
            />
          ) : (
            <BatchProcessTab
              provider={provider}
              model={model}
              apiKey={provider === 'openai' ? openaiKey : geminiKey}
            />
          )}
        </div>

      </main>

      <footer className="bg-purdue-darkGray text-white/80 p-6 text-center text-sm">
        &copy; {new Date().getFullYear()} API Demo Webapp.
      </footer>
    </div>
  );
}

export default App;
