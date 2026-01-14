/**
 * @fileoverview Main application component
 * Fire Emblem Awakening Companion - Tactician's Planner
 */

import React from 'react';
import Sidebar from './components/Sidebar';
import Characters from './pages/Characters';
import Pairings from './pages/Pairings';
import TodoList from './pages/TodoList';
import LucinaChat from './pages/LucinaChat';
import Inventory from './pages/Inventory';
import Wiki from './pages/Wiki';
import TitleBar from './components/TitleBar';
import { useGameData } from './hooks/useGameData';
import './index.css';
import { Plus, RefreshCw, Search, Settings, Save, Cpu, Users, Heart, Backpack, Scroll, BookOpen, Eye, EyeOff, FlaskConical, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

import CharacterSelectionModal from './components/CharacterSelectionModal';
import LandingPage from './pages/LandingPage';

function App() {
    const { t, i18n } = useTranslation();
    const {
        activeTab,
        setActiveTab,
        characters,
        setCharacters,
        pairings,
        setPairings,
        supportRanks,
        setSupportRanks,
        todoLists,
        setTodoLists,
        chats,
        setChats,
        inventory,
        setInventory,
        loading
    } = useGameData();

    // Statistical calculations
    const charCount = characters.length;
    const pairCount = pairings.filter(p => p.status === 'S Rank' || p.status === 'Evli' || p.status === 'Planned' || p.status === 'Planlandı').length;
    const todoCount = todoLists.reduce((acc, list) => acc + list.items.filter(t => !t.checked).length, 0);

    // UI State
    const [isSidebarPinned, setIsSidebarPinned] = React.useState(() => localStorage.getItem('isSidebarPinned') === 'true');
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [showAddPairingModal, setShowAddPairingModal] = React.useState(false);
    const [showCharacterModal, setShowCharacterModal] = React.useState(false);
    const [showAISettings, setShowAISettings] = React.useState(false);
    const [apiKey, setApiKey] = React.useState(
        import.meta.env.VITE_GEMINI_API_KEY ||
        localStorage.getItem('ai_api_key') ||
        localStorage.getItem('gemini_api_key') || ''
    );
    const [aiProvider, setAiProvider] = React.useState(localStorage.getItem('ai_provider') || 'gemini');
    const [aiModel, setAiModel] = React.useState(localStorage.getItem('ai_model') || '');
    const [searchQuery, setSearchQuery] = React.useState(() => localStorage.getItem('searchQuery') || '');
    const [showApiKey, setShowApiKey] = React.useState(false);
    const [showModelInput, setShowModelInput] = React.useState(!!localStorage.getItem('ai_model'));
    const [debouncedSearchQuery, setDebouncedSearchQuery] = React.useState(searchQuery);
    const mainRef = React.useRef(null);

    // LocalStorage sync effects
    React.useEffect(() => {
        localStorage.setItem('isSidebarPinned', isSidebarPinned);
    }, [isSidebarPinned]);

    React.useEffect(() => {
        localStorage.setItem('searchQuery', searchQuery);
    }, [searchQuery]);

    // Search debounce - for performance
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Restore scroll position
    React.useEffect(() => {
        const savedScroll = localStorage.getItem(`scroll_${activeTab}`);
        if (mainRef.current && savedScroll) {
            mainRef.current.scrollTop = parseInt(savedScroll, 10);
        }
    }, [activeTab]);

    /**
     * Save scroll position
     * @param {Event} e - Scroll event
     */
    const handleScroll = (e) => {
        localStorage.setItem(`scroll_${activeTab}`, e.target.scrollTop);
    };

    /**
     * Save API key to localStorage
     */
    const saveApiKey = () => {
        localStorage.setItem('ai_api_key', apiKey);
        localStorage.setItem('ai_provider', aiProvider);
        localStorage.setItem('ai_model', aiModel);
        setShowAISettings(false);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    // Content push state (for sidebar)
    const isPushed = isSidebarPinned || isSidebarOpen;

    /**
     * Open add character modal
     */
    const handleAddCharacter = () => {
        setShowCharacterModal(true);
    };

    /**
     * Select new character and add to list
     * @param {Object} newChar - Selected character data
     */
    const handleSelectCharacter = (newChar) => {
        const charWithId = {
            ...newChar,
            id: Date.now() + Math.random()
        };
        setCharacters([charWithId, ...characters]);
        setShowCharacterModal(false);
    };

    /**
     * Create new todo list
     */
    const handleAddList = () => {
        setTodoLists([...todoLists, { title: t('tasks.newList'), items: [] }]);
    };

    /**
     * Export all data as JSON
     */
    const handleExport = () => {
        try {
            const data = {
                characters,
                pairings,
                todoLists,
                exportedAt: new Date().toISOString()
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `fe-awakening-save-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Export error:', error);
            alert(t('common.exportError') || 'Data could not be exported.');
        }
    };

    /**
     * Import data from JSON file
     */
    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data = JSON.parse(event.target.result);
                        if (data.characters) setCharacters(data.characters);
                        if (data.pairings) setPairings(data.pairings);
                        if (data.todoLists) setTodoLists(data.todoLists);
                        alert(t('common.importSuccess') || 'Data imported successfully!');
                    } catch (err) {
                        console.error('Import error:', err);
                        alert(t('common.importError') || 'File could not be read. Make sure it is a valid JSON file.');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    };

    return (
        <div className="flex flex-col h-screen bg-darkbg text-gray-200 overflow-hidden font-inter">
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isPushed ? 'h-0 opacity-0' : 'h-8 opacity-100'}`}>
                <TitleBar isPushed={isPushed} />
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Background Video */}
                <video autoPlay muted loop playsInline className="fixed inset-0 w-full h-full object-cover z-[-2] opacity-50 pointer-events-none">
                    <source src="images/YTDown.com_YouTube_Fire-Emblem-Awakening-Opening-Remastered_Media_mfxoCoL52lA_004_360p.mp4" type="video/mp4" />
                </video>
                <div className="fixed inset-0 bg-black/75 z-[-1] pointer-events-none"></div>

                {/* Global Language Switcher - Only on Home */}
                {activeTab === 'home' && (
                    <div className="fixed top-12 right-6 z-[9999] flex items-center gap-3 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-gold/30 shadow-2xl animate-in slide-in-from-top-2 duration-300">
                        <Globe size={14} className="text-gold" />
                        <div className="flex gap-2">
                            <button
                                onClick={() => changeLanguage('tr')}
                                className={`px-3 py-1 rounded-lg text-[10px] font-bold font-cinzel transition-all border uppercase tracking-wider ${i18n.language.startsWith('tr') ? 'bg-gold text-black border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'}`}
                            >
                                Türkçe
                            </button>
                            <div className="w-[1px] h-3 bg-white/10 self-center"></div>
                            <button
                                onClick={() => changeLanguage('en')}
                                className={`px-3 py-1 rounded-lg text-[10px] font-bold font-cinzel transition-all border uppercase tracking-wider ${i18n.language.startsWith('en') ? 'bg-gold text-black border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'}`}
                            >
                                English
                            </button>
                        </div>
                    </div>
                )}

                {/* Sidebar */}
                <Sidebar
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    characterCount={charCount}
                    pairingCount={pairCount}
                    todoCount={todoCount}
                    isPinned={isSidebarPinned}
                    onPinChange={setIsSidebarPinned}
                    isOpen={isSidebarOpen}
                    onOpenChange={setIsSidebarOpen}
                    onExport={handleExport}
                    onImport={handleImport}
                />

                {/* Main Content Area */}
                <main
                    ref={mainRef}
                    onScroll={handleScroll}
                    className={`flex-1 pt-8 px-8 pb-4 overflow-y-auto h-full transition-[margin-left] duration-300 ease-in-out will-change-[margin-left] ${isPushed ? 'ml-64' : 'ml-0'}`}
                >
                    <div className="h-full flex flex-col pr-2">
                        {activeTab !== 'home' && (
                            <header className="mb-8 flex justify-between items-center bg-black/20 backdrop-blur-md p-4 rounded-xl border border-white/5 shadow-2xl relative z-30">
                                <h2 className="text-3xl text-gold font-cinzel font-bold uppercase tracking-wider drop-shadow-lg flex items-center gap-3">
                                    {activeTab === 'characters' && <><Users size={28} className="text-gold" /> {t('characters.title')}</>}
                                    {activeTab === 'pairings' && <><FlaskConical size={28} className="text-gold" /> {t('geneticLab.title')}</>}
                                    {activeTab === 'inventory' && <><Backpack size={28} className="text-gold" /> {t('inventory.title')}</>}
                                    {activeTab === 'todo' && <><Scroll size={28} className="text-gold" /> {t('tasks.title')}</>}
                                    {activeTab === 'wiki' && <><BookOpen size={28} className="text-gold" /> {t('wiki.title')}</>}
                                    {activeTab === 'lucina' && (
                                        <div className="flex items-center group cursor-default">
                                            <span className="font-cinzel font-black tracking-[0.2em] text-gold drop-shadow-md">AEGIS</span>
                                            <span className="mx-2 text-gray-500 font-cinzel font-light text-xl">|</span>
                                            <span className="font-cinzel font-black tracking-[0.2em] text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.8)]">INTEL</span>
                                        </div>
                                    )}
                                </h2>

                                {/* Global Action Buttons moved to Header */}
                                <div className="flex items-center gap-4">
                                    {activeTab === 'characters' && (
                                        <>
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                <input
                                                    type="text"
                                                    placeholder={t('common.search')}
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="bg-white/5 border border-gray-700/50 rounded-full pl-10 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-gold/50 w-48 transition-all focus:w-64"
                                                />
                                            </div>
                                            <button
                                                onClick={handleAddCharacter}
                                                className="bg-blue-600/80 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95 transition text-sm font-bold"
                                            >
                                                <Plus size={16} /> {t('characters.addHero')}
                                            </button>
                                        </>
                                    )}



                                    {activeTab === 'todo' && (
                                        <button
                                            onClick={handleAddList}
                                            className="bg-gray-700/80 hover:bg-gray-600 text-white px-4 py-1.5 rounded-lg text-sm flex items-center gap-2 active:scale-95 transition font-bold"
                                        >
                                            <Plus size={16} /> {t('tasks.newList')}
                                        </button>
                                    )}

                                    {activeTab === 'lucina' && (
                                        <div className="relative">
                                            <button
                                                onClick={() => setShowAISettings(!showAISettings)}
                                                className={`p-2 rounded-full transition ${showAISettings ? 'bg-gold/20 text-gold shadow-[0_0_15px_rgba(235,254,107,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                                title={t('lucina.aiSettings') || 'AI Settings'}
                                            >
                                                <Settings size={20} />
                                            </button>

                                            {showAISettings && (
                                                <div className="absolute right-0 top-full mt-3 w-80 sm:w-96 z-[100] bg-[#0f172a] border border-gold/40 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200 origin-top-right ring-1 ring-white/10">
                                                    <div className="absolute -top-2 right-2.5 w-4 h-4 bg-[#0f172a] border-t border-l border-gold/40 transform rotate-45"></div>

                                                    <h3 className="text-gold font-cinzel text-sm mb-3 flex items-center gap-2 pb-2 border-b border-gray-700">
                                                        <Cpu size={14} /> API INTEGRATION
                                                    </h3>

                                                    <div className="space-y-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Model Provider</label>
                                                            <div className="flex flex-col gap-2">
                                                                <select
                                                                    value={aiProvider}
                                                                    onChange={(e) => setAiProvider(e.target.value)}
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

                                                                {!showModelInput ? (
                                                                    <button
                                                                        onClick={() => setShowModelInput(true)}
                                                                        className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors text-left w-fit px-1 italic"
                                                                    >
                                                                        + Enter Custom Model Name
                                                                    </button>
                                                                ) : (
                                                                    <div className="relative animate-in slide-in-from-top-1 duration-200">
                                                                        <input
                                                                            type="text"
                                                                            value={aiModel}
                                                                            autoFocus
                                                                            onChange={(e) => setAiModel(e.target.value)}
                                                                            placeholder="Custom Model Name (Optional)..."
                                                                            className="w-full bg-black/50 border border-gold/30 focus:border-gold/50 rounded-lg px-3 py-2 text-[11px] text-gray-300 outline-none transition-all placeholder-gray-600 italic mt-1"
                                                                        />
                                                                        <button
                                                                            onClick={() => { setShowModelInput(false); setAiModel(''); }}
                                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-400 p-1"
                                                                            title="Clear and Close"
                                                                        >
                                                                            <RefreshCw size={10} />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1.5">
                                                            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">API Key</label>
                                                            <div className="flex gap-2">
                                                                <div className="flex-1 relative">
                                                                    <input
                                                                        type={showApiKey ? "text" : "password"}
                                                                        value={apiKey}
                                                                        onChange={(e) => setApiKey(e.target.value)}
                                                                        placeholder="API Key..."
                                                                        className={`w-full bg-black/50 border rounded-lg pl-3 pr-10 py-2 text-sm text-white focus:ring-1 outline-none transition-all placeholder-gray-600 ${apiKey.trim().length >= 20
                                                                            ? 'border-green-500/50 focus:border-green-500 ring-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]'
                                                                            : 'border-gray-700 focus:border-gold focus:ring-gold/50'
                                                                            }`}
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setShowApiKey(!showApiKey)}
                                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                                                        title={showApiKey ? "Hide" : "Show"}
                                                                    >
                                                                        {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                                                                    </button>
                                                                </div>
                                                                <button
                                                                    onClick={saveApiKey}
                                                                    className="bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 hover:border-gold/60 px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 whitespace-nowrap"
                                                                >
                                                                    <Save size={14} /> {t('common.save')}
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="text-[10px] text-gray-500 leading-relaxed italic border-t border-gray-800 pt-3">
                                                            * With an API key, Aegis Intel can perform deeper strategic analyses.
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {['characters', 'pairings', 'inventory', 'todo'].includes(activeTab) && (
                                        <button
                                            onClick={() => window.location.reload()}
                                            className="bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1.5 rounded-lg active:scale-95 transition border border-white/10"
                                            title={t('common.refresh') || 'Refresh'}
                                        >
                                            <RefreshCw size={16} />
                                        </button>
                                    )}
                                </div>
                            </header>
                        )}

                        {/* Dynamic Content */}
                        <div className="flex-1 overflow-hidden relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="h-full"
                                >
                                    {activeTab === 'home' && <LandingPage />}
                                    {activeTab === 'characters' && (
                                        <Characters
                                            characters={characters}
                                            setCharacters={setCharacters}
                                            searchQuery={debouncedSearchQuery}
                                            isLoading={loading}
                                        />
                                    )}

                                    {activeTab === 'pairings' && (
                                        <Pairings
                                            pairings={pairings}
                                            setPairings={setPairings}
                                            supportRanks={supportRanks}
                                            setSupportRanks={setSupportRanks}
                                            showAddModal={showAddPairingModal}
                                            setShowAddModal={setShowAddPairingModal}
                                            characters={characters}
                                            isLoading={loading}
                                        />
                                    )}

                                    {activeTab === 'todo' && (
                                        <TodoList todoLists={todoLists} setTodoLists={setTodoLists} isLoading={loading} />
                                    )}

                                    {activeTab === 'inventory' && (
                                        <Inventory inventory={inventory} setInventory={setInventory} />
                                    )}

                                    {activeTab === 'wiki' && (
                                        <Wiki />
                                    )}

                                    {activeTab === 'lucina' && (
                                        <LucinaChat
                                            showSettings={showAISettings}
                                            setShowSettings={setShowAISettings}
                                            characters={characters}
                                            setCharacters={setCharacters}
                                            pairings={pairings}
                                            setPairings={setPairings}
                                            supportRanks={supportRanks}
                                            setSupportRanks={setSupportRanks}
                                            todoLists={todoLists}
                                            setTodoLists={setTodoLists}
                                            chats={chats}
                                            setChats={setChats}
                                            inventory={inventory}
                                            setInventory={setInventory}
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </main>
            </div>
            {showCharacterModal && (
                <CharacterSelectionModal
                    onClose={() => setShowCharacterModal(false)}
                    onSelect={handleSelectCharacter}
                    existingNames={characters.map(c => c.name)}
                />
            )}
        </div>
    );
}

export default App;
