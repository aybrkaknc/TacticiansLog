/**
 * @fileoverview TodoList - Task list management
 * Creating multiple lists, adding/deleting/completing tasks
 */

import React, { useRef, useEffect, useState } from 'react';
import { Plus, X, Trash2, CheckCircle, Circle, RefreshCw, Loader2 } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';
import { useTranslation } from 'react-i18next';

/**
 * TodoList - Task board component
 * @param {Object} props
 * @param {Array} props.todoLists - Array of task lists
 * @param {Function} props.setTodoLists - List update function
 * @param {boolean} props.isLoading - Loading state
 * @returns {JSX.Element}
 */
const TodoList = ({ todoLists, setTodoLists, isLoading }) => {
    const { t } = useTranslation();
    const scrollRef = useRef(null);
    const [listToDelete, setListToDelete] = useState(null);

    /**
     * Update list title
     * @param {number} index - List index
     * @param {string} newTitle - New title
     */
    const handleListTitleChange = (index, newTitle) => {
        const newLists = [...todoLists];
        newLists[index].title = newTitle;
        setTodoLists(newLists);
    };

    /**
     * Delete list (show confirmation window)
     * @param {number} index - Index of the list to be deleted
     * @param {string} title - List title
     */
    const removeList = (index, title) => {
        setListToDelete({ index, title });
    };

    /**
     * Confirm deletion
     */
    const confirmDelete = () => {
        if (listToDelete !== null) {
            const newLists = todoLists.filter((_, i) => i !== listToDelete.index);
            setTodoLists(newLists);
            setListToDelete(null);
        }
    };

    /**
     * Create new list
     */
    const addList = () => {
        setTodoLists([...todoLists, { title: t('tasks.newList'), items: [] }]);
    };

    /**
     * Add new task to the specified location
     * @param {number} listIndex - List index
     * @param {number} itemIndex - Item index (inserted after)
     */
    const handleInsertItem = (listIndex, itemIndex) => {
        const newLists = [...todoLists];
        const newItem = {
            id: Date.now() + Math.random(),
            text: '',
            checked: false,
            isNew: true
        };
        newLists[listIndex].items.splice(itemIndex + 1, 0, newItem);
        setTodoLists(newLists);
    };

    /**
     * Update task item
     * @param {number} listIndex - List index
     * @param {number} itemIndex - Item index
     * @param {string} field - Field to update
     * @param {*} value - New value
     */
    const handleItemChange = (listIndex, itemIndex, field, value) => {
        const newLists = [...todoLists];
        newLists[listIndex].items[itemIndex][field] = value;
        setTodoLists(newLists);
    };

    /**
     * Delete task item
     * @param {number} listIndex - List index
     * @param {number} itemIndex - Index of the item to be deleted
     */
    const handleItemDelete = (listIndex, itemIndex) => {
        const newLists = [...todoLists];
        newLists[listIndex].items.splice(itemIndex, 1);
        setTodoLists(newLists);
    };

    // Horizontal scroll with wheel
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onWheel = (e) => {
            // If deltaY exists, we want horizontal movement
            // Except if the user is holding Shift (which already does horizontal)
            if (Math.abs(e.deltaY) > 0 && !e.shiftKey) {
                e.preventDefault();
                el.scrollLeft += e.deltaY * 1.2; // Slightly faster for better feel
            } else if (Math.abs(e.deltaX) > 0) {
                // Native horizontal scroll (tilt wheel)
                el.scrollLeft += e.deltaX;
            }
        };

        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, []);

    if (isLoading) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gold space-y-4">
                <Loader2 size={48} className="animate-spin opacity-80" />
                <p className="font-cinzel text-xl animate-pulse tracking-widest">{t('tasks.loading')}</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div
                className="flex-1 overflow-y-auto pr-1 pb-2 scroll-custom"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {todoLists.map((list, listIndex) => (
                        <div key={listIndex} className="flex flex-col rounded-xl bg-black/40 border border-gray-800 backdrop-blur-md group/list hover:border-gold/30 transition-all duration-300 min-h-[200px] max-h-[500px]">
                            {/* Header */}
                            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-white/5 rounded-t-xl shrink-0">
                                <input
                                    type="text"
                                    value={list.title}
                                    onChange={(e) => handleListTitleChange(listIndex, e.target.value)}
                                    className="bg-transparent font-bold text-gold text-lg w-full focus:outline-none placeholder-gold/30"
                                    placeholder={t('tasks.listName')}
                                />
                                <button
                                    onClick={() => removeList(listIndex, list.title)}
                                    className="text-gray-600 hover:text-red-500 opacity-0 group-hover/list:opacity-100 transition p-1"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Items */}
                            <div className="flex-1 overflow-y-auto scroll-custom p-4 flex flex-col gap-3">
                                {/* Active Items */}
                                {list.items.map((item, itemIndex) => (
                                    <div key={item.id || itemIndex} className={`flex items-start gap-3 group/item shrink-0 ${item.checked ? 'opacity-40 order-last' : ''}`}>
                                        <button
                                            onClick={() => handleItemChange(listIndex, itemIndex, 'checked', !item.checked)}
                                            className={`mt-[3px] shrink-0 transition-colors ${item.checked ? 'text-green-500' : 'text-gray-600 hover:text-gold'}`}
                                        >
                                            {item.checked ? <CheckCircle size={18} /> : <Circle size={18} />}
                                        </button>
                                        <div className="flex-1 min-w-0">
                                            <textarea
                                                autoFocus={item.isNew}
                                                value={item.text}
                                                onChange={(e) => {
                                                    handleItemChange(listIndex, itemIndex, 'text', e.target.value);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Backspace' && item.text === '') {
                                                        e.preventDefault();
                                                        handleItemDelete(listIndex, itemIndex);
                                                    } else if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleInsertItem(listIndex, itemIndex);
                                                    } else if (e.key === ' ' && e.shiftKey) {
                                                        e.preventDefault();
                                                        const start = e.target.selectionStart;
                                                        const end = e.target.selectionEnd;
                                                        const newText = item.text.substring(0, start) + "\n" + item.text.substring(end);
                                                        handleItemChange(listIndex, itemIndex, 'text', newText);
                                                    }
                                                }}
                                                onFocus={() => {
                                                    if (item.isNew) handleItemChange(listIndex, itemIndex, 'isNew', false);
                                                }}
                                                rows={1}
                                                placeholder={t('tasks.writeTask')}
                                                className={`bg-transparent w-full resize-none focus:outline-none text-sm leading-relaxed overflow-hidden transition-colors placeholder-gray-700 py-0 ${item.checked ? 'line-through text-gray-500' : 'text-gray-300'}`}
                                                style={{ height: 'auto', minHeight: '24px' }}
                                                onInput={(e) => {
                                                    e.target.style.height = 'auto';
                                                    e.target.style.height = e.target.scrollHeight + 'px';
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}

                                {/* Add Row */}
                                <div
                                    onClick={() => handleInsertItem(listIndex, list.items.length - 1)}
                                    className="flex items-center gap-3 group/add cursor-text opacity-50 hover:opacity-100 transition mt-2 shrink-0"
                                >
                                    <button className="shrink-0 text-gray-600 group-hover/add:text-gold transition-colors">
                                        <Plus size={18} />
                                    </button>
                                    <div className="text-gray-600 text-sm select-none font-medium">{t('tasks.addTask')}</div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {todoLists.length === 0 && (
                        <div className="col-span-full h-64 flex flex-col items-center justify-center opacity-40 border-2 border-dashed border-gray-800 rounded-2xl">
                            <Plus size={48} className="text-gray-700 mb-4" />
                            <p className="text-xl font-cinzel text-gray-500">{t('tasks.noList')}</p>
                            <button
                                onClick={addList}
                                className="mt-4 text-gold hover:underline font-bold"
                            >
                                {t('tasks.createList')}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={listToDelete !== null}
                title={listToDelete?.title}
                message={t('tasks.deleteListConfirm')}
                onConfirm={confirmDelete}
                onCancel={() => setListToDelete(null)}
            />
        </div>
    );
};

export default TodoList;

