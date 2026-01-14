import React, { useState, useEffect } from 'react';
import { X, Search, UserPlus, Shield, Zap, Heart, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MARRIAGE_COMPATIBILITY } from '../data/marriageData';

const CharacterSelectionModal = ({ onClose, onSelect, existingNames = [], filterPredicate = null, supportRanks = {}, currentPartner = null }) => {
    const { t } = useTranslation();
    const [baseCharacters, setBaseCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('./data/base_characters.json')
            .then(res => res.json())
            .then(data => {
                // Sort by name
                const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
                setBaseCharacters(sorted);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load base characters", err);
                setLoading(false);
            });
    }, []);

    const filteredChars = baseCharacters.filter(c =>
        !existingNames.includes(c.name) && // Filter out existing
        (c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.class.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!filterPredicate || filterPredicate(c))
    );

    const handleCustomCharacter = () => {
        onSelect({
            isCustom: true,
            name: t('characters.newHero'),
            class: "Tactician",
            level: 1,
            stats: { HP: 20, Str: 5, Mag: 5, Skl: 5, Spd: 5, Lck: 5, Def: 5, Res: 5 },
            weaponRanks: [{ type: "Sword", rank: "E" }, { type: "", rank: "" }],
            equippedSkills: []
        });
    };

    const handleSelect = (char) => {
        // Create a new character instance from the base template
        onSelect({
            ...char,
            isCustom: false,
            // Ensure we have all necessary fields even if json is missing some
            weaponRanks: char.weaponRanks || [{ type: "Sword", rank: "E" }, { type: "", rank: "" }],
            equippedSkills: char.skills?.equipped || [],
            inventory: [],
            id: Date.now() // Will be overwritten by App but good to have
        });
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-5xl h-[80vh] flex flex-col shadow-2xl overflow-hidden relative">
                {/* Header */}
                <div className="p-6 border-b border-gray-800 bg-black/40 flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-2xl text-gold font-cinzel font-bold flex items-center gap-3">
                            <UserPlus className="text-blue-400" />
                            {t('characters.selectionTitle')}
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">{t('characters.selectionSubtitle')}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition text-gray-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Search & Actions */}
                <div className="p-4 bg-gray-800/50 border-b border-gray-800 flex gap-4 shrink-0">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder={t('characters.searchPlaceholder')}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full bg-black/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-gold focus:outline-none placeholder-gray-600"
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={handleCustomCharacter}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition flex items-center gap-2"
                    >
                        <span>{t('characters.customHero')}</span>
                        <Zap size={18} className="fill-current" />
                    </button>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-black/20 scroll-custom">
                    {loading ? (
                        <div className="flex items-center justify-center h-full text-gold font-cinzel text-xl animate-pulse">
                            {t('common.loading')}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredChars.map((char, idx) => {
                                const getPortraitPath = (charName) => {
                                    if (!charName) return '';
                                    let name = charName;

                                    // Special case for Avatar and Robin
                                    if (name.includes('Avatar') || name.includes('Robin')) {
                                        const isMale = name.includes('(M)') || name.includes('Chrom') || name.includes('Frederick');
                                        const base = name.includes('Avatar') ? 'Avatar' : 'Robin';
                                        return isMale ? `${base}_M` : `${base}_F`;
                                    }

                                    // Cleanup: remove ' and spaces
                                    return name.replace(/'/g, '').replace(/\s+/g, '');
                                };

                                // Simple error handler - show placeholder on any error
                                const handlePortraitError = (e) => {
                                    e.target.onerror = null; // Prevent infinite loop
                                    e.target.src = '/images/no_portrait.png';
                                };

                                // Fallback image for initial load
                                const NO_PORTRAIT = '/images/no_portrait.png';

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => handleSelect(char)}
                                        className="group bg-gray-800/40 border border-gray-700 hover:border-gold rounded-lg p-3 cursor-pointer transition-all hover:bg-gray-800 hover:-translate-y-1 relative overflow-hidden flex gap-4"
                                    >
                                        {/* Portrait with Support Indicators */}
                                        <div className="shrink-0 flex flex-col items-center">
                                            <div className="w-16 h-16 rounded-lg border border-gray-700 overflow-hidden bg-black/40">
                                                <img
                                                    src={`./images/portraits/${getPortraitPath(char.name)}.png`}
                                                    alt={char.name}
                                                    className="w-full h-full object-cover"
                                                    onError={handlePortraitError}
                                                />
                                            </div>
                                            {/* Support Indicators - Below Portrait */}
                                            {currentPartner && (() => {
                                                const key = [currentPartner.name, char.name].sort().join('-');
                                                const rank = supportRanks[key];

                                                // Canon/Best Match Logic: First item in marriage list
                                                const partnerName = currentPartner.name.replace('Avatar', 'Robin');
                                                const compatibleList = MARRIAGE_COMPATIBILITY[partnerName];
                                                const isBestMatch = compatibleList && compatibleList[0] && (char.name.includes(compatibleList[0]) || compatibleList[0].includes(char.name));

                                                if (!rank && !isBestMatch) return null;

                                                return (
                                                    <div className="flex items-center gap-1.5 mt-1.5">
                                                        {isBestMatch && (
                                                            <Star size={14} className="text-gold fill-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]" strokeWidth={2.5} title={t('characters.recommendedPartner')} />
                                                        )}
                                                        {rank && (
                                                            <span className="text-[12px] font-bold text-pink-400 font-cinzel drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]">{rank}</span>
                                                        )}
                                                    </div>
                                                );
                                            })()}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-sm font-bold text-gray-200 group-hover:text-gold transition-colors truncate">{char.name}</h3>
                                                <span className="text-[10px] bg-black/50 px-1.5 py-0.5 rounded text-gray-400 border border-gray-700 shrink-0 ml-2">{t('characters.level')} {char.level}</span>
                                            </div>
                                            <div className="text-[11px] text-blue-400 font-medium mb-2">{char.class}</div>

                                            <div className="grid grid-cols-4 gap-1 text-[9px] text-gray-500">
                                                <div className="bg-black/30 rounded p-1 text-center">
                                                    <span className="block text-gray-600">STR</span>
                                                    <span className="text-gray-300 font-bold">{char.stats.Str}</span>
                                                </div>
                                                <div className="bg-black/30 rounded p-1 text-center">
                                                    <span className="block text-gray-600">MAG</span>
                                                    <span className="text-gray-300 font-bold">{char.stats.Mag}</span>
                                                </div>
                                                <div className="bg-black/30 rounded p-1 text-center">
                                                    <span className="block text-gray-600">SPD</span>
                                                    <span className="text-gray-300 font-bold">{char.stats.Spd}</span>
                                                </div>
                                                <div className="bg-black/30 rounded p-1 text-center">
                                                    <span className="block text-gray-600">DEF</span>
                                                    <span className="text-gray-300 font-bold">{char.stats.Def}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {filteredChars.length === 0 && (
                                <div className="col-span-full h-40 flex flex-col items-center justify-center text-gray-500">
                                    <Search size={32} className="mb-2 opacity-50" />
                                    <p>{t('characters.noMatch')}</p>
                                </div>
                            )}
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default CharacterSelectionModal;
