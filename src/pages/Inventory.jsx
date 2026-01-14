import React, { useState, useMemo, useEffect } from 'react';
import { Search, Sword, Wand2, Package, Coins, Backpack, ShoppingBag, Trash2, Plus, Sparkles, GripVertical } from 'lucide-react';
import { ITEM_DATA } from '../data/itemData';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmModal from '../components/ConfirmModal';
import { useTranslation } from 'react-i18next';

const ShopItem = ({ item, onAddToInventory }) => {
    const { t } = useTranslation();
    const handleDragStart = (e) => {
        e.dataTransfer.setData('application/json', JSON.stringify(item));
        e.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className="w-full h-9 flex items-center gap-3 bg-black/40 border border-gray-800/80 rounded px-2.5 group hover:border-gold/50 hover:bg-white/5 transition-all cursor-grab active:cursor-grabbing relative select-none"
        >
            {/* Drag Handle */}
            <div className="mr-1 text-gray-600 group-hover:text-gray-400 cursor-grab active:cursor-grabbing">
                <GripVertical size={14} />
            </div>

            {/* Proficiency / Icon */}
            <div className="w-6 flex justify-center shrink-0">
                {item.rank ? (
                    <span className={`
                        text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded bg-black/40 border border-white/10
                        ${item.rank === 'A' || item.rank === 'S' ? 'text-gold border-gold/30 shadow-[0_0_5px_rgba(255,215,0,0.2)]' :
                            item.rank === 'B' || item.rank === 'C' ? 'text-blue-300 border-blue-500/30' :
                                'text-gray-400 border-gray-700'}
                    `}>
                        {item.rank}
                    </span>
                ) : (
                    <span className="text-gray-600 text-[10px]">-</span>
                )}
            </div>

            {/* Name */}
            <h3 className="text-gray-200 font-cinzel font-semibold text-xs flex-1 truncate group-hover:text-gold transition-colors">
                {item.name}
            </h3>

            {/* Type */}
            <span className="text-[9px] text-gray-500 uppercase tracking-wider w-16 shrink-0 text-right">
                {item.type}
            </span>

            {/* Price */}
            <div className="flex items-center gap-1 text-gold/80 text-[10px] w-14 justify-end font-mono">
                <Coins size={10} className="text-gold" />
                {item.worth}
            </div>

            {/* Add Button */}
            <button
                onClick={() => onAddToInventory(item)}
                className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 p-1 hover:bg-gold/20 rounded text-gold"
                title={t('common.add')}
            >
                <Plus size={12} />
            </button>
        </div>
    );
};

