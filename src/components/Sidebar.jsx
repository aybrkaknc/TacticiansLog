import React, { useState, useRef, useEffect } from 'react';
import { Menu, Pin, Search, Sword, Music, Pause, Play, Download, Upload, Users, Heart, Scroll, Backpack, BookOpen, FlaskConical } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ activeTab, onTabChange, characterCount, pairingCount, todoCount, isPinned, onPinChange, isOpen, onOpenChange, onExport, onImport }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const { t } = useTranslation();

    /**
     * Toggle background music
     */
    const toggleMedia = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Set initial volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
        }
    }, []);

    /** Menu items */
    const menuItems = [
        { id: 'characters', label: t('sidebar.characters'), icon: Users },
        { id: 'pairings', label: t('sidebar.geneticLab'), icon: FlaskConical },
        { id: 'inventory', label: t('sidebar.inventory'), icon: Backpack },
        { id: 'todo', label: t('sidebar.tasks'), icon: Scroll },
        { id: 'wiki', label: t('sidebar.wiki'), icon: BookOpen },
    ];

    return (
        <>
            {/* Trigger Zone */}
            <div
                onMouseEnter={() => onOpenChange(true)}
                className="fixed left-0 top-0 h-full w-4 z-40"
            />

            {/* Sidebar */}
            <aside
                style={{ WebkitAppRegion: 'no-drag' }}
                onMouseEnter={() => !isPinned && onOpenChange(true)}
                onMouseLeave={() => !isPinned && onOpenChange(false)}
                className={`fixed left-0 top-0 h-full w-64 bg-gray-900/95 backdrop-blur-sm border-r border-gray-700 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen || isPinned ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Pin Handle */}
                <div
                    onClick={() => {
                        onPinChange(!isPinned);
                        if (!isPinned) onOpenChange(true);
                    }}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border border-l-0 rounded-r-lg px-1 py-4 cursor-pointer hover:bg-gold/10 transition ${isPinned ? 'bg-gold/20 border-gold text-gold' : 'bg-gray-900/90 border-gray-700 text-gold'
                        }`}
                >
                    <div className="flex flex-col items-center gap-2 py-1">
                        {isPinned ? <Pin size={16} /> : <Menu size={16} />}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col h-full">
                    <h1
                        onClick={() => onTabChange('home')}
                        className="text-xl text-gold font-bold tracking-wider mb-4 text-center border-b border-gray-700 pb-4 font-cinzel cursor-pointer hover:text-white transition-colors select-none"
                    >
                        {t('sidebar.title')}
                    </h1>

                    <nav className="flex flex-col gap-2 mb-6">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                className={`w-full px-4 py-3 hover:text-white hover:bg-white/5 transition text-left rounded-r flex items-center gap-3 font-space ${activeTab === item.id ? 'text-gold bg-gold/10 border-l-2 border-gold font-bold' : 'text-gray-400 font-medium'
                                    }`}
                            >
                                <item.icon size={16} className={`${activeTab === item.id ? 'text-gold' : 'text-gray-500'} transition-colors`} />
                                <span className="text-sm tracking-wide">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="flex-1"></div>

                    {/* LucinAI Button */}
                    <button
                        onClick={() => onTabChange('lucina')}
                        className={`w-full py-3 px-2 rounded-xl border transition-all duration-300 mb-6 flex items-center justify-center gap-1.5 ${activeTab === 'lucina'
                            ? 'bg-blue-500/10 border-gold/40 shadow-[0_0_20px_rgba(235,254,107,0.15)]'
                            : 'bg-black/20 border-gray-800 hover:border-blue-500/40 hover:bg-black/40'
                            }`}
                    >
                        <span className={`font-cinzel font-black tracking-[0.1em] text-[11px] transition-colors ${activeTab === 'lucina' ? 'text-gold' : 'text-gray-400'}`}>AEGIS</span>
                        <span className="text-gray-700 font-light text-xs">|</span>
                        <span className={`font-cinzel font-black tracking-[0.1em] text-[11px] transition-all ${activeTab === 'lucina' ? 'text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.6)]' : 'text-gray-500'}`}>INTEL</span>
                    </button>

                    {/* Quick Stats */}
                    <div className="mb-4 space-y-2 text-xs">
                        <div className="flex justify-between items-center bg-black/30 px-2 py-1 rounded">
                            <span className="text-gray-500">{t('sidebar.stats.characters')}</span>
                            <span className="text-blue-400 font-bold">{characterCount}</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/30 px-2 py-1 rounded">
                            <span className="text-gray-500">{t('sidebar.stats.couples')}</span>
                            <span className="text-pink-400 font-bold">{pairingCount}</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/30 px-2 py-1 rounded">
                            <span className="text-gray-500">{t('sidebar.stats.pendingTasks')}</span>
                            <span className="text-green-400 font-bold">{todoCount}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-xs text-gray-600 text-center border-t border-gray-800 pt-4 pb-2">
                        <audio ref={audioRef} src="sounds/Dont Speak Her Name.mp3" loop />
                        <div className="flex items-center justify-between px-4">
                            <button
                                onClick={() => window.electronAPI.openExternal('https://github.com/aybrkaknc')}
                                className="hover:text-gold transition-colors focus:outline-none"
                            >
                                Ayberk Akıncı
                            </button>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={onExport}
                                    className="text-gray-600 hover:text-green-400 transition focus:outline-none"
                                    title={t('sidebar.export')}
                                >
                                    <Download size={12} />
                                </button>
                                <button
                                    onClick={onImport}
                                    className="text-gray-600 hover:text-blue-400 transition focus:outline-none"
                                    title={t('sidebar.import')}
                                >
                                    <Upload size={12} />
                                </button>
                                <button
                                    onClick={toggleMedia}
                                    className="text-gray-600 hover:text-purple-400 transition focus:outline-none"
                                    title={isPlaying ? t('sidebar.stop') : t('sidebar.play')}
                                >
                                    {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
