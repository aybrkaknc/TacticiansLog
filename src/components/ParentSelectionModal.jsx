import React, { useState } from 'react';
import { X, Search, Shield, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GAME_DATA } from '../data/gameConstants';

const ParentSelectionModal = ({ onClose, onSelect, characters, side }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChars = characters.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.class.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get portrait filename from GAME_DATA or generate from name
    const getPortraitFile = (name) => {
        const charData = GAME_DATA.characters?.find(c => c.name === name);
        if (charData?.portrait) return charData.portrait;
        return name.replace(/ /g, '_').replace(/[\(\)\']/g, '');
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-2xl h-[70vh] flex flex-col shadow-2xl overflow-hidden relative">
                {/* Header */}
                <div className="p-6 border-b border-gray-800 bg-black/40 flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-xl text-gold font-cinzel font-bold flex items-center gap-2">
                            <User className="text-blue-400" />
                            {side === 'parent1' ? t('geneticLab.selectFather') : t('geneticLab.selectMother')}
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">{t('geneticLab.selectParentSubtitle')}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition text-gray-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 bg-gray-800/50 border-b border-gray-800 shrink-0">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder={t('common.search')}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full bg-black/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-gold focus:outline-none placeholder-gray-600"
                            autoFocus
                        />
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-4 bg-black/20 scroll-custom">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {filteredChars.map((char, idx) => (
                            <div
                                key={char.id || idx}
                                onClick={() => onSelect(char)}
                                className="group bg-gray-800/40 border border-gray-700 hover:border-gold rounded-lg p-3 cursor-pointer transition-all hover:bg-gray-800 hover:-translate-y-1 relative overflow-hidden flex items-center gap-3"
                            >
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold/30 bg-black/40 shrink-0 flex items-center justify-center">
                                    <img
                                        src={`images/portraits/${getPortraitFile(char.name)}.png`}
                                        alt={char.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextElementSibling && (e.target.nextElementSibling.style.display = 'flex');
                                        }}
                                    />
                                    <Shield size={20} className="text-gold hidden" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-gray-200 group-hover:text-gold transition-colors truncate font-cinzel">{char.name}</h3>
                                    <p className="text-xs text-blue-400 truncate">{char.class} - {t('characters.level')} {char.level}</p>
                                </div>
                            </div>
                        ))}

                        {filteredChars.length === 0 && (
                            <div className="col-span-full py-8 text-center text-gray-500">
                                {t('geneticLab.noSavedCharacters')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentSelectionModal;
