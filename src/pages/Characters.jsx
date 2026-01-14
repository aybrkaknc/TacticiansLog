import React, { useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import ConfirmModal from '../components/ConfirmModal';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Loader2, SearchX } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Characters = ({ characters, setCharacters, searchQuery, isLoading }) => {
    const [charToDelete, setCharToDelete] = useState(null);
    const { t } = useTranslation();

    /** Characters filtered by search query */
    const filteredCharacters = characters.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    /** Drag sensors */
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    /**
     * Update character information
     * @param {number} displayIndex - Displayed index
     * @param {Object} updatedChar - Updated character
     */
    const handleUpdate = (displayIndex, updatedChar) => {
        const charToUpdate = filteredCharacters[displayIndex];
        const realIndex = characters.indexOf(charToUpdate);
        if (realIndex !== -1) {
            const newChars = [...characters];
            newChars[realIndex] = updatedChar;
            setCharacters(newChars);
        }
    };

    /**
     * Show character delete confirmation
     * @param {number} displayIndex - Displayed index
     */
    const handleDelete = (displayIndex) => {
        const charToDeleteObj = filteredCharacters[displayIndex];
        setCharToDelete(charToDeleteObj);
    };

    /**
     * Confirm deletion
     */
    const confirmDelete = () => {
        if (charToDelete) {
            const newChars = characters.filter(c => c !== charToDelete);
            setCharacters(newChars);
            setCharToDelete(null);
        }
    };

    /**
     * Update sorting after drag-and-drop
     * @param {Object} event - DnD event
     */
    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = filteredCharacters.findIndex(c => c.id === active.id);
            const newIndex = filteredCharacters.findIndex(c => c.id === over.id);

            if (searchQuery === '') {
                setCharacters(arrayMove(characters, oldIndex, newIndex));
            } else {
                const charToMove = filteredCharacters[oldIndex];
                const targetChar = filteredCharacters[newIndex];
                const fromRealIndex = characters.indexOf(charToMove);
                const toRealIndex = characters.indexOf(targetChar);

                const newChars = [...characters];
                newChars.splice(fromRealIndex, 1);
                newChars.splice(toRealIndex, 0, charToMove);
                setCharacters(newChars);
            }
        }
    };

    /**
     * Add new character
     */
    const handleAdd = () => {
        const newChar = {
            id: `char-${Date.now()}`,
            name: t('characters.newHero'),
            class: "Tactician",
            level: 1,
            stats: { HP: 20, Str: 5, Mag: 5, Skl: 5, Spd: 5, Lck: 5, Def: 5, Res: 5 },
            weaponRanks: [
                { type: "Sword", rank: "E" },
                { type: "", rank: "" }
            ],
            equippedSkills: []
        };
        setCharacters([newChar, ...characters]);
    };

    if (isLoading) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gold space-y-4">
                <Loader2 size={48} className="animate-spin opacity-80" />
                <p className="font-cinzel text-xl animate-pulse tracking-widest">{t('characters.analyzing')}</p>
            </div>
        );
    }

    if (filteredCharacters.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-6 animate-in fade-in duration-500">
                <div className="p-8 bg-black/40 rounded-full border border-gray-800 shadow-xl backdrop-blur-sm">
                    <SearchX size={64} className="text-gray-600" />
                </div>
                <div className="text-center space-y-2">
                    <h3 className="font-cinzel text-2xl text-gray-300 font-bold tracking-wide">{t('characters.noCharactersFound')}</h3>
                    <p className="text-gray-500 font-medium">{t('characters.noMatch')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto scroll-custom rounded-lg pr-2">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}

                >
                    <SortableContext
                        items={filteredCharacters.map(c => c.id)}
                        strategy={rectSortingStrategy}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4 items-start">
                            {filteredCharacters.map((char, idx) => (
                                <CharacterCard
                                    key={char.id}
                                    id={char.id}
                                    index={idx}
                                    character={char}
                                    onDelete={handleDelete}
                                    onUpdate={handleUpdate}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={!!charToDelete}
                title={charToDelete?.name}
                message={t('characters.deleteConfirm')}
                onConfirm={confirmDelete}
                onCancel={() => setCharToDelete(null)}
            />
        </div>
    );
};

export default Characters;

