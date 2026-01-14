import React from 'react';
import { Minus, Square, X } from 'lucide-react';

const TitleBar = ({ isPushed }) => {
    const handleMinimize = () => {
        if (window.electronAPI) window.electronAPI.minimize();
    };

    const handleMaximize = () => {
        if (window.electronAPI) window.electronAPI.maximize();
    };

    const handleClose = () => {
        if (window.electronAPI) window.electronAPI.close();
    };

    return (
        <div className="h-8 bg-black/90 flex items-center justify-between px-2 select-none border-b border-gray-800" style={{ WebkitAppRegion: 'drag' }}>
            {/* Title / Icon */}
            <div className={`flex items-center gap-2 px-2 transition-[margin] duration-300 ease-in-out ${isPushed ? 'ml-64' : 'ml-0'}`}>
                <span className="text-gold font-cinzel font-bold text-xs tracking-widest">TACTICIAN'S LOG</span>
            </div>

            {/* Controls */}
            <div className="flex" style={{ WebkitAppRegion: 'no-drag' }}>
                <button
                    onClick={handleMinimize}
                    className="w-10 h-8 flex items-center justify-center text-gold hover:bg-white/10 hover:text-white transition"
                >
                    <Minus size={14} />
                </button>
                <button
                    onClick={handleMaximize}
                    className="w-10 h-8 flex items-center justify-center text-gold hover:bg-white/10 hover:text-white transition"
                >
                    <Square size={12} />
                </button>
                <button
                    onClick={handleClose}
                    className="w-10 h-8 flex items-center justify-center text-gold hover:bg-red-600 hover:text-white transition"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    );
};

export default TitleBar;