const InventoryItem = ({ item, onDelete, isSelected, onToggleSelect }) => {
    const { t } = useTranslation();
    return (
        <motion.div
            layout
            initial={{ scale: 0.8, opacity: 0, x: -10 }}
            animate={{
                scale: 1,
                opacity: 1,
                x: 0,
                transition: { type: "spring", stiffness: 500, damping: 15, mass: 0.5 }
            }}
            exit={{ scale: 0, opacity: 0, x: -10, transition: { duration: 0.15 } }}
            className={`
                bg-black/60 border rounded-lg p-2.5 flex justify-between items-center group transition-all relative overflow-hidden select-none
                ${isSelected ? 'border-gold/60 bg-gold/10 shadow-[inset_0_0_20px_rgba(255,215,0,0.1)]' : 'border-gray-700/50 hover:border-gray-500'}
            `}
            onClick={() => onToggleSelect(item.instanceId)}
        >
            {/* Drag Handle */}
            <div className="mr-2 text-gray-600 group-hover:text-gray-400 cursor-grab active:cursor-grabbing shrink-0 z-20" onClick={(e) => e.stopPropagation()}>
                <GripVertical size={14} />
            </div>

            {/* Checkbox */}
            <div className="mr-3 relative flex items-center justify-center shrink-0">
                <div className={`
                    w-4 h-4 rounded border transition-all flex items-center justify-center
                    ${isSelected ? 'bg-gold border-gold text-black' : 'border-gray-600 group-hover:border-gray-400 bg-black/40'}
                `}>
                    {isSelected && <div className="w-2 h-2 bg-black rounded-[1px]" />}
                </div>
            </div>

            {/* Sparkle burst effect on mount */}
            <motion.div
                initial={{ opacity: 1, scale: 0.8 }}
                animate={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 bg-gradient-radial from-gold/30 via-transparent to-transparent pointer-events-none"
            />

            <div className="flex flex-col overflow-hidden relative z-10 flex-1 min-w-0 mr-2">
                <span className={`text-sm font-cinzel font-bold truncate transition-colors ${isSelected ? 'text-gold' : 'text-gray-200'}`}>
                    {item.name}
                </span>
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <span>{t('inventory.rank')}: {item.rank || '-'}</span>
                    <span>{t('inventory.type')}: {item.type || t('inventory.item')}</span>
                </div>
            </div>

            <button
                onClick={(e) => { e.stopPropagation(); onDelete(item.instanceId); }}
                className="text-gray-600 hover:text-red-500 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity relative z-10"
                title={t('common.delete')}
            >
                <Trash2 size={14} />
            </button>
        </motion.div>
    );
};

const Inventory = ({ inventory, setInventory }) => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [userSearchQuery, setUserSearchQuery] = useState(''); // User inventory search
    const [activeCategory, setActiveCategory] = useState('all');
    const [userCategory, setUserCategory] = useState('all'); // User inventory tab state
    const [isDragOver, setIsDragOver] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [selectedItems, setSelectedItems] = useState(new Set());

    // Use prop or fallback
    const effectiveInventory = inventory || [];
    const setEffectiveInventory = setInventory || (() => console.warn("setInventory not provided"));

    // Filter User Inventory based on Tab AND Search
    const filteredUserInventory = useMemo(() => {
        let items = effectiveInventory;

        // Category Filter
        if (userCategory !== 'all') {
            items = items.filter(item => {
                const type = item.type || 'Item';
                if (userCategory === 'weapons') {
                    return ['Sword', 'Lance', 'Axe', 'Bow', 'Tome', 'Dark Tome', 'Dagger', 'Dragonstone', 'Beaststone'].some(t => type.includes(t));
                }
                if (userCategory === 'staves') return type.includes('Staff');
                if (userCategory === 'items') return !['Sword', 'Lance', 'Axe', 'Bow', 'Tome', 'Dark Tome', 'Dagger', 'Dragonstone', 'Beaststone', 'Staff'].some(t => type.includes(t));
                return true;
            });
        }

        // Search Filter
        if (userSearchQuery) {
            items = items.filter(item => item.name.toLowerCase().includes(userSearchQuery.toLowerCase()));
        }

        return items;
    }, [effectiveInventory, userCategory, userSearchQuery]);

    // Selection Handlers
    const toggleSelection = (instanceId) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(instanceId)) {
                newSet.delete(instanceId);
            } else {
                newSet.add(instanceId);
            }
            return newSet;
        });
    };

    const toggleSelectAll = () => {
        if (selectedItems.size === filteredUserInventory.length && filteredUserInventory.length > 0) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(filteredUserInventory.map(i => i.instanceId)));
        }
    };

    const deleteSelected = () => {
        if (selectedItems.size === 0) return;
        setEffectiveInventory(prev => prev.filter(i => !selectedItems.has(i.instanceId)));
        setSelectedItems(new Set());
    };

    const allShopItems = useMemo(() => {
        let items = [];
        if (activeCategory === 'all' || activeCategory === 'weapons') items = items.concat(ITEM_DATA.weapons);
        if (activeCategory === 'all' || activeCategory === 'staves') items = items.concat(ITEM_DATA.staves);
        if (activeCategory === 'all' || activeCategory === 'items') items = items.concat(ITEM_DATA.items);
        return items;
    }, [activeCategory]);

    const filteredShopItems = useMemo(() => {
        return allShopItems.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [allShopItems, searchQuery]);

    const addToInventory = (item) => {
        const instance = {
            ...item,
            instanceId: Date.now() + Math.random().toString(36).substr(2, 9),
            addedAt: new Date().toISOString()
        };
        setEffectiveInventory(prev => [instance, ...prev]);
    };

    const removeFromInventory = (instanceId) => {
        setItemToDelete(instanceId);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            setEffectiveInventory(prev => prev.filter(i => i.instanceId !== itemToDelete));
            setItemToDelete(null);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        try {
            const itemData = JSON.parse(e.dataTransfer.getData('application/json'));
            if (itemData && itemData.id) {
                addToInventory(itemData);
            }
        } catch (err) {
            console.error('Drop error:', err);
        }
    };

    return (
        <div className="h-full flex gap-6 overflow-hidden pb-2">
            {/* Left Column: User Inventory */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    w-1/3 flex flex-col rounded-xl border transition-all duration-300 relative
                    ${isDragOver
                        ? 'bg-blue-900/30 border-blue-500/70 shadow-[inset_0_0_40px_rgba(59,130,246,0.3)]'
                        : 'bg-black/40 border-gray-800 backdrop-blur-md'
                    }
                `}
            >
                <div className="p-4 border-b border-gray-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <div
                            onClick={toggleSelectAll}
                            className={`
                                w-4 h-4 rounded border transition-all cursor-pointer flex items-center justify-center
                                ${selectedItems.size > 0 && selectedItems.size === filteredUserInventory.length && filteredUserInventory.length > 0
                                    ? 'bg-gold border-gold text-black'
                                    : 'border-gray-600 hover:border-gold bg-black/40 text-gold'}
                            `}
                            title={t('inventory.selectAll')}
                        >
                            {selectedItems.size > 0 && selectedItems.size === filteredUserInventory.length && filteredUserInventory.length > 0 && <div className="w-2 h-2 bg-black rounded-[1px]" />}
                            {selectedItems.size > 0 && selectedItems.size < filteredUserInventory.length && <div className="w-2 h-0.5 bg-gold" />}
                        </div>
                        <div className="flex items-center gap-2 text-gold">
                            <Backpack size={18} />
                            <h2 className="font-cinzel font-bold text-lg">{t('inventory.myInventory')}</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Category Tabs */}
                        <div className="flex items-center gap-1 bg-black/60 rounded p-1 border border-gray-800/50">
                            {['all', 'weapons', 'staves', 'items'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setUserCategory(cat)}
                                    className={`
                                    w-6 h-6 rounded flex items-center justify-center transition-all relative
                                    ${userCategory === cat
                                            ? 'bg-gold/20 text-gold shadow-[0_0_10px_rgba(255,215,0,0.2)]'
                                            : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                        }
                                `}
                                    title={cat}
                                >
                                    {cat === 'all' && <span className="font-cinzel font-bold text-[9px]">{t('inventory.all')}</span>}
                                    {cat === 'weapons' && <Sword size={12} />}
                                    {cat === 'staves' && <Wand2 size={12} />}
                                    {cat === 'items' && <Package size={12} />}
                                </button>
                            ))}
                        </div>

                        {selectedItems.size > 0 && (
                            <button
                                onClick={deleteSelected}
                                className="bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 animate-in fade-in zoom-in duration-200"
                            >
                                <Trash2 size={10} /> {t('inventory.deleteSelected', { count: selectedItems.size })}
                            </button>
                        )}
                    </div>
                </div>


                <div className="flex-1 overflow-y-auto p-3 space-y-2 scroll-custom">
                    {filteredUserInventory.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-60">
                            <Backpack size={48} className="mb-3" />
                            <div className="text-center text-sm px-8">
                                <p>{t('inventory.emptyInventory')}</p>
                                <p className="mt-1 text-xs opacity-70">{t('inventory.dragHint')}</p>
                            </div>
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {filteredUserInventory.map((item) => (
                                <InventoryItem
                                    key={item.instanceId}
                                    item={item}
                                    onDelete={removeFromInventory}
                                    isSelected={selectedItems.has(item.instanceId)}
                                    onToggleSelect={toggleSelection}
                                />
                            ))}
                        </AnimatePresence>
                    )}
                    {isDragOver && (
                        <div className="border-2 border-dashed border-blue-400/70 bg-blue-400/20 rounded-lg h-20 flex items-center justify-center animate-pulse">
                            <span className="text-blue-300 font-bold text-sm">{t('inventory.dropHere')}</span>
                        </div>
                    )}
                </div>

                {/* User Inventory Search (Bottom) */}
                <div className="p-3 bg-black/30 border-t border-gray-800 shrink-0">
                    <div className="relative group w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input
                            type="text"
                            placeholder={t('inventory.searchItems')}
                            value={userSearchQuery}
                            onChange={(e) => setUserSearchQuery(e.target.value)}
                            className="w-full bg-black/50 border border-gray-700 rounded-full pl-9 pr-4 py-1.5 text-sm text-white focus:border-gold outline-none transition-all placeholder-gray-600"
                        />
                    </div>
                </div>
            </div>

            {/* Right Column: Shop */}
            <div className="flex-1 flex flex-col bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                {/* Header: Title & Search */}
                <div className="p-4 bg-black/40 border-b border-gray-800 flex justify-between items-center shrink-0 gap-4">
                    <div className="flex items-center gap-2 text-gold">
                        <ShoppingBag size={18} />
                        <h2 className="font-cinzel font-bold text-lg">{t('inventory.shop')}</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Shop Category Tabs */}
                        <div className="flex items-center gap-1 bg-black/60 rounded p-1 border border-gray-800/50">
                            {['all', 'weapons', 'staves', 'items'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`
                                    w-6 h-6 rounded flex items-center justify-center transition-all relative
                                    ${activeCategory === cat
                                            ? 'bg-gold/20 text-gold shadow-[0_0_10px_rgba(255,215,0,0.2)]'
                                            : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                        }
                                `}
                                    title={cat}
                                >
                                    {cat === 'all' && <span className="font-cinzel font-bold text-[9px]">{t('inventory.all')}</span>}
                                    {cat === 'weapons' && <Sword size={12} />}
                                    {cat === 'staves' && <Wand2 size={12} />}
                                    {cat === 'items' && <Package size={12} />}
                                </button>
                            ))}
                        </div>

                        <div className="relative group w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input
                                type="text"
                                placeholder={t('inventory.searchItems')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-black/50 border border-gray-700 rounded-full pl-9 pr-4 py-1.5 text-sm text-white focus:border-gold outline-none transition-all placeholder-gray-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Content Area with Vertical Tabs */}
                <div className="flex flex-1 overflow-hidden relative">
                    {/* Vertical Bookmark Tabs */}


                    {/* Shop Grid */}
                    <div className="flex-1 overflow-y-auto p-4 scroll-custom bg-black/10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3">
                            {filteredShopItems.map((item) => (
                                <ShopItem key={item.id} item={item} onAddToInventory={addToInventory} />
                            ))}
                        </div>
                        {filteredShopItems.length === 0 && (
                            <div className="h-64 flex flex-col items-center justify-center opacity-40">
                                <Package size={48} className="text-gray-600 mb-4" />
                                <p className="text-xl font-cinzel text-gray-500">{t('inventory.noResults')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={!!itemToDelete}
                message={t('inventory.deleteConfirm')}
                onConfirm={confirmDelete}
                onCancel={() => setItemToDelete(null)}
            />
        </div >
    );
};

export default Inventory;
