import React, { useState, useRef, useEffect } from 'react';
import { Trash2, ChevronDown, ChevronRight, ImagePlus, GripVertical, Pencil, Backpack, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GAME_DATA } from '../data/gameConstants';
import { ITEM_DATA } from '../data/itemData';
import { CLASSES } from '../data/wikiData';
import { CHARACTER_BASE_DATA } from '../data/characterBaseData';
import { useTranslation } from 'react-i18next';

const CharacterCard = ({ character, index, onDelete, onUpdate, id }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isInventoryExpanded, setIsInventoryExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef(null);
    const inputRef = useRef(null);
    const { t } = useTranslation();

    // Get all available items for dropdown
    const allItems = [...(ITEM_DATA.weapons || []), ...(ITEM_DATA.staves || []), ...(ITEM_DATA.items || [])];

    // Initialize inventory if not present
    const inventory = character.inventory || ['', '', '', '', ''];

    // Get default weapon proficiencies - check CHARACTER_BASE_DATA first
    const getDefaultWeaponRanks = () => {
        // 1. If character already has saved weapon ranks, use them
        if (character.weaponRanks && character.weaponRanks.length > 0) {
            return character.weaponRanks;
        }

        // 2. Check official character base data
        const charBaseData = CHARACTER_BASE_DATA[character.name];
        if (charBaseData && charBaseData.weaponRanks && charBaseData.weaponRanks.length > 0) {
            return charBaseData.weaponRanks;
        }

        // 3. Fallback to class-based weapons
        const classData = CLASSES.find(c => c.name === character.class);
        if (classData && classData.weapons && classData.weapons.length > 0) {
            return classData.weapons.map(weapon => ({ type: weapon, rank: 'E' }));
        }

        // 4. Ultimate fallback: 2 empty slots
        return [{ type: '', rank: '-' }, { type: '', rank: '-' }];
    };

    const weaponRanks = getDefaultWeaponRanks();

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handlePortraitUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                let portraitValue = reader.result;
                if (window.electronAPI) {
                    try {
                        portraitValue = await window.electronAPI.saveImage(reader.result);
                    } catch (err) {
                        console.error("Failed to save custom portrait", err);
                    }
                }
                onUpdate(index, { ...character, customPortrait: portraitValue });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (field, value) => {
        onUpdate(index, { ...character, [field]: value });
    };

    const handleStatChange = (stat, value) => {
        onUpdate(index, {
            ...character,
            stats: { ...character.stats, [stat]: parseInt(value) || 0 }
        });
    };

    const handleWeaponChange = (idx, field, value) => {
        const newWeaponRanks = [...character.weaponRanks];
        newWeaponRanks[idx] = { ...newWeaponRanks[idx], [field]: value };
        onUpdate(index, { ...character, weaponRanks: newWeaponRanks });
    };

    const handleSkillChange = (idx, value) => {
        const newSkills = [...character.equippedSkills];
        newSkills[idx] = value;
        onUpdate(index, { ...character, equippedSkills: newSkills });
    };

    const handleInventoryChange = (idx, itemName) => {
        const newInventory = [...inventory];
        newInventory[idx] = itemName;
        onUpdate(index, { ...character, inventory: newInventory });
    };

    const getSkillIconPath = (skillName) => {
        if (!skillName) return null;
        const filename = skillName.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.png';
        return `/assets/skills/${filename}`;
    };

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? 'none' : transition,
        opacity: isDragging ? 0.7 : 1,
        zIndex: isDragging ? 50 : 'auto',
        willChange: isDragging ? 'transform' : 'auto',
        touchAction: 'none',
    };

    const getPortraitFile = (name) => {
        const charData = GAME_DATA.characters.find(c => c.name === name);
        if (charData?.portrait) return charData.portrait;
        return name.replace(/ /g, '_').replace(/[\(\)\']/g, '');
    };

    const portraitFile = getPortraitFile(character.name);

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="backdrop-blur-md border border-gray-700/50 rounded-xl hover:border-gold/50 transition-all duration-300 group relative overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.1)]"
        >
            {/* Ylissean Gold Accent Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold/80 via-yellow-600/60 to-gold/40 shadow-[0_0_8px_rgba(212,175,55,0.5)] opacity-60 group-hover:opacity-100 transition-opacity z-20"></div>

            {/* Collapsed Card - with portrait background */}
            <div
                className="cursor-pointer select-none p-4 pl-5 relative z-10 overflow-hidden"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {/* Portrait Background with Gradient - inside collapsed section only */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                        src={character.customPortrait || `images/portraits/${portraitFile}.png`}
                        alt=""
                        className="absolute left-0 top-0 h-full w-32 object-cover object-center opacity-50"
                        style={{ maskImage: 'linear-gradient(to right, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 50%, transparent 100%)' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/70 to-black/95"></div>
                </div>
                {/* Main Content Row */}
                <div className="flex items-center gap-3 relative z-10">
                    {/* Drag Handle */}
                    <div
                        {...attributes}
                        {...listeners}
                        className="cursor-grab active:cursor-grabbing text-gray-600 hover:text-gold transition-colors p-1 -ml-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <GripVertical size={16} />
                    </div>

                    {/* Hidden File Input for Portrait Upload */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePortraitUpload}
                        className="hidden"
                    />

                    {/* Name & Class area with perfect tracking name edit */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col items-start">
                            <div className="inline-grid items-center group/edit relative w-fit max-w-[240px]">
                                {/* Measuring Span (Invisible) - Zero padding for flush tracking */}
                                <span className="invisible col-start-1 row-start-1 whitespace-nowrap font-cinzel text-base font-bold uppercase tracking-wider min-w-[5ch]">
                                    {character.name || t('characters.fields.name')}
                                </span>

                                {/* Static Display or Interactive Input */}
                                {isEditing ? (
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={character.name || ''}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === 'Escape') setIsEditing(false);
                                        }}
                                        onBlur={() => setIsEditing(false)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="col-start-1 row-start-1 bg-gold/5 text-gold font-bold uppercase tracking-wider text-base focus:outline-none border-b border-gold/50 font-cinzel placeholder-gray-700 relative z-30 leading-tight rounded-sm w-full"
                                        placeholder={t('characters.fields.name')}
                                    />
                                ) : (
                                    <span className="col-start-1 row-start-1 text-gold font-bold uppercase tracking-wider text-base font-cinzel truncate border-b border-transparent relative z-10 leading-tight group-hover:text-yellow-400 transition-colors">
                                        {character.name || t('characters.fields.name')}
                                    </span>
                                )}
                                <div
                                    className="absolute left-full ml-1.5 flex items-center top-0 bottom-[1px] cursor-pointer z-40"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsEditing(true);
                                    }}
                                >
                                    <Pencil size={11} className="text-gold/50 opacity-0 group-hover/edit:opacity-100 hover:text-gold transition-all shrink-0" />
                                </div>
                            </div>
                            <p className="text-xs text-gray-300 truncate mt-0.5 tracking-wide uppercase font-semibold">{character.class} • Lv {character.level}</p>
                        </div>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-1.5 shrink-0">
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-gray-400 group-hover:text-gold transition-colors"
                        >
                            <ChevronDown size={18} />
                        </motion.div>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(index); }}
                            className="text-gray-500 hover:text-red-400 transition-all duration-200 p-1 rounded-lg hover:bg-red-500/10"
                            title={t('characters.delete')}
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Collapsible Body */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="px-3 pb-3 pt-2 border-t border-gray-800/50 space-y-3">

                            {/* Class & Level */}
                            <div className="grid grid-cols-2 gap-2 text-sm bg-black/20 p-2 rounded">
                                <div>
                                    <label className="text-gray-500 text-xs block font-bold uppercase">{t('characters.fields.class')}</label>
                                    <select
                                        value={character.class}
                                        onChange={(e) => handleChange('class', e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="bg-transparent w-full text-white focus:outline-none border-b border-gray-800 focus:border-gold text-sm h-8"
                                    >
                                        {GAME_DATA.classes.map(c => (
                                            <option key={c.name} value={c.name} className="bg-gray-800 text-white">{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-500 text-xs block font-bold uppercase">{t('characters.fields.level')}</label>
                                    <input
                                        type="number"
                                        value={character.level}
                                        onChange={(e) => handleChange('level', e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="bg-transparent w-full text-white focus:outline-none border-b border-gray-800 focus:border-gold text-sm h-8"
                                    />
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-4 gap-2 text-left text-xs bg-black/20 p-2 rounded">
                                {Object.keys(character.stats).map((stat) => (
                                    <div key={stat} className="flex flex-col pl-1">
                                        <span className="text-gray-500 uppercase font-bold">{stat}</span>
                                        <input
                                            type="number"
                                            value={character.stats[stat]}
                                            onChange={(e) => handleStatChange(stat, e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                            className="bg-transparent text-left w-full focus:outline-none text-white border-b border-gray-800 focus:border-gold"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Weapons & Skills Row */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Weapon Proficiency */}
                                <div className="bg-black/20 p-2.5 rounded-lg border border-gray-800/30 flex flex-col">
                                    <div className="flex items-center gap-2 mb-2">
                                        <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider shrink-0">{t('characters.fields.weapon')}</label>
                                        <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-800/50 to-transparent"></div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        {weaponRanks.map((wpn, idx) => (
                                            <div key={idx} className="flex items-center gap-1 bg-black/30 px-1.5 py-0.5 rounded border border-white/5">
                                                {wpn.type && (
                                                    <img
                                                        src={`images/weapons/${wpn.type.toLowerCase()}.png`}
                                                        alt={wpn.type}
                                                        className="w-3 h-3 object-contain opacity-80"
                                                        onError={(e) => { e.target.style.display = 'none'; }}
                                                    />
                                                )}
                                                <select
                                                    value={wpn.type}
                                                    onChange={(e) => handleWeaponChange(idx, 'type', e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="bg-transparent text-[10px] text-gray-400 font-bold focus:outline-none cursor-pointer hover:text-gold transition-colors flex-1 min-w-[60px]"
                                                >
                                                    <option value="" className="bg-gray-800">-</option>
                                                    {GAME_DATA.weaponTypes.map(t => (
                                                        <option key={t} value={t} className="bg-gray-800">{t}</option>
                                                    ))}
                                                </select>
                                                <select
                                                    value={wpn.rank}
                                                    onChange={(e) => handleWeaponChange(idx, 'rank', e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="bg-transparent text-[10px] text-gold font-bold focus:outline-none cursor-pointer w-4 text-center shrink-0 appearance-none"
                                                >
                                                    {GAME_DATA.weaponRanks.map(r => (
                                                        <option key={r} value={r} className="bg-gray-800">{r}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Active Skills */}
                                <div className="bg-black/20 p-2.5 rounded-lg border border-gray-800/30 flex flex-col">
                                    <div className="flex items-center gap-2 mb-2">
                                        <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider shrink-0">{t('characters.fields.skills')}</label>
                                        <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-800/50 to-transparent"></div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {[0, 1, 2, 3, 4].map(i => (
                                            <div key={i} className="flex items-center gap-2 min-w-0 group/skill">
                                                {/* Status Bar */}
                                                <div className={`w-0.5 h-3 rounded-full shrink-0 transition-colors ${character.equippedSkills[i] ? 'bg-gold/60' : 'bg-gray-800'}`}></div>

                                                {/* Skill Icon */}
                                                <div className="w-5 h-5 rounded bg-black/40 flex items-center justify-center shrink-0 border border-gray-700/50 overflow-hidden group-hover/skill:border-gold/30 transition-colors">
                                                    {character.equippedSkills[i] ? (
                                                        <img
                                                            src={getSkillIconPath(character.equippedSkills[i])}
                                                            alt={character.equippedSkills[i]}
                                                            className="w-full h-full object-cover p-0.5"
                                                            onError={(e) => e.target.style.display = 'none'}
                                                        />
                                                    ) : (
                                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-800/50"></div>
                                                    )}
                                                </div>

                                                {/* Dropdown */}
                                                <select
                                                    value={character.equippedSkills[i] || ''}
                                                    onChange={(e) => handleSkillChange(i, e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="bg-transparent text-[10px] text-gray-400 w-full focus:outline-none hover:text-white transition-colors truncate cursor-pointer leading-tight font-medium"
                                                >
                                                    <option value="" className="bg-gray-800">-</option>
                                                    {GAME_DATA.skills.map(s => (
                                                        <option key={s} value={s} className="bg-gray-800">{s}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Collapsible Inventory Section */}
                            <div className="bg-black/20 rounded-lg border border-gray-800/30 overflow-hidden">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsInventoryExpanded(!isInventoryExpanded); }}
                                    className="w-full flex items-center justify-between p-2.5 hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <Backpack size={14} className="text-gold/70" />
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t('characters.fields.inventory')}</span>
                                        <span className="text-[9px] text-gray-600 bg-black/40 px-1.5 py-0.5 rounded">
                                            {inventory.filter(i => i).length}/5
                                        </span>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: isInventoryExpanded ? 90 : 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <ChevronRight size={12} className="text-gray-600" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {isInventoryExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-2.5 pb-2.5 pt-1 border-t border-gray-800/30 space-y-1.5">
                                                {[0, 1, 2, 3, 4].map(i => {
                                                    const itemName = inventory[i];
                                                    const itemData = allItems.find(it => it.name === itemName);
                                                    return (
                                                        <div key={i} className="flex items-center gap-2 bg-black/30 px-2 py-1.5 rounded border border-white/5 group/inv hover:border-gold/20 transition-colors">
                                                            {/* Slot Number */}
                                                            <span className="text-[9px] text-gray-700 font-bold w-3">{i + 1}</span>

                                                            {/* Item Icon Placeholder */}
                                                            <div className="w-5 h-5 rounded bg-black/50 flex items-center justify-center shrink-0 border border-gray-700/50">
                                                                {itemName ? (
                                                                    <Package size={10} className="text-gold/60" />
                                                                ) : (
                                                                    <div className="w-1 h-1 rounded-full bg-gray-800" />
                                                                )}
                                                            </div>

                                                            {/* Item Dropdown */}
                                                            <select
                                                                value={itemName || ''}
                                                                onChange={(e) => handleInventoryChange(i, e.target.value)}
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="flex-1 bg-transparent text-[10px] text-gray-400 focus:outline-none hover:text-white transition-colors truncate cursor-pointer min-w-0"
                                                            >
                                                                <option value="" className="bg-gray-800">- {t('inventory.emptySlot')} -</option>
                                                                <optgroup label={t('inventory.categories.weapons')} className="bg-gray-800 text-gold">
                                                                    {(ITEM_DATA.weapons || []).map(item => (
                                                                        <option key={item.id} value={item.name} className="bg-gray-800 text-white">
                                                                            {item.name} ({item.rank})
                                                                        </option>
                                                                    ))}
                                                                </optgroup>
                                                                <optgroup label={t('inventory.categories.staves')} className="bg-gray-800 text-blue-400">
                                                                    {(ITEM_DATA.staves || []).map(item => (
                                                                        <option key={item.id} value={item.name} className="bg-gray-800 text-white">
                                                                            {item.name} ({item.rank})
                                                                        </option>
                                                                    ))}
                                                                </optgroup>
                                                                <optgroup label={t('inventory.categories.items')} className="bg-gray-800 text-green-400">
                                                                    {(ITEM_DATA.items || []).map(item => (
                                                                        <option key={item.id} value={item.name} className="bg-gray-800 text-white">
                                                                            {item.name}
                                                                        </option>
                                                                    ))}
                                                                </optgroup>
                                                            </select>

                                                            {/* Item Stats Preview */}
                                                            {itemData && (
                                                                <div className="flex items-center gap-1 text-[8px] text-gray-600 shrink-0">
                                                                    {itemData.might && <span>MT:{itemData.might}</span>}
                                                                    {itemData.hit && <span>HIT:{itemData.hit}</span>}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CharacterCard;
