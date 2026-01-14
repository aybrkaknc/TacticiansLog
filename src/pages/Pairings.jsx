import React, { useState, useEffect } from 'react';
import { Loader2, Heart, Dna, ArrowRight, Save, Trash2, Atom, Baby, FlaskConical, Calculator, X, FlaskRound, CheckCircle2, RotateCcw, Search, Shuffle, ToggleLeft, Activity, Pointer, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, useSensor, useSensors, PointerSensor, DragOverlay, defaultDropAnimationSideEffects, useDraggable, useDroppable } from '@dnd-kit/core';
import { GAME_DATA } from '../data/gameConstants';
import { calculateChildModifiers, getProbableInheritedSkill, calculateSimulatedStats } from '../utils/inheritanceLogic';
import CharacterSelectionModal from '../components/CharacterSelectionModal';
import { MARRIAGE_COMPATIBILITY } from '../data/marriageData';
import { CLASSES } from '../data/wikiData';
import { CHARACTER_CLASS_TREES } from '../data/characterClassTrees';
import { useTranslation } from 'react-i18next';

const GeneticLab = ({ pairings, setPairings, characters, isLoading, supportRanks, setSupportRanks }) => {
    const { t } = useTranslation();
    // Experiment State
    const [father, setFather] = useState(null);
    const [mother, setMother] = useState(null);
    const [childPreview, setChildPreview] = useState(null);
    const [selectingSide, setSelectingSide] = useState(null); // 'father' or 'mother'
    const [atomSpinDirection, setAtomSpinDirection] = useState(null); // null = static, 'cw' = clockwise, 'ccw' = counter-clockwise

    // New State for Upgrade
    const [selectedFatherSkill, setSelectedFatherSkill] = useState(null);
    const [selectedMotherSkill, setSelectedMotherSkill] = useState(null);
    const [simLevel, setSimLevel] = useState(20);
    const [showGrowthSim, setShowGrowthSim] = useState(false);

    // UI State for Skill Selectors
    const [skillMenuOpen, setSkillMenuOpen] = useState(null); // 'father', 'mother', or null

    // Class Selector State
    const [selectedFatherClass, setSelectedFatherClass] = useState(null);
    const [selectedMotherClass, setSelectedMotherClass] = useState(null);
    const [classMenuOpen, setClassMenuOpen] = useState(null); // 'father', 'mother', or null

    // Helper: Get available skills based on class (supports override)
    const getParentSkills = (parent, overrideClass = null) => {
        const className = overrideClass || parent?.class;
        if (!className) return [];
        const cls = CLASSES.find(c => c.name === className);
        return cls ? cls.skills : [];
    };

    // Helper: Get available classes for a character
    const getAvailableClasses = (charName) => {
        const classTree = CHARACTER_CLASS_TREES[charName] || [];
        return CLASSES.filter(c => classTree.includes(c.name));
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            // Check if click is outside any dropdown
            const isDropdownClick = e.target.closest('[data-dropdown]');
            if (!isDropdownClick) {
                setSkillMenuOpen(null);
                setClassMenuOpen(null);
            }
        };

        if (skillMenuOpen || classMenuOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [skillMenuOpen, classMenuOpen]);

    // Calculations
    useEffect(() => {
        if (father && mother) {
            const childName = GAME_DATA.parentChildMap[mother.name] || GAME_DATA.parentChildMap[father.name];

            if (childName) {
                const modifiers = calculateChildModifiers(father.name, mother.name, childName);

                // Use selected skill or default to probable
                const fatherSkill = selectedFatherSkill || getProbableInheritedSkill(father);
                const motherSkill = selectedMotherSkill || getProbableInheritedSkill(mother);

                const childClass = GAME_DATA.characters.find(c => c.name === childName)?.defaultClass || 'Unknown';
                const simulated = calculateSimulatedStats(childClass, modifiers, simLevel);

                setChildPreview({
                    name: childName,
                    stats: modifiers,
                    simulatedStats: simulated,
                    fatherSkill,
                    motherSkill,
                    class: childClass
                });
            } else {
                setChildPreview(null);
            }
        } else {
            setChildPreview(null);
        }
    }, [father, mother, selectedFatherSkill, selectedMotherSkill, simLevel]);

    // Load Draft State on Mount
    useEffect(() => {
        const savedDraft = localStorage.getItem('fe_genetic_lab_draft');
        if (savedDraft) {
            try {
                const draft = JSON.parse(savedDraft);
                /* Validate if characters still exist in global roster? 
                   Ideally yes, but for now just load them. If they were deleted, it might be weird.
                   But let's assume benign usage. */
                if (draft.father) setFather(draft.father);
                if (draft.mother) setMother(draft.mother);
                if (draft.selectedFatherSkill) setSelectedFatherSkill(draft.selectedFatherSkill);
                if (draft.selectedMotherSkill) setSelectedMotherSkill(draft.selectedMotherSkill);
                if (draft.simLevel) setSimLevel(draft.simLevel);
                if (draft.showGrowthSim !== undefined) setShowGrowthSim(draft.showGrowthSim);
            } catch (e) {
                console.error("Failed to load genetic lab draft", e);
            }
        }
    }, []);

    // Save Draft State on Change
    useEffect(() => {
        const draft = {
            father,
            mother,
            selectedFatherSkill,
            selectedMotherSkill,
            simLevel,
            showGrowthSim
        };
        localStorage.setItem('fe_genetic_lab_draft', JSON.stringify(draft));
    }, [father, mother, selectedFatherSkill, selectedMotherSkill, simLevel, showGrowthSim]);

    // Cleanup Draft on Successful Save? 
    // Maybe keep it? Users might want to tweak the same couple. 
    // Let's keep it.

    // Reset selected skills when parents change (Only if not loading from draft? 
    // Actually, setting father triggers this effect. 
    // If we load father from draft, this effect fires and clears the skills we just loaded.
    // We need to guard this.
    // Or, remove these simple effects and handle reset inside setFather wrapper?
    // A better way: check if the new father is different from the draft father?
    // Simpler: Just rely on the user to re-select if they change parents.
    // But we WANT to reset skills if user MANUALLY changes parent.
    // The issue: "setFather" is called on mount from draft.
    // "useEffect(..., [father])" fires. "setSelectedSkill(null)" runs.
    // This wipes the loaded draft skill.

    // Fix: Remove the simple useEffects. 
    // Handle reset logic inside handleSelectCharacter or specific effects withrefs.
    // I will replace the existing lines 66-68 with the Draft Logic + smart reset.

    /* 
       To solve the "reset on change" vs "load draft" conflict:
       I will remove the automatic useEffect resetters.
       Instead, I will manually set skill to null inside `handleSelectCharacter`.
    */

    const handleSelectCharacter = (char) => {
        if (selectingSide === 'father') {
            setFather(char);
            setSelectedFatherSkill(null); // Reset skill when parent changes
            setSelectedFatherClass(null); // Reset class when parent changes
        }
        if (selectingSide === 'mother') {
            setMother(char);
            setSelectedMotherSkill(null); // Reset skill when parent changes
            setSelectedMotherClass(null); // Reset class when parent changes
        }
        setSelectingSide(null);
    };

    const saveExperiment = () => {
        if (!father || !mother || !childPreview) return;

        const newExperiment = {
            id: Date.now(),
            familyId: `gen-lab-${Date.now()}`,
            parent1: father.name,
            parent2: mother.name,
            child: childPreview.name,
            stats: childPreview.stats,
            simulatedStats: childPreview.simulatedStats,
            fatherSkill: childPreview.fatherSkill,
            motherSkill: childPreview.motherSkill,
            date: new Date().toLocaleDateString(),
            status: 'Planned' // Default status
        };

        setPairings([newExperiment, ...pairings]);
        // Reset (optional, maybe keep for adjustments)
    };

    const deleteExperiment = (id) => {
        setPairings(pairings.filter(p => (p.id || p.familyId) !== id));
    };

    const toggleStatus = (id, newStatus) => {
        setPairings(pairings.map(p => {
            if ((p.id || p.familyId) === id) {
                return { ...p, status: newStatus };
            }
            return p;
        }));
    };

    /**
     * Smart Randomizer: Selects the best match among unmarried characters.
     * Priority: S-Rank > Canon (first row) > Random compatible
     */
    const handleSmartRandomize = () => {
        // 1. Find married characters
        const marriedChars = new Set();
        pairings.forEach(p => {
            if (p.parent1) marriedChars.add(p.parent1);
            if (p.parent2) marriedChars.add(p.parent2);
        });

        // 2. Find unmarried males and females
        const maleNames = ['Chrom', 'Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', "Lon'qu", 'Ricken', 'Gaius', 'Gregor', 'Libra', 'Henry', 'Donnel', 'Robin (M)'];
        const femaleNames = ['Lissa', 'Sully', 'Miriel', 'Sumia', 'Maribelle', 'Panne', 'Cordelia', 'Nowi', 'Tharja', 'Olivia', 'Cherche', 'Robin (F)'];

        const unmarriedMales = maleNames.filter(n => !marriedChars.has(n));
        const unmarriedFemales = femaleNames.filter(n => !marriedChars.has(n));

        if (unmarriedMales.length === 0 || unmarriedFemales.length === 0) {
            return;
        }

        // 3. Calculate all possible pairs (all combinations compatible)
        const possiblePairs = [];
        unmarriedMales.forEach(male => {
            unmarriedFemales.forEach(female => {
                const key = [male, female].sort().join('-');
                const rank = supportRanks[key] || '';

                // Scoring: Support rank bonus
                let score = 0;
                if (rank === 'S') score = 100;
                else if (rank === 'A') score = 75;
                else if (rank === 'B') score = 50;
                else if (rank === 'C') score = 25;

                // Strong randomness (between 0-100)
                score += Math.random() * 100;

                possiblePairs.push({ male, female, score });
            });
        });

        if (possiblePairs.length === 0) return;

        // 4. Filter currently selected ones (to change on every click)
        const currentMale = father?.name;
        const currentFemale = mother?.name;

        // Prioritize pairs where both mother and father are different
        let filteredPairs = possiblePairs.filter(p => p.male !== currentMale && p.female !== currentFemale);

        // If none where both are different remain, pick a pair where at least one is different
        if (filteredPairs.length === 0) {
            filteredPairs = possiblePairs.filter(p => p.male !== currentMale || p.female !== currentFemale);
        }

        // If no options left (e.g. only one compatible pair), use original list
        const finalSelectionPool = filteredPairs.length > 0 ? filteredPairs : possiblePairs;

        // Select the highest-scoring pair
        finalSelectionPool.sort((a, b) => b.score - a.score);
        const bestPair = finalSelectionPool[0];

        // 5. Find characters and set them
        const fatherChar = characters.find(c => c.name === bestPair.male) || { name: bestPair.male, class: 'Unknown', stats: {} };
        const motherChar = characters.find(c => c.name === bestPair.female) || { name: bestPair.female, class: 'Unknown', stats: {} };

        setFather(fatherChar);
        setMother(motherChar);

        // Toggle spin direction
        setAtomSpinDirection(prev => prev === 'cw' ? 'ccw' : 'cw');
    };

    // Drag and Drop Logic
    const DisplayProjectCard = ({ exp, isOverlay = false }) => {
        const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
            id: exp.id || exp.familyId,
            data: exp
        });

        const style = isOverlay ? { cursor: 'grabbing', scale: 1.05, opacity: 0.9, zIndex: 999 } : { cursor: 'grab', opacity: isDragging ? 0.3 : 1 };

        return (
            <div
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                style={style}
                onClick={() => !isDragging && loadExperiment(exp)}
                className={`bg-black/40 border ${exp.status === 'S Rank' ? 'border-green-800 hover:border-green-500/50' : 'border-gray-800 hover:border-gold/30'} rounded-lg p-3 flex items-center justify-between group transition-all hover:bg-black/60 relative touch-none select-none`}
            >
                <div className="flex-1 min-w-0">
                    <div className={`font-bold ${exp.status === 'S Rank' ? 'text-green-400' : 'text-gold'} mb-1 truncate text-sm`}>{exp.child}</div>
                    <div className="text-[10px] text-gray-500 truncate">{exp.parent1} & {exp.parent2}</div>

                    {/* Stats Compact */}
                    {exp.stats && isOverlay && (
                        <div className="flex gap-2 mt-2 text-[10px] text-gray-400">
                            <span>SPD {exp.stats.spd}</span>
                            <span>STR {exp.stats.str}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-1 pl-2">
                    {/* Toggle Status Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleStatus(exp.id || exp.familyId, exp.status === 'S Rank' ? 'Planned' : 'S Rank');
                        }}
                        className={`p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100 ${exp.status === 'S Rank' ? 'text-yellow-500 hover:bg-yellow-500/10' : 'text-green-500 hover:bg-green-500/10'}`}
                        title={exp.status === 'S Rank' ? t('geneticLab.movePlanned') : t('geneticLab.moveRealized')}
                    >
                        {exp.status === 'S Rank' ? <RotateCcw size={14} /> : <CheckCircle2 size={14} />}
                    </button>

                    {/* Delete Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteExperiment(exp.id || exp.familyId);
                        }}
                        className="p-1.5 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/10 rounded-full z-10"
                        title={t('geneticLab.deleteProject')}
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
        );
    };

    const DroppableContainer = ({ id, title, icon: Icon, items, type }) => {
        const { setNodeRef, isOver } = useDroppable({ id });

        return (
            <div ref={setNodeRef} className={`flex-1 flex flex-col gap-3 min-h-[200px] p-4 rounded-xl border-2 transition-colors ${isOver ? (type === 'planned' ? 'border-blue-500/50 bg-blue-500/10' : 'border-green-500/50 bg-green-500/10')
                : 'border-gray-800/50 bg-black/20'
                }`}>
                <h3 className={`text-sm font-cinzel font-bold mb-2 flex items-center gap-2 ${type === 'planned' ? 'text-blue-400' : 'text-green-400'}`}>
                    <Icon size={16} /> {title} ({items.length})
                </h3>
                <div className="flex flex-col gap-2">
                    {items.length === 0 && (
                        <div className="text-center text-xs text-gray-600 py-8 italic border border-dashed border-gray-800 rounded">
                            {t('geneticLab.dragHere')}
                        </div>
                    )}
                    {items.map(exp => (
                        <DisplayProjectCard key={exp.id || exp.familyId} exp={exp} />
                    ))}
                </div>
            </div>
        );
    };

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overContainer = over.id; // 'planned-container' or 'realized-container'

        const newStatus = overContainer === 'realized-container' ? 'S Rank' : 'Planned';

        toggleStatus(activeId, newStatus);
    };

    const loadExperiment = (exp) => {
        let fatherChar = characters.find(c => c.name === exp.parent1);
        let motherChar = characters.find(c => c.name === exp.parent2);

        // Fallback if not found in full list
        if (!fatherChar) fatherChar = { name: exp.parent1, class: 'Unknown', stats: { HP: 0, Str: 0, Mag: 0, Skl: 0, Spd: 0, Lck: 0, Def: 0, Res: 0 } };
        if (!motherChar) motherChar = { name: exp.parent2, class: 'Unknown', stats: { HP: 0, Str: 0, Mag: 0, Skl: 0, Spd: 0, Lck: 0, Def: 0, Res: 0 } };

        setFather(fatherChar);
        setMother(motherChar);

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /**
     * Generates the correct portrait filename based on the character name.
     * e.g., Lon'qu -> Lonqu, Say'ri -> Sayri, Avatar (M) -> Avatar_M.
     */
    const getPortraitPath = (charName) => {
        if (!charName) return '';
        let name = charName;

        // Special case for Avatar and Robin
        if (name.includes('Avatar') || name.includes('Robin')) {
            const isMale = name.includes('(M)') || name.includes('Chrom') || name.includes('Frederick'); // Simple check
            const base = name.includes('Avatar') ? 'Avatar' : 'Robin';
            return isMale ? `${base}_M` : `${base}_F`;
        }

        // Cleanup: Remove ' and spaces
        return name.replace(/'/g, '').replace(/\s+/g, '');
    };

    const handlePortraitError = (e, portraitName, currentExtIndex = 0) => {
        const normalizedName = getPortraitPath(portraitName);
        const nextIndex = currentExtIndex + 1;
        if (nextIndex < PORTRAIT_EXTENSIONS.length) {
            e.target.src = `images/portraits/${normalizedName}.${PORTRAIT_EXTENSIONS[nextIndex]}`;
            e.target.onerror = (err) => handlePortraitError(err, portraitName, nextIndex);
        } else {
            e.target.src = './images/no_portrait.png';
            e.target.onerror = null;
        }
    };

    const StatBar = ({ label, value }) => {
        const isPositive = value > 0;
        const color = isPositive ? 'bg-green-500' : value < 0 ? 'bg-red-500' : 'bg-gray-600';
        const width = Math.min(Math.abs(value) * 10 + 5, 100); // Visual scaling

        return (
            <div className="flex items-center gap-2 text-xs">
                <span className={`font-bold w-8 ${isPositive ? 'text-green-400' : value < 0 ? 'text-red-400' : 'text-gray-500'}`}>{label}</span>
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden relative">
                    <div
                        className={`h-full absolute ${color} ${value < 0 ? 'right-1/2' : 'left-1/2'}`}
                        style={{ width: `${width}%` }}
                    />
                    <div className="absolute left-1/2 w-0.5 h-full bg-white/20"></div>
                </div>
                <span className="w-4 text-right">{value > 0 ? `+${value}` : value}</span>
            </div>
        );
    };

    const SupportManager = () => {
        const [char1, setChar1] = useState('');
        const [char2, setChar2] = useState('');
        const [rank, setRank] = useState('C');
        const [filter, setFilter] = useState('');

        const handleAddSupport = () => {
            if (!char1 || !char2 || char1 === char2) return;
            const key = [char1, char2].sort().join('-');
            setSupportRanks(prev => ({ ...prev, [key]: rank }));
            // Reset
            setChar2('');
        };

        const existingSupports = Object.entries(supportRanks || {}).map(([key, r]) => {
            const [c1, c2] = key.split('-');
            return { c1, c2, rank: r, key };
        }).filter(s =>
            s.c1.toLowerCase().includes(filter.toLowerCase()) ||
            s.c2.toLowerCase().includes(filter.toLowerCase())
        );

        return (
            <div className="mt-8 pt-8 border-t border-gray-800">
                <h3 className="text-lg font-cinzel text-gray-400 mb-6 flex items-center gap-2">
                    <Heart size={18} className="text-pink-500" /> {t('geneticLab.supportManagement')}
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add New Support */}
                    <div className="bg-black/30 border border-gray-800 rounded-xl p-6">
                        <h4 className="text-sm font-bold text-gray-400 mb-4">{t('geneticLab.addNewRelationship')}</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">{t('geneticLab.character1')}</label>
                                <select
                                    value={char1}
                                    onChange={e => setChar1(e.target.value)}
                                    className="w-full bg-black/50 border border-gray-700 rounded px-3 py-2 text-sm"
                                >
                                    <option value="">{t('common.search')}</option>
                                    {characters.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">{t('geneticLab.character2')}</label>
                                <select
                                    value={char2}
                                    onChange={e => setChar2(e.target.value)}
                                    className="w-full bg-black/50 border border-gray-700 rounded px-3 py-2 text-sm"
                                >
                                    <option value="">{t('common.search')}</option>
                                    {characters.filter(c => c.name !== char1).map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">{t('geneticLab.rank')}</label>
                                <div className="flex gap-2">
                                    {['C', 'B', 'A', 'S'].map(r => (
                                        <button
                                            key={r}
                                            onClick={() => setRank(r)}
                                            className={`flex-1 py-1 rounded border ${rank === r ? 'bg-pink-500/20 border-pink-500 text-pink-400' : 'bg-black/40 border-gray-700 text-gray-500 hover:border-gray-500'}`}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={handleAddSupport}
                                disabled={!char1 || !char2}
                                className="w-full py-2 bg-pink-600 hover:bg-pink-500 text-white rounded font-bold transition disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                            >
                                {t('common.save')}
                            </button>
                        </div>
                    </div>

                    {/* Existing Supports List */}
                    <div className="lg:col-span-2 bg-black/30 border border-gray-800 rounded-xl p-6 flex flex-col h-[320px]">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-sm font-bold text-gray-400">{t('geneticLab.existingRelationships')} ({existingSupports.length})</h4>
                            <div className="relative w-48">
                                <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder={t('common.search')}
                                    value={filter}
                                    onChange={e => setFilter(e.target.value)}
                                    className="w-full bg-black/50 border border-gray-700 rounded pl-8 pr-2 py-1 text-xs text-gray-300"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                            {existingSupports.length === 0 ? (
                                <div className="text-center text-gray-600 py-8 italic">{t('geneticLab.noData')}</div>
                            ) : (
                                existingSupports.map((s, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-black/40 border border-gray-800 p-2 rounded hover:border-pink-500/30 transition group">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                <img src={`images/portraits/${getPortraitPath(s.c1)}.png`} className="w-8 h-8 rounded-full border border-gray-700" alt={s.c1} />
                                                <span className="text-sm font-bold text-gray-300">{s.c1}</span>
                                            </div>
                                            <Heart size={12} className="text-pink-900" />
                                            <div className="flex items-center gap-1">
                                                <img src={`images/portraits/${getPortraitPath(s.c2)}.png`} className="w-8 h-8 rounded-full border border-gray-700" alt={s.c2} />
                                                <span className="text-sm font-bold text-gray-300">{s.c2}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`font-cinzel font-bold text-lg ${s.rank === 'S' ? 'text-gold' : 'text-pink-400'}`}>{s.rank}</span>
                                            <button
                                                onClick={() => {
                                                    const newSupports = { ...supportRanks };
                                                    delete newSupports[s.key];
                                                    setSupportRanks(newSupports);
                                                }}
                                                className="p-1 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col p-4 gap-6 font-inter overflow-y-auto custom-scrollbar">
            {/* Header */}


            {/* Experiment Bench */}
            <div className="flex-shrink-0 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-black/40 p-8 rounded-2xl border border-gray-800 relative shadow-2xl">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none rounded-2xl"></div>
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rounded-t-2xl"></div>

                {/* Father Tube */}
                <div className={`relative group ${skillMenuOpen === 'father' || classMenuOpen === 'father' ? 'z-[100]' : 'z-20'}`}>
                    {/* Remove Button */}
                    {father && (
                        <button
                            onClick={(e) => { e.stopPropagation(); setFather(null); if (!mother) setAtomSpinDirection(null); }}
                            className="absolute top-3 right-3 z-10 p-1 text-gray-500 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                            title={t('geneticLab.removeFather')}
                        >
                            <X size={14} />
                        </button>
                    )}
                    <div
                        onClick={() => setSelectingSide('father')}
                        className={`min-h-[250px] border-2 ${father ? 'border-blue-500/50 bg-blue-900/10' : 'border-gray-700 border-dashed bg-black/50'} rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] relative`}
                    >
                        {father ? (
                            <>
                                <img
                                    src={`images/portraits/${getPortraitPath(father.name)}.png`}
                                    alt={father.name}
                                    className="w-24 h-24 rounded-full border-2 border-blue-400 shadow-lg mb-4 object-cover"
                                    onError={(e) => handlePortraitError(e, father.name, 0)}
                                />
                                <h3 className="font-cinzel text-xl text-blue-100">{father.name}</h3>

                                {/* Father Class Selector */}
                                <div className="relative mb-6" data-dropdown>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setClassMenuOpen(classMenuOpen === 'father' ? null : 'father'); }}
                                        className="px-3 py-1 bg-blue-900/50 border border-blue-500/30 rounded-full text-sm text-blue-300 flex items-center gap-1 hover:bg-blue-800 transition-colors"
                                    >
                                        {selectedFatherClass || father.class}
                                        <ChevronDown size={12} />
                                    </button>
                                    {classMenuOpen === 'father' && (
                                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/95 border border-blue-500 rounded-lg p-2 w-48 z-[200] shadow-xl max-h-48 overflow-y-auto">
                                            <div className="text-[10px] text-gray-500 uppercase mb-1 px-1">{t('geneticLab.selectClass') || 'Select Class'}</div>
                                            {getAvailableClasses(father.name).map(cls => (
                                                <button
                                                    key={cls.name}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedFatherClass(cls.name);
                                                        setSelectedFatherSkill(null);
                                                        setClassMenuOpen(null);
                                                    }}
                                                    className={`w-full text-left px-2 py-1 hover:bg-blue-900/50 text-xs rounded ${(selectedFatherClass || father.class) === cls.name ? 'text-blue-300 bg-blue-900/30' : 'text-gray-300'}`}
                                                >
                                                    {cls.name}
                                                </button>
                                            ))}
                                            {getAvailableClasses(father.name).length === 0 && (
                                                <div className="text-xs text-gray-600 p-1">{t('geneticLab.noClassesFound') || 'No classes found'}</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Father Skill Selector */}
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20" data-dropdown>
                                    <div className="relative">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSkillMenuOpen(skillMenuOpen === 'father' ? null : 'father'); }}
                                            className="px-3 py-1 bg-blue-900/80 border border-blue-500/50 rounded-full text-xs text-blue-200 flex items-center gap-1 hover:bg-blue-800 transition-colors shadow-lg"
                                        >
                                            {selectedFatherSkill ? selectedFatherSkill.name : (childPreview?.fatherSkill?.name || t('geneticLab.selectSkill'))}
                                            <ChevronDown size={10} />
                                        </button>

                                        {skillMenuOpen === 'father' && (
                                            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/90 border border-blue-500 rounded-lg p-2 w-48 z-50 shadow-xl max-h-48 overflow-y-auto">
                                                <div className="text-[10px] text-gray-500 uppercase mb-1 px-1">{selectedFatherClass || father.class} {t('geneticLab.skills')}</div>
                                                {getParentSkills(father, selectedFatherClass).map(skill => (
                                                    <button
                                                        key={skill.name}
                                                        onClick={(e) => { e.stopPropagation(); setSelectedFatherSkill(skill); setSkillMenuOpen(null); }}
                                                        className="w-full text-left px-2 py-1 hover:bg-blue-900/50 text-xs text-gray-300 rounded flex justify-between"
                                                    >
                                                        <span>{skill.name}</span>
                                                        <span className="text-[10px] text-gray-600">Lv{skill.lv}</span>
                                                    </button>
                                                ))}
                                                {getParentSkills(father, selectedFatherClass).length === 0 && <div className="text-xs text-gray-600 p-1">{t('geneticLab.noSkillsFound')}</div>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Dna size={48} className="text-gray-600 mb-4 group-hover:animate-spin-slow" />
                                <span className="text-gray-400 font-bold uppercase">{t('geneticLab.selectFather')}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Synthesis Process */}
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-full flex items-center justify-center gap-2">
                        <div className="h-[2px] w-full bg-gradient-to-r from-blue-500/50 to-green-500/50"></div>
                        <button
                            onClick={handleSmartRandomize}
                            className={`p-3 rounded-full border transition-all cursor-pointer ${childPreview ? 'bg-green-500/20 border-green-500' : 'bg-gray-800 border-gray-700 hover:border-purple-500 hover:bg-purple-500/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]'}`}
                            title={t('geneticLab.smartRandomize')}
                        >
                            <Atom
                                size={24}
                                className={`transition-all ${atomSpinDirection === 'cw' ? 'text-purple-400 animate-spin' :
                                    atomSpinDirection === 'ccw' ? 'text-purple-400 animate-spin-reverse' :
                                        childPreview ? 'text-green-400' : 'text-gray-500 hover:text-purple-400'
                                    }`}
                            />
                        </button>
                        <div className="h-[2px] w-full bg-gradient-to-r from-green-500/50 to-pink-500/50"></div>
                    </div>
                </div>

                {/* Reset Button (Floating or Centered) */}
                <div className="absolute top-2 right-2 z-50">
                    <button
                        onClick={() => { setFather(null); setMother(null); setSelectedFatherSkill(null); setSelectedMotherSkill(null); setAtomSpinDirection(null); }}
                        className="p-1 bg-red-900/30 border border-red-500/30 rounded-full text-red-400 hover:bg-red-500 hover:text-white transition-all"
                        title={t('geneticLab.clearBench')}
                    >
                        <RotateCcw size={12} />
                    </button>
                </div>

                {/* Mother Tube */}
                <div className={`relative group ${skillMenuOpen === 'mother' || classMenuOpen === 'mother' ? 'z-[100]' : 'z-20'}`}>
                    {/* Remove Button */}
                    {mother && (
                        <button
                            onClick={(e) => { e.stopPropagation(); setMother(null); if (!father) setAtomSpinDirection(null); }}
                            className="absolute top-3 right-3 z-10 p-1 text-gray-500 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                            title={t('geneticLab.removeMother')}
                        >
                            <X size={14} />
                        </button>
                    )}
                    <div
                        onClick={() => setSelectingSide('mother')}
                        className={`min-h-[250px] border-2 ${mother ? 'border-pink-500/50 bg-pink-900/10' : 'border-gray-700 border-dashed bg-black/50'} rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-pink-400 transition-all hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] relative`}
                    >
                        {mother ? (
                            <>
                                <img
                                    src={`images/portraits/${getPortraitPath(mother.name)}.png`}
                                    alt={mother.name}
                                    className="w-24 h-24 rounded-full border-2 border-pink-400 shadow-lg mb-4 object-cover"
                                    onError={(e) => handlePortraitError(e, mother.name, 0)}
                                />
                                <h3 className="font-cinzel text-xl text-pink-100">{mother.name}</h3>

                                {/* Mother Class Selector */}
                                <div className="relative mb-6" data-dropdown>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setClassMenuOpen(classMenuOpen === 'mother' ? null : 'mother'); }}
                                        className="px-3 py-1 bg-pink-900/50 border border-pink-500/30 rounded-full text-sm text-pink-300 flex items-center gap-1 hover:bg-pink-800 transition-colors"
                                    >
                                        {selectedMotherClass || mother.class}
                                        <ChevronDown size={12} />
                                    </button>
                                    {classMenuOpen === 'mother' && (
                                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/95 border border-pink-500 rounded-lg p-2 w-48 z-[200] shadow-xl max-h-48 overflow-y-auto">
                                            <div className="text-[10px] text-gray-500 uppercase mb-1 px-1">{t('geneticLab.selectClass') || 'Select Class'}</div>
                                            {getAvailableClasses(mother.name).map(cls => (
                                                <button
                                                    key={cls.name}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedMotherClass(cls.name);
                                                        setSelectedMotherSkill(null);
                                                        setClassMenuOpen(null);
                                                    }}
                                                    className={`w-full text-left px-2 py-1 hover:bg-pink-900/50 text-xs rounded ${(selectedMotherClass || mother.class) === cls.name ? 'text-pink-300 bg-pink-900/30' : 'text-gray-300'}`}
                                                >
                                                    {cls.name}
                                                </button>
                                            ))}
                                            {getAvailableClasses(mother.name).length === 0 && (
                                                <div className="text-xs text-gray-600 p-1">{t('geneticLab.noClassesFound') || 'No classes found'}</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Mother Skill Selector */}
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20" data-dropdown>
                                    <div className="relative">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSkillMenuOpen(skillMenuOpen === 'mother' ? null : 'mother'); }}
                                            className="px-3 py-1 bg-pink-900/80 border border-pink-500/50 rounded-full text-xs text-pink-200 flex items-center gap-1 hover:bg-pink-800 transition-colors shadow-lg"
                                        >
                                            {selectedMotherSkill ? selectedMotherSkill.name : (childPreview?.motherSkill?.name || t('geneticLab.selectSkill'))}
                                            <ChevronDown size={10} />
                                        </button>

                                        {skillMenuOpen === 'mother' && (
                                            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/90 border border-pink-500 rounded-lg p-2 w-48 z-50 shadow-xl max-h-48 overflow-y-auto">
                                                <div className="text-[10px] text-gray-500 uppercase mb-1 px-1">{selectedMotherClass || mother.class} {t('geneticLab.skills')}</div>
                                                {getParentSkills(mother, selectedMotherClass).map(skill => (
                                                    <button
                                                        key={skill.name}
                                                        onClick={(e) => { e.stopPropagation(); setSelectedMotherSkill(skill); setSkillMenuOpen(null); }}
                                                        className="w-full text-left px-2 py-1 hover:bg-pink-900/50 text-xs text-gray-300 rounded flex justify-between"
                                                    >
                                                        <span>{skill.name}</span>
                                                        <span className="text-[10px] text-gray-600">Lv{skill.lv}</span>
                                                    </button>
                                                ))}
                                                {getParentSkills(mother, selectedMotherClass).length === 0 && <div className="text-xs text-gray-600 p-1">{t('geneticLab.noSkillsFound')}</div>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Heart size={48} className="text-gray-600 mb-4 group-hover:animate-pulse" />
                                <span className="text-gray-400 font-bold uppercase">{t('geneticLab.selectMother')}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Result Panel Box */}
            <div className="flex-shrink-0 relative z-20">
                {childPreview && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-900/90 border border-gold/30 rounded-xl p-6 shadow-2xl backdrop-blur-md relative mb-8"
                    >
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Child Info */}
                            <div className="flex-1 flex flex-col items-center justify-center text-center border-r border-gray-800 pr-8">
                                <Baby size={48} className="text-gold mb-4" />
                                <h3 className="text-3xl font-cinzel text-gold font-bold mb-1">{childPreview.name}</h3>
                                <p className="text-gray-400 text-sm mb-6">{childPreview.class}</p>
                                <button
                                    onClick={saveExperiment}
                                    className="px-6 py-2 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/50 rounded-lg flex items-center gap-2 transition-all font-bold"
                                >
                                    <Save size={16} /> {t('geneticLab.saveExperiment')}
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="flex-1 space-y-3">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                        <Calculator size={14} /> {showGrowthSim ? t('geneticLab.simulation', { level: simLevel }) : t('geneticLab.modifiers')}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                        {showGrowthSim && (
                                            <select
                                                value={simLevel}
                                                onChange={(e) => setSimLevel(Number(e.target.value))}
                                                className="bg-black/50 border border-gold/30 text-gold text-xs rounded px-1 py-0.5 outline-none"
                                            >
                                                <option value={1}>Lv 1</option>
                                                <option value={10}>Lv 10</option>
                                                <option value={20}>Lv 20</option>
                                            </select>
                                        )}
                                        <button
                                            onClick={() => setShowGrowthSim(!showGrowthSim)}
                                            className={`flex items-center gap-2 px-2 py-1 rounded text-xs transition-colors ${showGrowthSim ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}
                                            title="Toggle Growth Simulation"
                                        >
                                            <Activity size={12} /> {showGrowthSim ? t('geneticLab.simulation', { level: '' }).replace('{{level}}', '').trim() : t('geneticLab.modifiersShort')}
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                    {['str', 'mag', 'skl', 'spd', 'lck', 'def', 'res'].map(stat => (
                                        <StatBar
                                            key={stat}
                                            label={stat.toUpperCase()}
                                            value={showGrowthSim ? (childPreview.simulatedStats?.[stat.toLowerCase()] || 0) : childPreview.stats[stat]}
                                        />
                                    ))}
                                    {/* Optional HP for Sim */}
                                    {showGrowthSim && (
                                        <div className="col-span-2 mt-2">
                                            <StatBar label="HP" value={childPreview.simulatedStats?.hp || 0} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Inheritance */}
                            <div className="flex-1 pl-8 border-l border-gray-800">
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Dna size={14} /> {t('geneticLab.inheritance')}
                                </h4>
                                <div className="space-y-4">
                                    <div className="bg-blue-900/10 p-3 rounded border border-blue-900/30">
                                        <div className="text-xs text-blue-500 mb-1">{t('geneticLab.fromFather')}</div>
                                        <div className="text-sm font-bold text-gray-200">{childPreview.fatherSkill ? childPreview.fatherSkill.name : t('common.empty')}</div>
                                    </div>
                                    <div className="bg-pink-900/10 p-3 rounded border border-pink-900/30">
                                        <div className="text-xs text-pink-500 mb-1">{t('geneticLab.fromMother')}</div>
                                        <div className="text-sm font-bold text-gray-200">{childPreview.motherSkill ? childPreview.motherSkill.name : t('common.empty')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Saved Experiments */}
            {/* Saved Experiments Section with DnD */}
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <div className="mt-4 relative z-0 pb-12 border-t border-gray-800 pt-8">
                    <h3 className="text-lg font-cinzel text-gray-400 mb-6 flex items-center gap-2">
                        <Save size={18} /> {t('geneticLab.savedProjects')}
                    </h3>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Planned Projects */}
                        <DroppableContainer
                            id="planned-container"
                            title={t('geneticLab.plannedProjects')}
                            icon={FlaskRound}
                            type="planned"
                            items={pairings.filter(p => !p.status || p.status === 'Planned' || p.status === 'planned')}
                        />

                        {/* Realized Projects */}
                        <DroppableContainer
                            id="realized-container"
                            title={t('geneticLab.realizedProjects')}
                            icon={CheckCircle2}
                            type="realized"
                            items={pairings.filter(p => p.status === 'S Rank' || p.status === 'realized')}
                        />
                    </div>
                </div>

                <DragOverlay>
                    {/* Placeholder for overlay, normally you'd track active item in state */}
                    <div className="bg-gray-800 p-2 rounded text-white opacity-50 text-xs">{t('geneticLab.moving')}</div>
                </DragOverlay>
            </DndContext>

            {/* Support Manager */}
            <SupportManager />

            {/* Character Selector */}
            {selectingSide && (
                <CharacterSelectionModal
                    onClose={() => setSelectingSide(null)}
                    onSelect={handleSelectCharacter}
                    existingNames={[]} // Show all characters
                    supportRanks={supportRanks}
                    currentPartner={selectingSide === 'father' ? mother : father}
                    filterPredicate={(char) => {
                        // 1. Basic Gender Filter
                        const isMale = ['Chrom', 'Frederick', 'Virion', 'Stahl', 'Vaike', 'Kellam', 'Lon\'qu', 'Ricken', 'Gaius', 'Gregor', 'Libra', 'Henry', 'Donnel', 'Robin (M)', 'Avatar (M)'].includes(char.name);
                        const isFemale = ['Lissa', 'Sully', 'Miriel', 'Sumia', 'Maribelle', 'Panne', 'Cordelia', 'Nowi', 'Tharja', 'Olivia', 'Cherche', 'Robin (F)', 'Avatar (F)'].includes(char.name);

                        if (selectingSide === 'father' && !isMale) return false;
                        if (selectingSide === 'mother' && !isFemale) return false;

                        // 2. Marriage Compatibility Filter
                        if (selectingSide === 'father' && mother) {
                            // Can this male marry the existing mother?
                            const compatibleWives = MARRIAGE_COMPATIBILITY[char.name] || [];
                            // Handle both "Avatar" and "Robin" naming conventions
                            const motherName = mother.name.replace('Avatar', 'Robin');
                            if (!compatibleWives.some(w => motherName.includes(w) || w.includes(motherName))) {
                                // Double check if mother has restricted husbands (like Sumia)
                                const restrictedHusbands = MARRIAGE_COMPATIBILITY[motherName];
                                if (restrictedHusbands && !restrictedHusbands.includes(char.name)) return false;

                                // For general compatibility, if not in either list, check if it's a standard first-gen pair
                                if (!restrictedHusbands) return false;
                            }
                        }

                        if (selectingSide === 'mother' && father) {
                            // Can this female marry the existing father?
                            const fatherName = father.name.replace('Avatar', 'Robin');
                            const compatibleWives = MARRIAGE_COMPATIBILITY[fatherName] || [];
                            const charName = char.name.replace('Avatar', 'Robin');

                            if (compatibleWives.length > 0) {
                                if (!compatibleWives.some(w => charName.includes(w) || w.includes(charName))) return false;
                            } else {
                                // If father not in map, check if mother has restrictions
                                const restrictedHusbands = MARRIAGE_COMPATIBILITY[charName];
                                if (restrictedHusbands && !restrictedHusbands.includes(fatherName)) return false;
                            }
                        }

                        return true;
                    }}
                />
            )}
        </div>
    );
};

export default GeneticLab;
