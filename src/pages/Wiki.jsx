/**
 * @fileoverview Wiki - Fire Emblem Awakening Comprehensive Game Encyclopedia
 * Data sources: fireemblem.fandom.com, serenesforest.net
 */

import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Sword, Shield, Zap, Star, Users, ChevronRight, ChevronDown, ChevronsUpDown, ChevronsDownUp, Network, ArrowRightCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { CLASSES, SKILLS, WEAPONS, CHARACTERS, MECHANICS, PROMOTION_PATHS } from '../data/wikiData';
import { CHARACTER_BASE_DATA } from '../data/characterBaseData';

// ============== COMPONENT ==============
const Wiki = () => {
    const { t } = useTranslation();
    const [tab, setTab] = useState('classes');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState('all');
    const [expandedCategories, setExpandedCategories] = useState({});

    // Create class tree structure (for List view)
    const classTree = useMemo(() => {
        const tree = { base: [], special: [], dlc: [] };
        const baseClasses = CLASSES.filter(c => c.type === 'base');
        baseClasses.forEach(base => {
            const promoted = CLASSES.filter(c => c.type === 'promoted' && base.promotes?.includes(c.name));
            tree.base.push({ base, promoted });
        });
        tree.special = CLASSES.filter(c => c.type === 'special');
        tree.dlc = CLASSES.filter(c => c.type === 'dlc');
        return tree;
    }, []);

    // Promotion Graph (for Tree view)
    const promotionalGraph = useMemo(() => {
        const graph = {};
        PROMOTION_PATHS.forEach(path => {
            if (!graph[path.from]) graph[path.from] = [];
            graph[path.from].push(path.to);
        });
        return graph;
    }, []);

    const toggleCategory = (category) => {
        setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
    };

    const expandAll = () => {
        const allExpanded = {};
        classTree.base.forEach(({ base }) => { allExpanded[base.name] = true; });
        setExpandedCategories(allExpanded);
    };

    const collapseAll = () => {
        setExpandedCategories({});
    };

    const selectClassByName = (name) => {
        const cls = CLASSES.find(c => c.name === name);
        if (cls) setSelected(cls);
    };

    const tabs = [
        { id: 'classes', icon: Shield, label: t('wiki.tabs.classes') },
        { id: 'tree', icon: Network, label: t('wiki.tabs.tree') },
        { id: 'skills', icon: Zap, label: t('wiki.tabs.skills') },
        { id: 'weapons', icon: Sword, label: t('wiki.tabs.weapons') },
        { id: 'characters', icon: Users, label: t('wiki.tabs.characters') },
        { id: 'mechanics', icon: BookOpen, label: t('wiki.tabs.mechanics') }
    ];

    const items = useMemo(() => {
        let data;
        if (tab === 'classes') data = CLASSES;
        else if (tab === 'skills') data = SKILLS;
        else if (tab === 'weapons') data = WEAPONS;
        else if (tab === 'characters') data = CHARACTERS;
        else if (tab === 'mechanics') data = MECHANICS;
        else data = [];

        if (filter !== 'all') {
            if (tab === 'classes') data = data.filter(x => x.type === filter);
            else if (tab === 'skills') data = data.filter(x => x.tier === filter);
            else if (tab === 'weapons') data = data.filter(x => x.type === filter);
        }

        if (search) {
            const q = search.toLowerCase();
            data = data.filter(x => x.name.toLowerCase().includes(q) || x.desc?.toLowerCase().includes(q));
        }
        return data;
    }, [tab, search, filter]);

    const filters = {
        classes: [
            { v: 'all', l: t('wiki.filters.all') },
            { v: 'base', l: t('wiki.filters.base') },
            { v: 'promoted', l: t('wiki.filters.promoted') },
            { v: 'special', l: t('wiki.filters.special') },
            { v: 'dlc', l: t('wiki.filters.dlc') }
        ],
        skills: [
            { v: 'all', l: t('wiki.filters.all') },
            { v: 'S', l: '⭐S' },
            { v: 'A', l: 'A' },
            { v: 'B', l: 'B' },
            { v: 'C', l: 'C' }
        ],
        weapons: [
            { v: 'all', l: t('wiki.filters.all') },
            { v: 'Sword', l: '🗡️' },
            { v: 'Lance', l: '🔱' },
            { v: 'Axe', l: '🪓' },
            { v: 'Bow', l: '🏹' },
            { v: 'Tome', l: '📖' }
        ],
        characters: [],
        mechanics: []
    };

    const renderClassTreeGraph = () => {
        const baseClasses = Object.keys(promotionalGraph);

        return (
            <div className="p-6 space-y-8">
                <h2 className="text-2xl font-cinzel font-bold text-gold mb-4 border-b border-gold/30 pb-2">{t('wiki.promotionTreeTitle')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {baseClasses.map(base => (
                        <div key={base} className="bg-black/40 border border-gray-700/50 rounded-lg p-4 relative group hover:border-gold/30 transition-all h-full">
                            <div className="flex items-center justify-between h-full">
                                {/* Base Class Node */}
                                <button
                                    onClick={() => { setTab('classes'); selectClassByName(base); }}
                                    className="px-4 py-2 bg-blue-900/30 border border-blue-500/50 rounded text-blue-300 font-bold text-sm hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300"
                                >
                                    {base}
                                </button>

                                {/* Connector */}
                                <div className="flex-1 px-4 flex items-center justify-center text-gray-600">
                                    <ArrowRightCircle size={16} />
                                </div>

                                {/* Promoted Classes Stack */}
                                <div className="flex flex-col gap-2">
                                    {promotionalGraph[base].map(promoted => (
                                        <button
                                            key={promoted}
                                            onClick={() => { setTab('classes'); selectClassByName(promoted); }}
                                            className="px-4 py-2 bg-gold/10 border border-gold/40 rounded text-gold font-bold text-sm hover:bg-gold/20 hover:scale-105 transition-transform text-right"
                                        >
                                            {promoted}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderDetail = () => {
        if (tab === 'tree') return renderClassTreeGraph();

        if (!selected) return <div className="h-full flex items-center justify-center text-gray-600"><BookOpen size={48} className="opacity-30" /></div>;

        if (tab === 'classes') {
            return (
                <div className="p-6 space-y-4">
                    <div className="flex gap-2 flex-wrap">
                        <span className={`px-2 py-1 rounded text-xs uppercase ${selected.type === 'base' ? 'bg-blue-500/20 text-blue-400' : selected.type === 'promoted' ? 'bg-gold/20 text-gold' : selected.type === 'special' ? 'bg-purple-500/20 text-purple-400' : 'bg-cyan-500/20 text-cyan-400'}`}>{t(`wiki.filters.${selected.type}`)}</span>
                        <span className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400">{selected.category}</span>
                        {selected.legendary && <Star size={14} className="text-yellow-400" />}
                    </div>
                    <h2 className="text-2xl font-cinzel font-bold text-gold">{selected.name}</h2>
                    <p className="text-gray-400">{selected.desc}</p>
                    {selected.note && <p className="text-yellow-400/80 text-sm">💡 {selected.note}</p>}
                    {selected.promotes && (
                        <div>
                            <h4 className="text-xs text-gray-500 uppercase mb-2">{t('wiki.promotionOptions')}</h4>
                            <div className="flex gap-2 flex-wrap">
                                {selected.promotes.map(p => (
                                    <button key={p} onClick={() => selectClassByName(p)}
                                        className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400 hover:bg-blue-500/30 transition-all flex items-center gap-1 text-sm">
                                        <ChevronRight size={12} />{p}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <div><h4 className="text-xs text-gray-500 uppercase mb-2">{t('wiki.weaponsTitle')}</h4><div className="flex gap-2 flex-wrap">{selected.weapons.map(w => <span key={w} className="px-2 py-1 bg-gray-800 rounded text-sm">{w}</span>)}</div></div>
                    <div><h4 className="text-xs text-gray-500 uppercase mb-2">{t('wiki.skillsTitle')}</h4>{selected.skills.map(s => <div key={s.name} className="flex gap-2 p-2 bg-black/30 rounded mb-1"><span className="text-gold">Lv{s.lv}</span><span className="text-green-400">{s.name}</span></div>)}</div>
                </div>
            );
        }
        if (tab === 'skills') {
            return (
                <div className="p-6 space-y-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${selected.tier === 'S' ? 'bg-gold/20 text-gold' : selected.tier === 'A' ? 'bg-purple-500/20 text-purple-300' : selected.tier === 'B' ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-700 text-gray-400'}`}>{selected.tier} {t('wiki.tier')}</span>
                    <h2 className="text-2xl font-cinzel font-bold text-gold">{selected.name}</h2>
                    <p className="text-gray-400 text-lg">{selected.desc}</p>
                    <p className="text-gray-500 text-sm">📚 {selected.class} • Lv{selected.lv}</p>
                </div>
            );
        }
        if (tab === 'weapons') {
            return (
                <div className="p-6 space-y-4">
                    <span className="px-2 py-1 bg-gray-800 rounded text-xs">{selected.type}</span>
                    <h2 className="text-2xl font-cinzel font-bold text-gold">{selected.name}</h2>
                    <p className="text-gray-400">{selected.desc}</p>
                    <div className="grid grid-cols-4 gap-3 mt-4">
                        <div className="text-center p-3 bg-black/40 rounded"><div className="text-xs text-gray-500">MT</div><div className="text-xl text-red-400">{selected.mt}</div></div>
                        <div className="text-center p-3 bg-black/40 rounded"><div className="text-xs text-gray-500">HIT</div><div className="text-xl text-blue-400">{selected.hit}</div></div>
                        <div className="text-center p-3 bg-black/40 rounded"><div className="text-xs text-gray-500">CRIT</div><div className="text-xl text-yellow-400">{selected.crit}</div></div>
                        <div className="text-center p-3 bg-black/40 rounded"><div className="text-xs text-gray-500">RNG</div><div className="text-xl text-green-400">{selected.rng}</div></div>
                    </div>
                </div>
            );
        }
        if (tab === 'characters') {
            const baseData = CHARACTER_BASE_DATA[selected.name];
            return (
                <div className="p-6 space-y-4">
                    <span className="px-2 py-1 bg-gray-800 rounded text-xs">{selected.join}</span>
                    <h2 className="text-2xl font-cinzel font-bold text-gold">{selected.name}</h2>
                    <p className="text-gray-400">{selected.desc}</p>

                    {/* Starting Class & Level */}
                    <div className="flex gap-4">
                        <p className="text-blue-400 text-sm">🛡️ {t('wiki.startingClass')}: {baseData?.class || selected.class}</p>
                        {baseData?.level && <p className="text-green-400 text-sm">📊 Lv {baseData.level}</p>}
                    </div>

                    {/* Base Stats */}
                    {baseData?.stats && (
                        <div>
                            <h4 className="text-xs text-gray-500 uppercase mb-2">{t('wiki.baseStats') || 'Base Stats'}</h4>
                            <div className="grid grid-cols-4 gap-2">
                                {Object.entries(baseData.stats).map(([stat, value]) => (
                                    <div key={stat} className="text-center p-2 bg-black/40 rounded border border-gray-800">
                                        <div className="text-[10px] text-gray-500 uppercase">{stat}</div>
                                        <div className="text-lg text-white font-bold">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Weapon Ranks */}
                    {baseData?.weaponRanks && (
                        <div>
                            <h4 className="text-xs text-gray-500 uppercase mb-2">{t('wiki.weaponRanks') || 'Weapon Ranks'}</h4>
                            <div className="flex gap-2 flex-wrap">
                                {baseData.weaponRanks.map((wpn, idx) => (
                                    <span key={idx} className="px-3 py-1.5 bg-gray-800 rounded text-sm flex items-center gap-2">
                                        <span className="text-gray-300">{wpn.type}</span>
                                        <span className="text-gold font-bold">{wpn.rank}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Starting Skills */}
                    {baseData?.skills && baseData.skills.length > 0 && (
                        <div>
                            <h4 className="text-xs text-gray-500 uppercase mb-2">{t('wiki.startingSkills') || 'Starting Skills'}</h4>
                            <div className="flex gap-2 flex-wrap">
                                {baseData.skills.map((skill, idx) => (
                                    <span key={idx} className="px-3 py-1.5 bg-green-900/30 border border-green-500/30 rounded text-sm text-green-400">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Starting Inventory */}
                    {baseData?.inventory && baseData.inventory.length > 0 && (
                        <div>
                            <h4 className="text-xs text-gray-500 uppercase mb-2">{t('wiki.startingInventory') || 'Starting Inventory'}</h4>
                            <div className="flex gap-2 flex-wrap">
                                {baseData.inventory.map((item, idx) => (
                                    <span key={idx} className="px-3 py-1.5 bg-purple-900/30 border border-purple-500/30 rounded text-sm text-purple-400">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );
        }
        if (tab === 'mechanics' && selected.tips) {
            return (
                <div className="p-6 space-y-4">
                    <h2 className="text-2xl font-cinzel font-bold text-gold">{selected.name}</h2>
                    <p className="text-gray-400 text-lg">{selected.desc}</p>
                    <ul className="space-y-2">{selected.tips.map((t, i) => <li key={i} className="text-gray-300 flex gap-2"><span className="text-gold">•</span><span>{t}</span></li>)}</ul>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex gap-2 mb-3 flex-wrap">
                {tabs.map(t_obj => (
                    <button key={t_obj.id} onClick={() => { setTab(t_obj.id); setFilter('all'); setSearch(''); setSelected(null); }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${tab === t_obj.id ? 'bg-gold/20 text-gold border border-gold/30' : 'bg-black/40 text-gray-400 border border-gray-800 hover:border-gray-600'}`}>
                        <t_obj.icon size={14} /><span>{t_obj.label}</span>
                    </button>
                ))}
            </div>
            <div className="flex-1 flex gap-4 min-h-0">
                {/* Left Panel: List (Hidden or different in Tree mode) */}
                {tab !== 'tree' && (
                    <div className="w-64 flex-shrink-0 flex flex-col bg-black/20 rounded-lg border border-gray-800">
                        <div className="p-2 border-b border-gray-800 space-y-2">
                            <div className="relative">
                                <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={t('common.search')}
                                    className="w-full bg-black/40 border border-gray-700 rounded pl-7 pr-2 py-1 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold/50" />
                            </div>
                            {filters[tab]?.length > 0 && (
                                <div className="flex flex-wrap gap-1 items-center">
                                    {filters[tab].map(f => (
                                        <button key={f.v} onClick={() => setFilter(f.v)}
                                            className={`px-2 py-0.5 rounded text-xs transition-colors ${filter === f.v ? 'bg-gold/20 text-gold' : 'bg-gray-800 text-gray-500 hover:text-gray-300'}`}>
                                            {f.l}
                                        </button>
                                    ))}
                                    {tab === 'classes' && filter === 'all' && !search && (
                                        <>
                                            <span className="w-px h-4 bg-gray-700 mx-1" />
                                            <button onClick={expandAll} title={t('wiki.expandAll')}
                                                className="p-1 rounded text-gray-500 hover:text-green-400 hover:bg-gray-800 transition-all">
                                                <ChevronsUpDown size={14} />
                                            </button>
                                            <button onClick={collapseAll} title={t('wiki.collapseAll')}
                                                className="p-1 rounded text-gray-500 hover:text-orange-400 hover:bg-gray-800 transition-all">
                                                <ChevronsDownUp size={14} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 overflow-y-auto scroll-custom p-1">
                            {tab === 'classes' && filter === 'all' && !search ? (
                                /* Tree View (Sidebar) */
                                <div className="space-y-1">
                                    {/* Base Classes */}
                                    <div className="mb-2">
                                        <div className="text-[10px] uppercase text-gray-600 px-2 py-1 font-bold">{t('wiki.baseToPromoted')}</div>
                                        {classTree.base.map(({ base, promoted }) => (
                                            <div key={base.name}>
                                                <button onClick={() => { toggleCategory(base.name); setSelected(base); }}
                                                    className={`w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-1 ${selected?.name === base.name ? 'bg-gold/20 text-gold' : 'text-gray-300 hover:bg-gray-800'}`}>
                                                    {promoted.length > 0 ? (expandedCategories[base.name] ? <ChevronDown size={12} /> : <ChevronRight size={12} />) : <span className="w-3" />}
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                    {base.highlight && <Star size={10} className="text-yellow-400" />}
                                                    <span>{base.name}</span>
                                                </button>
                                                {expandedCategories[base.name] && promoted.map(p => (
                                                    <button key={p.name} onClick={() => setSelected(p)}
                                                        className={`w-full text-left pl-7 pr-2 py-1 rounded text-sm flex items-center gap-2 ${selected?.name === p.name ? 'bg-gold/20 text-gold' : 'text-gray-500 hover:bg-gray-800 hover:text-white'}`}>
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                                                        {p.highlight && <Star size={10} className="text-yellow-400" />}
                                                        <span>{p.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    {/* Special Classes */}
                                    {classTree.special.length > 0 && (
                                        <div className="mb-2">
                                            <div className="text-[10px] uppercase text-purple-500 px-2 py-1 font-bold">{t('wiki.specialClasses')}</div>
                                            {classTree.special.map(c => (
                                                <button key={c.name} onClick={() => setSelected(c)}
                                                    className={`w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 ${selected?.name === c.name ? 'bg-gold/20 text-gold' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                                    {c.highlight && <Star size={10} className="text-yellow-400" />}
                                                    <span>{c.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {/* DLC Classes */}
                                    {classTree.dlc.length > 0 && (
                                        <div>
                                            <div className="text-[10px] uppercase text-cyan-500 px-2 py-1 font-bold">{t('wiki.dlcClasses')}</div>
                                            {classTree.dlc.map(c => (
                                                <button key={c.name} onClick={() => setSelected(c)}
                                                    className={`w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 ${selected?.name === c.name ? 'bg-gold/20 text-gold' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                                    <span>{c.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                items.length === 0 ? (
                                    <div className="text-center text-gray-600 py-8 text-sm">{t('wiki.noResults')}</div>
                                ) : (
                                    items.map(item => (
                                        <button key={item.name} onClick={() => setSelected(item)}
                                            className={`w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 ${selected?.name === item.name ? 'bg-gold/20 text-gold' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                                            {tab === 'classes' && <span className={`w-1.5 h-1.5 rounded-full ${item.type === 'base' ? 'bg-blue-500' : item.type === 'promoted' ? 'bg-gold' : item.type === 'special' ? 'bg-purple-500' : 'bg-cyan-500'}`} />}
                                            {tab === 'skills' && <span className={`text-[10px] font-bold w-4 ${item.tier === 'S' ? 'text-gold' : item.tier === 'A' ? 'text-purple-400' : item.tier === 'B' ? 'text-blue-400' : 'text-gray-500'}`}>{item.tier}</span>}
                                            {item.highlight && <Star size={10} className="text-yellow-400 flex-shrink-0" />}
                                            <span className="truncate">{item.name}</span>
                                        </button>
                                    ))
                                )
                            )}
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 bg-black/20 rounded-lg border border-gray-800 overflow-y-auto scroll-custom">
                    {renderDetail()}
                </div>
            </div>
        </div>
    );
};

export default Wiki;
