import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Heart, ArrowRight, ChevronDown, GripVertical, Check, X, Pencil, Route, ChevronRight } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { useTranslation } from 'react-i18next';
import { CSS } from '@dnd-kit/utilities';

const SortableFamilyCard = ({ family, idx, expandedFamilies, toggleFamily, handleUpdate, handleDelete, setSelectingParent }) => {
    const { t } = useTranslation();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: family.familyId });
    const [isEditing, setIsEditing] = useState(false);
    const [showRoutes, setShowRoutes] = useState(false);
    const inputRef = useRef(null);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? 'none' : transition,
        opacity: isDragging ? 0.7 : 1,
        zIndex: isDragging ? 50 : 'auto',
    };

    const isExpanded = expandedFamilies[family.familyId || idx];

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    return (
        <div ref={setNodeRef} style={style} className="bg-black/40 backdrop-blur-md border border-gray-700/50 rounded-xl relative overflow-hidden hover:border-gold/50 transition-colors shadow-xl group">
            {/* Gold Accent Bar */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gold z-20"></div>

            {/* Header Content */}
            <div
                className="relative py-4 px-3 min-h-[60px] flex items-center cursor-pointer select-none"
                onClick={() => toggleFamily(family.familyId || idx)}
            >

                {/* Drag Handle - Absolute Left & Centered */}
                <div
                    {...attributes}
                    {...listeners}
                    className="absolute left-4 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing text-gray-600 hover:text-gold transition-colors z-20 p-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    <GripVertical size={18} />
                </div>

                {/* Family Name Input - Perfect tracking using ghost span */}
                <div className="flex-1 ml-10 mr-16 relative">
                    <div className="inline-grid items-center group/edit relative max-w-[250px]">
                        {/* Measuring Span (Invisible) */}
                        <span className="invisible col-start-1 row-start-1 whitespace-pre font-cinzel text-sm font-bold uppercase tracking-wider px-0.5 min-w-[8ch]">
                            {family.familyName || t('geneticLab.project')}
                        </span>

                        {/* Static Display or Interactive Input */}
                        {isEditing ? (
                            <input
                                ref={inputRef}
                                type="text"
                                value={family.familyName || ''}
                                onChange={(e) => handleUpdate(idx, { ...family, familyName: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === 'Escape') setIsEditing(false);
                                }}
                                onBlur={() => setIsEditing(false)}
                                onClick={(e) => e.stopPropagation()}
                                className="col-start-1 row-start-1 bg-transparent text-gold font-bold uppercase tracking-wider text-sm w-full focus:outline-none border-b border-gold font-cinzel placeholder-gray-700 relative z-30"
                                placeholder={t('geneticLab.project')}
                            />
                        ) : (
                            <span className="col-start-1 row-start-1 text-gold font-bold uppercase tracking-wider text-sm font-cinzel truncate py-0.5 border-b border-transparent relative z-10">
                                {family.familyName || t('geneticLab.project')}
                            </span>
                        )}

                        {/* Pencil Icon - Now a functional edit button */}
                        <div
                            className="absolute left-full ml-2 flex items-center h-full cursor-pointer z-40"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditing(true);
                            }}
                        >
                            <Pencil size={12} className="text-gold/50 opacity-0 group-hover/edit:opacity-100 transition-opacity shrink-0" />
                        </div>
                    </div>

                    {/* Collapsed Summary */}
                    {!isExpanded && (
                        <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">
                            <span className="truncate max-w-[60px] text-gray-400">{family.parent1 || '?'}</span>
                            <Heart size={8} className="text-red-500/40 fill-red-500/20" />
                            <span className="truncate max-w-[60px] text-gray-400">{family.parent2 || '?'}</span>
                            <ArrowRight size={8} className="text-gray-600" />
                            <span className="text-gold/60 truncate max-w-[60px]">{family.child || '?'}</span>
                        </div>
                    )}
                </div>

                {/* Right Controls - Absolute Right & Centered */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 z-20">
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-gray-600 group-hover:text-gold transition-colors p-1">
                        <ChevronDown size={18} />
                    </motion.div>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(idx); }} className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100" title={t('common.delete')}>
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Expanded Body */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="border-t border-gray-800/50 p-4 pt-5">
                            <div className="flex flex-col gap-4 text-sm">
                                <div className="flex items-stretch gap-2">
                                    {/* Father */}
                                    <div onClick={() => setSelectingParent({ index: idx, side: 'parent1' })} className="flex-1 relative cursor-pointer rounded bg-black/30 border border-gray-800 hover:border-blue-500/50 transition-all">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-700"></div>
                                        <div className="p-3 pl-4">
                                            <div className="text-[10px] uppercase tracking-widest text-blue-400/80 font-bold">{t('geneticLab.father')}</div>
                                            <div className="text-base font-cinzel font-bold text-gray-200 truncate">{family.parent1 || t('common.select')}</div>
                                        </div>
                                    </div>

                                    {/* Rank Badge */}
                                    <div className="flex items-center justify-center px-2 cursor-pointer" onClick={() => {
                                        const ranks = ['Planned', 'C Rank', 'B Rank', 'A Rank', 'S Rank'];
                                        const currentIdx = ranks.indexOf(family.status || 'Planned');
                                        handleUpdate(idx, { ...family, status: ranks[(currentIdx + 1) % ranks.length] });
                                    }} title={t('geneticLab.rank')}>
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${family.status === 'S Rank' ? 'bg-gold/20' : 'bg-black/60'}`}>
                                            <span className={`font-cinzel font-bold text-sm ${family.status === 'S Rank' ? 'text-gold' : 'text-gold/70'}`}>
                                                {(!family.status || family.status === 'Planned') ? '-' : family.status.charAt(0)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Mother */}
                                    <div onClick={() => setSelectingParent({ index: idx, side: 'parent2' })} className="flex-1 relative cursor-pointer rounded bg-black/30 border border-gray-800 hover:border-pink-500/50 transition-all">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-400 to-pink-700"></div>
                                        <div className="p-3 pl-4">
                                            <div className="text-[10px] uppercase tracking-widest text-pink-400/80 font-bold">{t('geneticLab.mother')}</div>
                                            <div className="text-base font-cinzel font-bold text-gray-200 truncate">{family.parent2 || t('common.select')}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Child */}
                                <div className="mt-4 flex justify-center">
                                    <div className="relative rounded bg-black/30 border border-gray-800 hover:border-gold/50 transition-all flex items-center justify-between group/child w-full max-w-[260px] shadow-lg overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold to-yellow-700"></div>
                                        <div className="p-3 pl-4 flex-1">
                                            <div className="text-[10px] uppercase tracking-widest text-gold/80 font-bold">{t('geneticLab.child')}</div>
                                            <div className="text-base font-cinzel font-bold text-gray-200 truncate">{family.child || '?'}</div>
                                        </div>
                                        <div className="pr-3">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleUpdate(idx, { ...family, recruited: !family.recruited }); }}
                                                className={`p-1.5 rounded-lg transition-colors border ${family.recruited ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-gray-800/50 border-gray-700 text-gray-500 hover:text-gray-300'}`}
                                                title={family.recruited ? t('geneticLab.recruited') : t('geneticLab.notRecruited')}
                                            >
                                                {family.recruited ? <Check size={14} /> : <X size={14} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Parent Routes Section */}
                                <div className="mt-4 border-t border-gray-800/30 pt-4">
                                    <button
                                        onClick={() => setShowRoutes(!showRoutes)}
                                        className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 hover:text-gold transition-colors font-bold w-full"
                                    >
                                        <Route size={12} />
                                        <span>{t('geneticLab.parentRoutes')}</span>
                                        <ChevronRight size={12} className={`transition-transform duration-200 ${showRoutes ? 'rotate-90' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {showRoutes && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="grid grid-cols-1 gap-3 mt-3">
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] text-blue-400/60 uppercase font-bold tracking-tighter">{t('geneticLab.fatherRoute')}</label>
                                                        <input
                                                            type="text"
                                                            value={family.parent1Route || ''}
                                                            onChange={(e) => handleUpdate(idx, { ...family, parent1Route: e.target.value })}
                                                            placeholder="Ex: Cavalier -> Paladin"
                                                            className="w-full bg-black/20 border border-gray-800/50 rounded p-2 text-xs text-gray-300 focus:outline-none focus:border-blue-500/30 transition-colors font-cinzel"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] text-pink-400/60 uppercase font-bold tracking-tighter">{t('geneticLab.motherRoute')}</label>
                                                        <input
                                                            type="text"
                                                            value={family.parent2Route || ''}
                                                            onChange={(e) => handleUpdate(idx, { ...family, parent2Route: e.target.value })}
                                                            placeholder="Ex: Pegasus -> Dark Flier"
                                                            className="w-full bg-black/20 border border-gray-800/50 rounded p-2 text-xs text-gray-300 focus:outline-none focus:border-pink-500/30 transition-colors font-cinzel"
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SortableFamilyCard;
