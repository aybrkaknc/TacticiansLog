/**
 * @fileoverview Header component - Page title and action buttons
 * Common header for Characters, Family Plan, and Tasks pages
 */

import React from 'react';
import { Plus, RefreshCw, Search, Settings, Cpu, Save } from 'lucide-react';

/**
 * PageHeader - Dynamic page title component
 * @param {Object} props
 * @param {string} props.activeTab - Active tab (characters, pairings, todo, etc.)
 * @param {string} props.searchQuery - Search query
 * @param {Function} props.onSearchChange - Search change handler
 * @param {Function} props.onAddCharacter - Add character handler
 * @param {Function} props.onAddPairing - Add pairing handler
 * @param {Function} props.onAddList - Add list handler
 * @param {boolean} props.showAISettings - AI settings visibility
 * @param {Function} props.onToggleAISettings - AI settings toggle handler
 * @returns {JSX.Element|null}
 */
const PageHeader = ({
    activeTab,
    searchQuery,
    onSearchChange,
    onAddCharacter,
    onAddPairing,
    onAddList,
    showAISettings,
    onToggleAISettings,
    apiKey,
    onApiKeyChange,
    aiProvider,
    onAiProviderChange,
    onSaveApiKey
}) => {
    // Don't show header on Home page
    if (activeTab === 'home') return null;

    /**
     * Returns title text based on active tab
     * @returns {string|JSX.Element}
     */
    const getTitle = () => {
        switch (activeTab) {
            case 'characters': return 'Characters';
            case 'pairings': return 'Family Planning';
            case 'inventory': return 'Inventory';
            case 'todo': return 'Task Board';
            case 'lucina': return (
                <div className="flex items-center group cursor-default">
                    <span className="font-cinzel font-black tracking-[0.2em] text-gold drop-shadow-md">AEGIS</span>
                    <span className="mx-2 text-gray-500 font-cinzel font-light text-xl">|</span>
                    <span className="font-cinzel font-black tracking-[0.2em] text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.8)]">INTEL</span>
                </div>
            );
            default: return '';
        }
    };

    return (
        <header className="mb-8 flex justify-between items-center bg-black/20 backdrop-blur-md p-4 rounded-xl border border-white/5 shadow-2xl relative z-[60]">
            <h2 className="text-3xl text-gold font-cinzel font-bold uppercase tracking-wider drop-shadow-lg flex items-center">
                {getTitle()}
            </h2>

            <div className="flex items-center gap-4">
                {/* Characters Tab Actions */}
                {activeTab === 'characters' && (
                    <>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="bg-white/5 border border-gray-700/50 rounded-full pl-10 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-gold/50 w-48 transition-all focus:w-64"
                            />
                        </div>
                        <button
                            onClick={onAddCharacter}
                            className="bg-blue-600/80 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95 transition text-sm font-bold"
                        >
                            <Plus size={16} /> Add Character
                        </button>
                    </>
                )}

                {/* Pairings Tab Actions */}
                {activeTab === 'pairings' && (
                    <button
                        onClick={onAddPairing}
                        className="bg-blue-600/80 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95 transition text-sm font-bold"
                    >
                        <Plus size={16} /> Add Family
                    </button>
                )}

                {/* Todo Tab Actions */}
                {activeTab === 'todo' && (
                    <button
                        onClick={onAddList}
                        className="bg-gray-700/80 hover:bg-gray-600 text-white px-4 py-1.5 rounded-lg text-sm flex items-center gap-2 active:scale-95 transition font-bold"
                    >
                        <Plus size={16} /> New List
                    </button>
                )}

                {/* Lucina Tab - AI Settings */}
                {activeTab === 'lucina' && (
                    <div className="relative">
                        <button
                            onClick={onToggleAISettings}
                            className={`p-2 rounded-full transition ${showAISettings ? 'bg-gold/20 text-gold shadow-[0_0_15px_rgba(235,254,107,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                            title="AI Settings"
                        >
                            <Settings size={20} />
                        </button>

                        {showAISettings && (
                            <AISettingsPanel
                                apiKey={apiKey}
                                onApiKeyChange={onApiKeyChange}
                                aiProvider={aiProvider}
                                onAiProviderChange={onAiProviderChange}
                                onSave={onSaveApiKey}
                            />
                        )}
                    </div>
                )}

                {/* Refresh Button */}
                {['characters', 'pairings', 'inventory', 'todo'].includes(activeTab) && (
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1.5 rounded-lg active:scale-95 transition border border-white/10"
                        title="Refresh"
                    >
                        <RefreshCw size={16} />
                    </button>
                )}
            </div>
        </header>
    );
};

/**
 * AISettingsPanel - API settings panel
 * @param {Object} props
 * @param {string} props.apiKey - Current API key
 * @param {Function} props.onApiKeyChange - API key change handler
 * @param {string} props.aiProvider - Selected AI provider
 * @param {Function} props.onAiProviderChange - Provider change handler
 * @param {Function} props.onSave - Save handler
 * @returns {JSX.Element}
 */
const AISettingsPanel = ({ apiKey, onApiKeyChange, aiProvider, onAiProviderChange, onSave }) => (
    <div className="absolute right-0 top-full mt-3 w-80 sm:w-96 z-[100] bg-[#0f172a] border border-gold/40 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200 origin-top-right ring-1 ring-white/10">
        <div className="absolute -top-2 right-2.5 w-4 h-4 bg-[#0f172a] border-t border-l border-gold/40 transform rotate-45"></div>

        <h3 className="text-gold font-cinzel text-sm mb-3 flex items-center gap-2 pb-2 border-b border-gray-700">
            <Cpu size={14} /> API INTEGRATION
        </h3>

        <div className="space-y-4">
            <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Model Provider</label>
                <select
                    value={aiProvider}
                    onChange={(e) => onAiProviderChange(e.target.value)}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-gold outline-none transition-all cursor-pointer"
                >
                    <optgroup label="Free & Local Models" className="bg-gray-900 text-green-400">
                        <option value="gemini">Google Gemini (Recommended)</option>
                        <option value="groq">Groq AI (High Speed)</option>
                        <option value="ollama">Ollama (Local Models)</option>
                        <option value="lms">LM Studio (Local Server)</option>
                    </optgroup>
                    <optgroup label="Paid / API Key Required" className="bg-gray-900 text-gold">
                        <option value="openai">OpenAI (GPT-4o / o1)</option>
                        <option value="claude">Anthropic Claude 3.5</option>
                        <option value="deepseek">DeepSeek v3 / R1</option>
                        <option value="xai">xAI (Grok-2)</option>
                        <option value="perplexity">Perplexity AI</option>
                        <option value="mistral">Mistral AI</option>
                        <option value="openrouter">OpenRouter (All in One)</option>
                        <option value="cohere">Cohere</option>
                    </optgroup>
                </select>
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">API Key</label>
                <div className="flex gap-2">
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => onApiKeyChange(e.target.value)}
                        placeholder="API Key..."
                        className={`flex-1 bg-black/50 border rounded-lg px-3 py-2 text-sm text-white focus:ring-1 outline-none transition-all placeholder-gray-600 ${apiKey.trim().length >= 20
                            ? 'border-green-500/50 focus:border-green-500 ring-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]'
                            : 'border-gray-700 focus:border-gold focus:ring-gold/50'
                            }`}
                    />
                    <button
                        onClick={onSave}
                        className="bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 hover:border-gold/60 px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 whitespace-nowrap"
                    >
                        <Save size={14} /> Save
                    </button>
                </div>
            </div>

            <div className="text-[10px] text-gray-500 leading-relaxed italic border-t border-gray-800 pt-3">
                * With an API key, Aegis Intel can perform deeper strategic analyses.
            </div>
        </div>
    </div>
);

export default PageHeader;
