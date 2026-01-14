import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Brain, Cpu, BarChart2, Heart, Shield, Settings, Save, ListTodo, Edit2, Check, X, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { askAI } from '../services/aiService';
import * as wikiData from '../data/wikiData';

/**
 * LucinaChat - Aegis Intel AI chat component
 * Fire Emblem Awakening strategic analysis assistant
 */
const LucinaChat = ({
    characters, setCharacters,
    pairings, setPairings,
    supportRanks, setSupportRanks,
    todoLists, setTodoLists,
    chats, setChats,
    inventory, setInventory
}) => {
    const { t, i18n } = useTranslation();
    const [activeChatId, setActiveChatId] = useState(null);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [editingChatId, setEditingChatId] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    // Derived state for messages
    const [messages, setMessagesState] = useState([]);

    const scrollRef = useRef(null);

    // AI settings
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key') || localStorage.getItem('ai_api_key');
    const aiProvider = localStorage.getItem('ai_provider') || 'gemini';
    const aiModel = localStorage.getItem('ai_model') || '';

    // Quick Actions State
    const [quickActions, setQuickActions] = useState([
        { text: t('lucinaChat.quickActions.tierList.text'), query: t('lucinaChat.quickActions.tierList.query') },
        { text: t('lucinaChat.quickActions.pairing.text'), query: t('lucinaChat.quickActions.pairing.query') },
        { text: t('lucinaChat.quickActions.team.text'), query: t('lucinaChat.quickActions.team.query') },
        { text: t('lucinaChat.quickActions.addTask.text'), query: t('lucinaChat.quickActions.addTask.query') }
    ]);

    // Initialize Chats
    useEffect(() => {
        if (!chats || chats.length === 0) {
            createNewChat();
        } else if (!activeChatId) {
            setActiveChatId(chats[0].id);
        }
    }, [chats]);

    // Update displayed messages when active chat changes
    useEffect(() => {
        if (activeChatId) {
            const currentChat = chats.find(c => c.id === activeChatId);
            if (currentChat) {
                setMessagesState(currentChat.messages);
                setInput(currentChat.draftInput || '');
            }
        }
    }, [activeChatId, chats]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInput(newValue);
        if (activeChatId) {
            setChats(prev => prev.map(chat =>
                chat.id === activeChatId ? { ...chat, draftInput: newValue } : chat
            ));
        }
    };

    // Update welcome messages when language changes
    useEffect(() => {
        setChats(prevChats => prevChats.map(chat => {
            if (chat.messages && chat.messages.length > 0) {
                const firstMsg = chat.messages[0];
                // Try to identify if it's a welcome message (from lucina and at index 0)
                // We update it to the new language
                if (firstMsg.sender === 'lucina') {
                    const newMessages = [...chat.messages];
                    newMessages[0] = { ...firstMsg, text: t('lucinaChat.welcomeMessage') };
                    return { ...chat, messages: newMessages };
                }
            }
            return chat;
        }));
    }, [i18n.language, t]);

    const createNewChat = () => {
        const newChat = {
            id: Date.now(),
            title: t('lucinaChat.newChat'),
            createdAt: new Date().toISOString(),
            messages: [{ sender: 'lucina', text: t('lucinaChat.welcomeMessage') }]
        };
        setChats(prev => [newChat, ...prev]);
        setActiveChatId(newChat.id);
    };

    const deleteChat = (id, e) => {
        e.stopPropagation();
        const filteredChats = chats.filter(c => c.id !== id);
        setChats(filteredChats);
        if (activeChatId === id) {
            setActiveChatId(filteredChats.length > 0 ? filteredChats[0].id : null);
        }
    };

    const startEditing = (chat, e) => {
        e.stopPropagation();
        setEditingChatId(chat.id);
        setEditTitle(chat.title);
    };

    const saveChatTitle = (e) => {
        if (e) e.stopPropagation();
        if (!editingChatId || !editTitle.trim()) {
            setEditingChatId(null);
            return;
        }
        setChats(prev => prev.map(c =>
            c.id === editingChatId ? { ...c, title: editTitle.trim() } : c
        ));
        setEditingChatId(null);
    };

    const cancelEditing = (e) => {
        e.stopPropagation();
        setEditingChatId(null);
    };

    const handleAddTodo = (text) => {
        setTodoLists(prev => {
            const newLists = [...prev];
            const targetListIndex = newLists.findIndex(l => l.title === 'General') !== -1
                ? newLists.findIndex(l => l.title === 'General')
                : 0;

            if (newLists[targetListIndex]) {
                const newTask = {
                    id: Date.now(),
                    text: text,
                    checked: false,
                    createdAt: new Date().toISOString()
                };
                newLists[targetListIndex].items.push(newTask);
            }
            return newLists;
        });
    };

    const handleAddCharacter = (charData) => {
        setCharacters(prev => {
            const newChar = {
                id: `char-${Date.now()}`,
                name: charData.name || 'New Character',
                class: charData.class || 'Tactician',
                level: charData.level || 1,
                stats: charData.stats || { HP: 20, Str: 5, Mag: 5, Skl: 5, Spd: 5, Lck: 5, Def: 5, Res: 5 },
                weaponRanks: charData.weaponRanks || [{ type: "Sword", rank: "E" }, { type: "", rank: "" }],
                equippedSkills: charData.equippedSkills || []
            };
            return [newChar, ...prev];
        });
    };

    const handleUpdateCharacter = (name, updates) => {
        setCharacters(prev => prev.map(char => {
            if (char.name.toLowerCase() === name.toLowerCase()) {
                const updatedChar = { ...char, ...updates };
                if (updates.stats) {
                    updatedChar.stats = { ...char.stats, ...updates.stats };
                }
                return updatedChar;
            }
            return char;
        }));
    };

    const handleAddPairing = (pairData) => {
        if (!pairData.parent1 || !pairData.parent2) return;

        setPairings(prev => {
            const newFamily = {
                familyId: `family-${Date.now()}`,
                familyName: `${pairData.parent1} & ${pairData.parent2}`,
                parent1: pairData.parent1,
                parent2: pairData.parent2,
                child: pairData.child || '?',
                status: pairData.status || 'Planned',
                recruited: false
            };
            return [...prev, newFamily];
        });
    };

    const handleToggleTodo = (text) => {
        setTodoLists(prev => {
            return prev.map(list => {
                const updatedItems = list.items.map(item => {
                    if (item.text.toLowerCase().includes(text.toLowerCase()) || text.toLowerCase().includes(item.text.toLowerCase())) {
                        return { ...item, checked: !item.checked };
                    }
                    return item;
                });
                return { ...list, items: updatedItems };
            });
        });
    };

    const handleUpdateSupportRank = (chars, rank) => {
        if (!chars || chars.length < 2) return;
        const key = chars.sort().join('-');
        setSupportRanks(prev => ({ ...prev, [key]: rank }));
    };

    const handleUpdatePairingStatus = (parents, newStatus) => {
        if (!parents || parents.length < 2) return false;

        const cardFound = pairings.find(p =>
            (p.parent1 === parents[0] && p.parent2 === parents[1]) ||
            (p.parent1 === parents[1] && p.parent2 === parents[0])
        );

        if (cardFound) {
            setPairings(prev => prev.map(p => {
                if ((p.id === cardFound.id) || (p.familyId === cardFound.familyId)) {
                    return { ...p, status: newStatus };
                }
                return p;
            }));
            return true;
        } else {
            handleAddPairing({
                parent1: parents[0],
                parent2: parents[1],
                status: newStatus
            });
            return true;
        }
    };

    const handleDeleteCharacter = (name) => {
        if (!name) return false;
        const found = characters.find(c => c.name.toLowerCase() === name.toLowerCase());
        if (found) {
            setCharacters(prev => prev.filter(c => c.name.toLowerCase() !== name.toLowerCase()));
            return true;
        }
        return false;
    };

    const handleDeletePairing = (parents) => {
        if (!parents || parents.length < 2) return false;
        const found = pairings.find(p =>
            (p.parent1?.toLowerCase() === parents[0].toLowerCase() && p.parent2?.toLowerCase() === parents[1].toLowerCase()) ||
            (p.parent1?.toLowerCase() === parents[1].toLowerCase() && p.parent2?.toLowerCase() === parents[0].toLowerCase())
        );
        if (found) {
            setPairings(prev => prev.filter(p => p.familyId !== found.familyId && p.id !== found.id));
            return true;
        }
        return false;
    };

    const handleDeleteTodoList = (title) => {
        if (!title) return false;
        const found = todoLists.find(l => l.title.toLowerCase() === title.toLowerCase());
        if (found) {
            setTodoLists(prev => prev.filter(l => l.title.toLowerCase() !== title.toLowerCase()));
            return true;
        }
        return false;
    };

    const handleDeleteTodoItem = (text) => {
        if (!text) return false;
        let deleted = false;
        setTodoLists(prev => prev.map(list => {
            const foundItem = list.items.find(item =>
                item.text.toLowerCase().includes(text.toLowerCase()) ||
                text.toLowerCase().includes(item.text.toLowerCase())
            );
            if (foundItem) {
                deleted = true;
                return { ...list, items: list.items.filter(item => item.id !== foundItem.id) };
            }
            return list;
        }));
        return deleted;
    };

    const handleAddInventoryItem = (itemName) => {
        if (!itemName) return false;

        const newItem = {
            id: `item-${Date.now()}`,
            instanceId: Date.now() + Math.random().toString(36).substr(2, 9),
            name: itemName,
            type: 'Weapon',
            addedAt: new Date().toISOString()
        };

        if (setInventory) {
            setInventory(prev => [newItem, ...(prev || [])]);
            return true;
        }
        return false;
    };

    const handleDeleteInventoryItem = (itemName) => {
        if (!itemName) return false;
        let found = false;
        if (setInventory) {
            setInventory(prev => {
                const newInv = [...(prev || [])];
                const index = newInv.findIndex(item => item.name.toLowerCase().includes(itemName.toLowerCase()));
                if (index !== -1) {
                    newInv.splice(index, 1);
                    found = true;
                    return newInv;
                }
                return prev;
            });
        }
        const effectiveInv = inventory || [];
        const exists = effectiveInv.some(item => item.name.toLowerCase().includes(itemName.toLowerCase()));
        return exists;
    };

    // New handler: Change character class
    const handleChangeClass = (name, newClass) => {
        const charIndex = characters.findIndex(c => c.name.toLowerCase() === name.toLowerCase());
        if (charIndex === -1) return false;

        setCharacters(prev => prev.map((c, i) =>
            i === charIndex ? { ...c, class: newClass } : c
        ));
        return true;
    };

    // New handler: Update weapon rank
    const handleUpdateWeaponRank = (name, weapon, rank) => {
        const charIndex = characters.findIndex(c => c.name.toLowerCase() === name.toLowerCase());
        if (charIndex === -1) return false;

        setCharacters(prev => prev.map((c, i) => {
            if (i !== charIndex) return c;
            const weaponRanks = [...(c.weaponRanks || [])];
            const wpnIndex = weaponRanks.findIndex(w => w.type.toLowerCase() === weapon.toLowerCase());
            if (wpnIndex !== -1) {
                weaponRanks[wpnIndex] = { ...weaponRanks[wpnIndex], rank };
            } else {
                weaponRanks.push({ type: weapon, rank });
            }
            return { ...c, weaponRanks };
        }));
        return true;
    };

    // New handler: Add skill to character
    const handleAddSkillToCharacter = (name, skill) => {
        const charIndex = characters.findIndex(c => c.name.toLowerCase() === name.toLowerCase());
        if (charIndex === -1) return false;

        setCharacters(prev => prev.map((c, i) => {
            if (i !== charIndex) return c;
            const equippedSkills = [...(c.equippedSkills || [])];
            if (!equippedSkills.includes(skill)) {
                equippedSkills.push(skill);
            }
            return { ...c, equippedSkills };
        }));
        return true;
    };

    // New handler: Remove skill from character
    const handleRemoveSkillFromCharacter = (name, skill) => {
        const charIndex = characters.findIndex(c => c.name.toLowerCase() === name.toLowerCase());
        if (charIndex === -1) return false;

        setCharacters(prev => prev.map((c, i) => {
            if (i !== charIndex) return c;
            const equippedSkills = (c.equippedSkills || []).filter(s => s.toLowerCase() !== skill.toLowerCase());
            return { ...c, equippedSkills };
        }));
        return true;
    };

    // New handler: Update character stats
    const handleUpdateStats = (name, stats) => {
        const charIndex = characters.findIndex(c => c.name.toLowerCase() === name.toLowerCase());
        if (charIndex === -1) return false;

        setCharacters(prev => prev.map((c, i) => {
            if (i !== charIndex) return c;
            return { ...c, stats: { ...c.stats, ...stats } };
        }));
        return true;
    };

    // New handler: Set pairing parents (Genetic Lab)
    const handleSetPairingParents = (pairingIndex, father, mother) => {
        if (pairingIndex < 0 || pairingIndex >= (pairings || []).length) return false;

        setPairings(prev => prev.map((p, i) => {
            if (i !== pairingIndex) return p;
            return { ...p, parent1: father, parent2: mother };
        }));
        return true;
    };

    // New handler: Set pairing skill (Genetic Lab)
    const handleSetPairingSkill = (pairingIndex, parentType, skill) => {
        if (pairingIndex < 0 || pairingIndex >= (pairings || []).length) return false;

        setPairings(prev => prev.map((p, i) => {
            if (i !== pairingIndex) return p;
            const key = parentType === 'father' ? 'fatherSkill' : 'motherSkill';
            return { ...p, [key]: skill };
        }));
        return true;
    };

    // New handler: Update inventory quantity
    const handleUpdateInventoryQuantity = (itemName, quantity) => {
        if (!itemName) return false;

        setInventory(prev => prev.map(item => {
            if (item.name.toLowerCase().includes(itemName.toLowerCase())) {
                return { ...item, quantity };
            }
            return item;
        }));
        return true;
    };

    const setMessages = (newMessagesOrUpdater) => {
        if (!activeChatId) return;
        let resolvedMessages;
        if (typeof newMessagesOrUpdater === 'function') {
            resolvedMessages = newMessagesOrUpdater(messages);
        } else {
            resolvedMessages = newMessagesOrUpdater;
        }
        setMessagesState(resolvedMessages);
        setChats(prev => prev.map(chat => {
            if (chat.id === activeChatId) {
                return { ...chat, messages: resolvedMessages, draftInput: '' };
            }
            return chat;
        }));
    };

    const handleSend = async (text) => {
        const userText = text || input;
        if (!userText.trim()) return;

        const newMessages = [...messages, { sender: 'user', text: userText }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const appData = { characters, pairings, todoLists, wikiData, supportRanks, inventory };
            const response = await askAI(userText, { apiKey, provider: aiProvider, model: aiModel }, appData, i18n.language);

            let finalText = response.message;

            while (true) {
                const actionMatch = finalText.match(/<ACTION>([\s\S]*?)<\/ACTION>/);
                if (!actionMatch) break;

                const fullMatch = actionMatch[0];
                const jsonContent = actionMatch[1];
                finalText = finalText.replace(fullMatch, '').trim();

                try {
                    const actionData = JSON.parse(jsonContent);

                    if (actionData.type === 'addTodo' && actionData.text) {
                        handleAddTodo(actionData.text);
                        finalText += `\n\n✅ [${t('lucinaChat.system')}] ${t('lucinaChat.taskAdded')}`;
                    } else if (actionData.type === 'addCharacter' && actionData.data) {
                        handleAddCharacter(actionData.data);
                        finalText += `\n\n✅ [${t('lucinaChat.system')}] ${t('lucinaChat.characterAdded', { name: actionData.data.name })}`;
                    } else if (actionData.type === 'updateCharacter' && actionData.name && actionData.updates) {
                        handleUpdateCharacter(actionData.name, actionData.updates);
                        finalText += `\n\n✅ [${t('lucinaChat.system')}] ${t('lucinaChat.characterUpdated', { name: actionData.name })}`;
                    } else if (actionData.type === 'addPairing' && actionData.data) {
                        handleAddPairing(actionData.data);
                        finalText += `\n\n✅ [${t('lucinaChat.system')}] ${t('lucinaChat.pairingAdded', { parent1: actionData.data.parent1, parent2: actionData.data.parent2 })}`;
                    } else if (actionData.type === 'toggleTodo' && actionData.text) {
                        handleToggleTodo(actionData.text);
                        finalText += `\n\n✅ [${t('lucinaChat.system')}] ${t('lucinaChat.taskUpdated', { text: actionData.text })}`;
                    } else if (actionData.type === 'updatePairingStatus' && actionData.parents && actionData.status) {
                        handleUpdatePairingStatus(actionData.parents, actionData.status);
                        const statusLabel = actionData.status === 'S Rank' ? t('lucinaChat.realizedProjects') : t('lucinaChat.plannedProjects');
                        finalText += `\n\n✅ [${t('lucinaChat.system')}] ${t('lucinaChat.pairMoved', { parent1: actionData.parents[0], parent2: actionData.parents[1], status: statusLabel })}`;
                    } else if (actionData.type === 'updateSupportRank' && actionData.chars && actionData.rank) {
                        handleUpdateSupportRank(actionData.chars, actionData.rank);
                        finalText += `\n\n✅ [${t('lucinaChat.system')}] ${t('lucinaChat.bondRank', { char1: actionData.chars[0], char2: actionData.chars[1], rank: actionData.rank })}`;
                    } else if (actionData.type === 'updateTitle' && actionData.title) {
                        setChats(prev => prev.map(c =>
                            c.id === activeChatId ? { ...c, title: actionData.title } : c
                        ));
                    } else if (actionData.type === 'updateQuickActions' && actionData.actions) {
                        setQuickActions(actionData.actions);
                    } else if (actionData.type === 'deleteCharacter' && actionData.name) {
                        const deleted = handleDeleteCharacter(actionData.name);
                        if (deleted) {
                            finalText += `\n\n🗑️ [${t('lucinaChat.system')}] ${t('lucinaChat.characterDeleted', { name: actionData.name })}`;
                        } else {
                            finalText += `\n\n⚠️ [${t('lucinaChat.system')}] ${t('lucinaChat.characterNotFound', { name: actionData.name })}`;
                        }
                    } else if (actionData.type === 'deletePairing' && actionData.parents) {
                        const deleted = handleDeletePairing(actionData.parents);
                        if (deleted) {
                            finalText += `\n\n🗑️ [${t('lucinaChat.system')}] ${t('lucinaChat.pairDeleted', { parent1: actionData.parents[0], parent2: actionData.parents[1] })}`;
                        } else {
                            finalText += `\n\n⚠️ [${t('lucinaChat.system')}] ${t('lucinaChat.pairNotFound')}`;
                        }
                    } else if (actionData.type === 'deleteTodoList' && actionData.title) {
                        const deleted = handleDeleteTodoList(actionData.title);
                        if (deleted) {
                            finalText += `\n\n🗑️ [${t('lucinaChat.system')}] ${t('lucinaChat.listDeleted', { title: actionData.title })}`;
                        } else {
                            finalText += `\n\n⚠️ [${t('lucinaChat.system')}] ${t('lucinaChat.listNotFound', { title: actionData.title })}`;
                        }
                    } else if (actionData.type === 'deleteTodoItem' && actionData.text) {
                        const deleted = handleDeleteTodoItem(actionData.text);
                        if (deleted) {
                            finalText += `\n\n🗑️ [${t('lucinaChat.system')}] ${t('lucinaChat.taskDeleted', { text: actionData.text })}`;
                        } else {
                            finalText += `\n\n⚠️ [${t('lucinaChat.system')}] ${t('lucinaChat.taskNotFound')}`;
                        }
                    } else if (actionData.type === 'addInventoryItem' && actionData.name) {
                        handleAddInventoryItem(actionData.name);
                        finalText += `\n\n📦 [${t('lucinaChat.system')}] ${t('lucinaChat.inventoryAdded', { name: actionData.name })}`;
                    } else if (actionData.type === 'deleteInventoryItem' && actionData.name) {
                        const deleted = handleDeleteInventoryItem(actionData.name);
                        if (deleted) {
                            finalText += `\n\n🗑️ [${t('lucinaChat.system')}] ${t('lucinaChat.inventoryDeleted', { name: actionData.name })}`;
                        } else {
                            finalText += `\n\n⚠️ [${t('lucinaChat.system')}] ${t('lucinaChat.inventoryNotFound', { name: actionData.name })}`;
                        }
                    } else if (actionData.type === 'changeClass' && actionData.name && actionData.newClass) {
                        const success = handleChangeClass(actionData.name, actionData.newClass);
                        if (success) {
                            finalText += `\n\n🛡️ [${t('lucinaChat.system')}] ${actionData.name}'s class changed to ${actionData.newClass}!`;
                        } else {
                            finalText += `\n\n⚠️ [${t('lucinaChat.system')}] Character ${actionData.name} not found.`;
                        }
                    } else if (actionData.type === 'updateWeaponRank' && actionData.name && actionData.weapon && actionData.rank) {
                        const success = handleUpdateWeaponRank(actionData.name, actionData.weapon, actionData.rank);
                        if (success) {
                            finalText += `\n\n⚔️ [${t('lucinaChat.system')}] ${actionData.name}'s ${actionData.weapon} rank updated to ${actionData.rank}!`;
                        } else {
                            finalText += `\n\n⚠️ [${t('lucinaChat.system')}] Character ${actionData.name} not found.`;
                        }
                    } else if (actionData.type === 'addSkill' && actionData.name && actionData.skill) {
                        const success = handleAddSkillToCharacter(actionData.name, actionData.skill);
                        if (success) {
                            finalText += `\n\n✨ [${t('lucinaChat.system')}] ${actionData.skill} added to ${actionData.name}!`;
                        } else {
                            finalText += `\n\n⚠️ [${t('lucinaChat.system')}] Character ${actionData.name} not found.`;
                        }
                    } else if (actionData.type === 'removeSkill' && actionData.name && actionData.skill) {
                        const success = handleRemoveSkillFromCharacter(actionData.name, actionData.skill);
                        if (success) {
                            finalText += `\n\n🗑️ [${t('lucinaChat.system')}] ${actionData.skill} removed from ${actionData.name}!`;
                        } else {
                            finalText += `\n\n⚠️ [${t('lucinaChat.system')}] Character ${actionData.name} not found.`;
                        }
                    } else if (actionData.type === 'updateStats' && actionData.name && actionData.stats) {
                        const success = handleUpdateStats(actionData.name, actionData.stats);
                        if (success) {
                            finalText += `\n\n📊 [${t('lucinaChat.system')}] ${actionData.name}'s stats updated!`;
                        } else {
                            finalText += `\n\n⚠️ [${t('lucinaChat.system')}] Character ${actionData.name} not found.`;
                        }
                    } else if (actionData.type === 'setPairingParents' && actionData.father && actionData.mother) {
                        const success = handleSetPairingParents(actionData.pairingIndex || 0, actionData.father, actionData.mother);
                        if (success) {
                            finalText += `\n\n❤️ [${t('lucinaChat.system')}] Pairing set: ${actionData.father} + ${actionData.mother}!`;
                        } else {
                            finalText += `\n\n⚠️ [${t('lucinaChat.system')}] Pairing update failed.`;
                        }
                    } else if (actionData.type === 'setPairingSkill' && actionData.skill) {
                        const success = handleSetPairingSkill(actionData.pairingIndex || 0, actionData.parentType || 'father', actionData.skill);
                        if (success) {
                            finalText += `\n\n⚡ [${t('lucinaChat.system')}] Skill ${actionData.skill} set for ${actionData.parentType || 'father'}!`;
                        } else {
                            finalText += `\n\n⚠️ [${t('lucinaChat.system')}] Skill update failed.`;
                        }
                    } else if (actionData.type === 'updateInventoryQuantity' && actionData.name && actionData.quantity !== undefined) {
                        const success = handleUpdateInventoryQuantity(actionData.name, actionData.quantity);
                        if (success) {
                            finalText += `\n\n📦 [${t('lucinaChat.system')}] ${actionData.name} quantity updated to ${actionData.quantity}!`;
                        } else {
                            finalText += `\n\n⚠️ [${t('lucinaChat.system')}] Item ${actionData.name} not found.`;
                        }
                    }
                } catch (e) {
                    console.error('Action parse error:', e);
                }
            }

            setMessages(prev => [...prev, { sender: 'lucina', text: finalText }]);
        } catch (error) {
            console.error('AI response error:', error);
            setMessages(prev => [...prev, {
                sender: 'lucina',
                text: `⚠️ ${t('lucinaChat.error', { message: error.message })}`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex gap-4">
            {/* Sidebar - Chat List */}
            <div className="w-64 flex flex-col h-full bg-black/40 border border-gray-700/50 rounded-lg overflow-hidden shrink-0">
                <div className="p-2 border-b border-gray-800/50">
                    <button
                        onClick={createNewChat}
                        className="flex items-center gap-2 w-full px-4 py-3 bg-blue-900/20 hover:bg-blue-900/40 text-blue-300 border border-blue-500/30 rounded-lg transition-all font-bold text-sm tracking-wide group"
                    >
                        <div className="bg-blue-500/20 p-1 rounded-full group-hover:scale-110 transition-transform">
                            <Sparkles size={14} />
                        </div>
                        {t('lucinaChat.newChat')}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto scroll-custom space-y-1 p-2">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChatId(chat.id)}
                            className={`group relative p-3 rounded-lg cursor-pointer border transition-all ${activeChatId === chat.id
                                ? 'bg-gold/10 border-gold/40 text-gold'
                                : 'hover:bg-gray-800 border-transparent text-gray-400'
                                }`}
                        >
                            {editingChatId === chat.id ? (
                                <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={e => setEditTitle(e.target.value)}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') saveChatTitle();
                                            if (e.key === 'Escape') cancelEditing(e);
                                        }}
                                        autoFocus
                                        className="w-full bg-black/60 border border-gold/40 rounded px-2 py-1 text-xs text-white focus:outline-none"
                                    />
                                    <button onClick={() => saveChatTitle()} className="p-1 hover:text-green-400">
                                        <Check size={12} />
                                    </button>
                                    <button onClick={cancelEditing} className="p-1 hover:text-red-400">
                                        <X size={12} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h4 className="font-bold text-xs truncate pr-10 font-cinzel">{chat.title}</h4>
                                    <span className="text-[10px] opacity-60 block mt-1">
                                        {new Date(chat.createdAt).toLocaleDateString(t('common.locale', 'en-US'), { hour: '2-digit', minute: '2-digit' })}
                                    </span>

                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-all">
                                        <button
                                            onClick={(e) => startEditing(chat, e)}
                                            className="p-1.5 hover:bg-gold/20 hover:text-gold rounded transition-all text-gray-600"
                                            title={t('lucinaChat.rename')}
                                        >
                                            <Edit2 size={12} />
                                        </button>
                                        <button
                                            onClick={(e) => deleteChat(chat.id, e)}
                                            className="p-1.5 hover:bg-red-900/50 hover:text-red-400 rounded transition-all text-gray-600"
                                            title={t('lucinaChat.deleteChat')}
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <div className="flex-1 bg-black/30 border border-gray-700 rounded-lg p-4 overflow-hidden relative flex flex-col glass">
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4" ref={scrollRef}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-lg px-4 py-2 text-sm whitespace-pre-wrap transition-all ${msg.sender === 'user'
                                    ? 'bg-blue-600/30 text-white rounded-br-none border border-blue-400/30 ml-auto'
                                    : 'bg-transparent text-gray-200 px-0'
                                    }`}>
                                    {msg.sender === 'lucina' && (
                                        <div className="flex items-center gap-2 mb-1.5 opacity-80">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                                            <div className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] font-cinzel">{t('lucinaChat.title')}</div>
                                        </div>
                                    )}
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-transparent text-gray-200 px-0 flex flex-col gap-2">
                                    <div className="flex items-center gap-2 opacity-80">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                                        <div className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] font-cinzel">{t('lucinaChat.title')}</div>
                                        <Cpu className="animate-spin text-blue-400/50 w-3 h-3 ml-1" />
                                    </div>
                                    <span className="text-xs text-gray-400 animate-pulse italic">{t('lucinaChat.analyzing')}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="flex flex-wrap gap-2 mb-3">
                            {quickActions.map(action => (
                                <button
                                    key={action.text}
                                    onClick={() => handleSend(action.query)}
                                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-full border border-gray-700 hover:border-gold transition flex items-center gap-1.5"
                                >
                                    {action.text}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={t('lucinaChat.inputPlaceholder')}
                                className="flex-1 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold placeholder-gray-500"
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={isLoading || !input.trim()}
                                className="px-6 py-3 bg-gold/20 hover:bg-gold/30 text-gold rounded-lg border border-gold/50 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <span>{t('lucinaChat.send')}</span>
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LucinaChat;
