import { useState, useEffect } from 'react';

export function useGameData() {
    const [characters, setCharacters] = useState([]);
    const [pairings, setPairings] = useState([]);
    const [supportRanks, setSupportRanks] = useState({}); // New state: { 'Chrom-Sumia': 'S', ... }
    const [todoLists, setTodoLists] = useState([{ title: 'General', items: [] }]);
    const [chats, setChats] = useState([]);
    const [inventory, setInventory] = useState(null); // Init as null to prevent overwriting with empty
    const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'home');
    const [loading, setLoading] = useState(true);

    // Load initial data from Electron backend
    useEffect(() => {
        const loadData = async () => {
            try {
                if (window.electronAPI) {
                    const data = await window.electronAPI.readData();
                    if (data.characters) {
                        let validatedChars = data.characters.map((c, i) => ({
                            ...c,
                            id: c.id || `char-${Date.now()}-${i}`
                        }));

                        // Migrate Base64 to Filesystem
                        validatedChars = await Promise.all(validatedChars.map(async (c) => {
                            if (c.portrait && c.portrait.startsWith('data:image')) {
                                try {
                                    const newPath = await window.electronAPI.saveImage(c.portrait);
                                    return { ...c, portrait: newPath };
                                } catch (e) {
                                    console.error(`Failed to migrate portrait for ${c.name}`, e);
                                    return c; // Keep original if fail
                                }
                            }
                            return c;
                        }));

                        setCharacters(validatedChars);
                    }
                    if (data.pairings) setPairings(data.pairings);
                    if (data.supportRanks) setSupportRanks(data.supportRanks);
                    if (data.todoLists) setTodoLists(data.todoLists);
                    if (data.chats) setChats(data.chats);

                    // IF inventory is missing in file, default to empty array
                    setInventory(data.inventory || []);
                } else {
                    // Fallback to localStorage for web/dev environment
                    const localChars = localStorage.getItem('fe_characters');
                    const localPairs = localStorage.getItem('fe_pairings');
                    const localSupports = localStorage.getItem('fe_supports');
                    const localTodo = localStorage.getItem('fe_todo');
                    const localChats = localStorage.getItem('fe_chats');
                    const localInv = localStorage.getItem('user_inventory');

                    if (localChars) setCharacters(JSON.parse(localChars));
                    if (localPairs) setPairings(JSON.parse(localPairs));
                    if (localSupports) setSupportRanks(JSON.parse(localSupports));
                    if (localTodo) setTodoLists(JSON.parse(localTodo));
                    if (localChats) setChats(JSON.parse(localChats));

                    // If localInv is null, it means no data yet or cleared. Set to empty array.
                    // If it has data, set it.
                    setInventory(localInv ? JSON.parse(localInv) : []);
                }
            } catch (err) {
                console.error("Data load error:", err);
                // If error, do NOT set inventory to empty to avoid overwrite? 
                // Or set to empty to allow app usage?
                // Let's safe fail: keep it null if critical error, but we need to stop loading.
                if (inventory === null) setInventory([]);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    // Unified Auto-save effect
    useEffect(() => {
        if (loading) return;
        if (inventory === null) return; // Critical guard: Don't save if inventory not loaded yet

        const saveData = async () => {
            if (window.electronAPI) {
                // Save all data chunks
                await window.electronAPI.saveData('characters', characters);
                await window.electronAPI.saveData('pairings', pairings);
                await window.electronAPI.saveData('supportRanks', supportRanks);
                await window.electronAPI.saveData('todo', todoLists);
                await window.electronAPI.saveData('chats', chats);
                await window.electronAPI.saveData('inventory', inventory);
            } else {
                localStorage.setItem('fe_characters', JSON.stringify(characters));
                localStorage.setItem('fe_pairings', JSON.stringify(pairings));
                localStorage.setItem('fe_supports', JSON.stringify(supportRanks));
                localStorage.setItem('fe_todo', JSON.stringify(todoLists));
                localStorage.setItem('fe_chats', JSON.stringify(chats));
                localStorage.setItem('user_inventory', JSON.stringify(inventory));
            }
        };

        const timeoutId = setTimeout(saveData, 1000); // Debounce save
        return () => clearTimeout(timeoutId);

    }, [characters, pairings, supportRanks, todoLists, chats, inventory, loading]);

    return {
        characters, setCharacters,
        pairings, setPairings,
        supportRanks, setSupportRanks,
        todoLists, setTodoLists,
        chats, setChats,
        inventory: inventory || [], // Return empty array if null to prevent UI crash
        setInventory,
        activeTab, setActiveTab,
        loading
    };
}
