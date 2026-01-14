import { useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';

/**
 * Custom hook for sortable list functionality
 * Provides common dnd-kit configuration for sortable lists
 * 
 * @param {Array} items - The array of items to sort
 * @param {Function} setItems - State setter for the items
 * @param {string} idKey - The key to use as unique identifier (default: 'id')
 * @returns {Object} - { sensors, handleDragEnd }
 */
export const useSortableList = (items, setItems, idKey = 'id') => {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = items.findIndex(item => item[idKey] === active.id);
            const newIndex = items.findIndex(item => item[idKey] === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
                setItems(arrayMove(items, oldIndex, newIndex));
            }
        }
    };

    return { sensors, handleDragEnd };
};

export default useSortableList;
