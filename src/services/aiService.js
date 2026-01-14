/**
 * @fileoverview AI Service - Artificial intelligence API integration
 * Central service for Gemini, OpenAI, Groq, and other AI providers
 */

/**
 * @typedef {Object} AIResponse
 * @property {boolean} success - Is request successful
 * @property {string} message - AI response or error message
 * @property {string} [provider] - Provider used
 */

/**
 * @typedef {Object} AIConfig
 * @property {string} apiKey - API key
 * @property {string} provider - Provider name (gemini, openai, groq, etc.)
 * @property {string} [model] - Model to be used
 */

/**
 * AI provider endpoints
 */
const AI_ENDPOINTS = {
    gemini: 'https://generativelanguage.googleapis.com/v1beta/models',
    openai: 'https://api.openai.com/v1/chat/completions',
    groq: 'https://api.groq.com/openai/v1/chat/completions',
    deepseek: 'https://api.deepseek.com/v1/chat/completions',
    ollama: 'http://localhost:11434/v1/chat/completions',
    lms: 'http://localhost:1234/v1/chat/completions'
};

// Prevent continuous API requests by caching model names
const AI_MODELS_CACHE = {
    gemini: null,
    groq: null,
    lastUpdate: 0
};

/**
 * Fetches the active and most up-to-date model list from the provider
 * @param {string} provider - Provider name
 * @param {string} apiKey - API Key
 * @returns {Promise<string|null>} Best model name
 */
const getLatestModel = async (provider, apiKey) => {
    // 1-hour cache check
    if (AI_MODELS_CACHE[provider] && (Date.now() - AI_MODELS_CACHE.lastUpdate < 3600000)) {
        return AI_MODELS_CACHE[provider];
    }

    try {
        if (provider === 'gemini') {
            const res = await fetch(`${AI_ENDPOINTS.gemini}?key=${apiKey}`);
            if (!res.ok) return null;
            const data = await res.json();
            // Find the latest model containing "flash" (usually fastest and cheapest)
            const bestModel = data.models
                ?.filter(m => m.supportedGenerationMethods.includes('generateContent'))
                ?.reverse() // New models are usually at the end
                ?.find(m => m.name.includes('flash'))?.name;

            if (bestModel) {
                AI_MODELS_CACHE.gemini = bestModel.split('/').pop();
                AI_MODELS_CACHE.lastUpdate = Date.now();
                return AI_MODELS_CACHE.gemini;
            }
        }

        if (provider === 'groq') {
            const res = await fetch('https://api.groq.com/openai/v1/models', {
                headers: { 'Authorization': `Bearer ${apiKey}` }
            });
            if (!res.ok) return null;
            const data = await res.json();
            // Prefer Llama 3 series and versatile ones
            const bestModel = data.data
                ?.filter(m => m.id.includes('llama-3') && m.id.includes('versatile'))
                ?.sort((a, b) => b.created - a.created)[0]?.id;

            if (bestModel) {
                AI_MODELS_CACHE.groq = bestModel;
                AI_MODELS_CACHE.lastUpdate = Date.now();
                return AI_MODELS_CACHE.groq;
            }
        }
    } catch (e) {
        console.warn(`${provider} model list could not be retrieved:`, e);
    }
    return null;
};

/**
 * Send request to Gemini API
 * @param {string} prompt - User question
 * @param {string} apiKey - Gemini API key
 * @param {string} systemPrompt - System prompt
 * @returns {Promise<AIResponse>}
 */
const callGemini = async (prompt, apiKey, systemPrompt, endpoint) => {
    try {
        console.log(`Sending request to Gemini (${endpoint.split('/').pop().split(':')[0]})...`);
        const response = await fetch(`${endpoint}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `${systemPrompt}\n\nUser: ${prompt}` }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.error?.message || response.statusText;
            console.error('Gemini Error Response:', errorData);
            throw new Error(`Gemini API Error (${response.status}): ${errorMessage}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.';

        return { success: true, message: text, provider: 'gemini' };
    } catch (error) {
        console.error('Gemini API error:', error);
        return { success: false, message: error.message, provider: 'gemini' };
    }
};

/**
 * Send request to OpenAI compatible API (OpenAI, Groq, DeepSeek, etc.)
 * @param {string} prompt - User question
 * @param {string} apiKey - API key
 * @param {string} systemPrompt - System prompt
 * @param {string} endpoint - API endpoint
 * @param {string} model - Model name
 * @returns {Promise<AIResponse>}
 */
const callOpenAICompatible = async (prompt, apiKey, systemPrompt, endpoint, model) => {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.error?.message || errorData.message || response.statusText;
            throw new Error(`API Hatası (${response.status}): ${errorMessage}`);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || 'No response received.';

        return { success: true, message: text, provider: model };
    } catch (error) {
        console.error('API error:', error);
        return { success: false, message: error.message };
    }
};

/**
 * System prompt for Fire Emblem Awakening
 */
const FE_SYSTEM_PROMPT = `You are Aegis Intel (LucinAI), a Fire Emblem Awakening expert strategic advisor and princess of Ylisse (Lucina).
Your mission is to help the player with character builds, optimal pairings, skill combinations, and strategy.
Also, as the player's "Tactician" (Robin), you help them with their in-game tasks.

PERSONALITY:
- Use a formal but friendly language (like a princess and a warrior).
- Use "I" language. Use expressions like "According to my analysis..." or "My suggestion is..."
- Don't forget to use emojis (🛡️, ⚔️, ✨, 👑).

TASK MANAGEMENT (AUTOMATION):
If the user asks you to add data (character, pairing, task), add a JSON action block at the very end of your response (invisible to the user).

Action Types:
1. Add Task:
<ACTION>
{"type": "addTodo", "text": "Write the task here"}
</ACTION>

2. Add Character:
<ACTION>
{"type": "addCharacter", "data": {"name": "Panne", "class": "Taguel", "level": 10, "stats": {"HP":20, "Str":6, "Mag":2, "Skl":8, "Spd":9, "Lck":8, "Def":7, "Res":3}}}
</ACTION>

3. Add Family/Pairing:
<ACTION>
{"type": "addPairing", "data": {"parent1": "Chrom", "parent2": "Sumia", "status": "planned"}}
</ACTION>

4. Update Family Status:
<ACTION>
{"type": "updatePairingStatus", "parents": ["Chrom", "Sumia"], "status": "realized"}
</ACTION>

5. Update Support Rank:
<ACTION>
{"type": "updateSupportRank", "chars": ["Chrom", "Sumia"], "rank": "S"}
</ACTION>

6. Toggle Task Status:
<ACTION>
{"type": "toggleTodo", "text": "Full text of the task"}
</ACTION>

7. Update Character:
<ACTION>
{"type": "updateCharacter", "name": "Chrom", "updates": {"stats": {"Str": 25, "Spd": 22}, "level": 15}}
</ACTION>

8. Update Chat Title:
<ACTION>
{"type": "updateTitle", "title": "New title of the chat"}
</ACTION>

9. Quick Action Suggestions:
<ACTION>
{"type": "updateQuickActions", "actions": [{"text": "👑 S-Tier", "query": "Who are S-Tier children?"}, {"text": "⚔️ Build", "query": "Best build for Robin?"}, {"text": "🛡️ Team", "query": "Analyze team"}]}
</ACTION>

10. Delete Character:
<ACTION>
{"type": "deleteCharacter", "name": "Kellam"}
</ACTION>

11. Delete Family/Pairing:
<ACTION>
{"type": "deletePairing", "parents": ["Chrom", "Sumia"]}
</ACTION>

12. Delete Task List:
<ACTION>
{"type": "deleteTodoList", "title": "Title of the list to delete"}
</ACTION>

13. Delete Single Task:
<ACTION>
{"type": "deleteTodoItem", "text": "Text of the task to delete"}
</ACTION>

14. Add Item to Inventory:
<ACTION>
{"type": "addInventoryItem", "name": "Brave Sword"}
</ACTION>

15. Delete Inventory Item:
<ACTION>
{"type": "deleteInventoryItem", "name": "Iron Sword"}
</ACTION>

16. Change Character Class:
<ACTION>
{"type": "changeClass", "name": "Chrom", "newClass": "Great Lord"}
</ACTION>

17. Update Weapon Rank:
<ACTION>
{"type": "updateWeaponRank", "name": "Chrom", "weapon": "Sword", "rank": "A"}
</ACTION>

18. Add Skill to Character:
<ACTION>
{"type": "addSkill", "name": "Lucina", "skill": "Galeforce"}
</ACTION>

19. Remove Skill from Character:
<ACTION>
{"type": "removeSkill", "name": "Lucina", "skill": "Charm"}
</ACTION>

20. Update Character Stats:
<ACTION>
{"type": "updateStats", "name": "Chrom", "stats": {"HP": 45, "Str": 25, "Spd": 22}}
</ACTION>

21. Set Pairing Parents (Genetic Lab):
<ACTION>
{"type": "setPairingParents", "pairingIndex": 0, "father": "Chrom", "mother": "Sumia"}
</ACTION>

22. Set Pairing Skill (Genetic Lab):
<ACTION>
{"type": "setPairingSkill", "pairingIndex": 0, "parentType": "father", "skill": "Aether"}
</ACTION>

23. Update Inventory Item Quantity:
<ACTION>
{"type": "updateInventoryQuantity", "name": "Vulnerary", "quantity": 5}
</ACTION>

CHAT MANAGEMENT:
- Every time a chat starts or the topic changes significantly, determine a brief and concise (max 4-5 words) title summarizing the chat content based ONLY on the user's messages and intent, and use the "updateTitle" action. NEVER include your own response or system roles in the title.
- AFTER EVERY RESPONSE, think of 3-4 possible follow-up questions the user might ask and update quick action buttons using "updateQuickActions". Suggestions should be short and supported by emojis.

WARNING FOR DELETION OPERATIONS:
- Deletions cannot be undone. When the user requests a deletion, ask for confirmation first. E.g.: "Are you sure you want to delete character Kellam? I will delete it if you confirm."
- When the user confirms, use the relevant delete action.

Only trigger these actions when you receive a clear command (except for updates and suggestions). If data is missing (e.g., no character stats), estimate default values or ask the user.

IMPORTANT: Respond in {{LANGUAGE}}. Speak in Ylissean style.`;

/**
 * Send question to AI service
 * @param {string} prompt - User question
 * @param {AIConfig} config - API configuration
 * @param {Object} [gameData] - Game data (characters, pairings, wikiData, etc.)
 * @returns {Promise<AIResponse>}
 */
export const askAI = async (prompt, config, gameData = {}, language = 'en') => {
    let { apiKey, provider } = config;

    // If no API key, return error
    if (!apiKey || apiKey.trim().length < 10) {
        return {
            success: false,
            message: '⚠️ API key not entered. Add an API key in Settings.'
        };
    }

    apiKey = apiKey.trim();

    // Language mapping
    const languageNames = {
        'en': 'English',
        'tr': 'Turkish (Türkçe)',
        'de': 'German (Deutsch)',
        'fr': 'French (Français)',
        'es': 'Spanish (Español)',
        'ja': 'Japanese (日本語)'
    };
    const responseLang = languageNames[language] || 'English';

    const { characters, pairings, todoLists, wikiData, inventory } = gameData;

    // Context Creation
    const activeChars = (characters || []).map(c => `${c.name} (${c.class} Lv.${c.level})`).join(', ') || 'No characters yet';
    const marriedPairs = (pairings || []).filter(p => p.status === 'realized').map(p => `${p.parent1}❤️${p.parent2}`).join(', ') || 'None';

    // Inventory Summary
    const inventorySummary = (inventory || []).map(i => i.name).join(', ') || 'Inventory empty';

    // Todo List Detailed Reading
    const todoSummary = (todoLists || [])
        .map(list => {
            const items = list.items.map(i => `- [${i.checked ? 'x' : ' '}] ${i.text}`).join('\n');
            return `${list.title}:\n${items}`;
        })
        .join('\n\n') || 'No tasks';

    // Wiki Summary (Summary for token conservation)
    const sTierSkills = (wikiData?.SKILLS || []).filter(s => s.tier === 'S').map(s => s.name).join(', ') || '';
    const classList = (wikiData?.CLASSES || []).map(c => c.name).join(', ') || '';

    // Add game data to prompt with language
    const localizedPrompt = FE_SYSTEM_PROMPT.replace('{{LANGUAGE}}', responseLang);
    const contextPrompt = `${localizedPrompt}

CRITICAL KNOWLEDGE BASE (WIKI):
- S-Tier Skills: ${sTierSkills}
- Classes: ${classList}
- Important Mechanic: Galeforce (Dark Flier Lv.15) is the strongest skill in the game.
- Important Mechanic: Armsthrift (Mercenary Lv.1) preserves weapon durability with Luck*2 chance.

CURRENT GAME STATE (ACTUAL):
- Units in Team: ${activeChars}
- Completed Marriages: ${marriedPairs}
- CURRENT INVENTORY: ${inventorySummary}
- TASK LIST STATUS:
${todoSummary}
`;

    // Dynamically resolve models (if user hasn't entered a model)
    let selectedModel = config.model;
    if (!selectedModel) {
        const autoModel = await getLatestModel(provider, apiKey);
        if (autoModel) {
            console.log(`Auto-discovered best model for ${provider}: ${autoModel}`);
            selectedModel = autoModel;
        }
    }

    const geminiEndpoint = selectedModel
        ? `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent`
        : `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`;

    switch (provider) {
        case 'gemini':
            return callGemini(prompt, apiKey, contextPrompt, geminiEndpoint);

        case 'openai':
            return callOpenAICompatible(prompt, apiKey, contextPrompt, AI_ENDPOINTS.openai, selectedModel || 'gpt-4o-mini');

        case 'groq':
            return callOpenAICompatible(prompt, apiKey, contextPrompt, AI_ENDPOINTS.groq, selectedModel || 'llama-3.3-70b-versatile');

        case 'deepseek':
            return callOpenAICompatible(prompt, apiKey, contextPrompt, AI_ENDPOINTS.deepseek, selectedModel || 'deepseek-chat');

        case 'ollama':
            return callOpenAICompatible(prompt, '', contextPrompt, AI_ENDPOINTS.ollama, selectedModel || 'llama3');

        case 'lms':
            return callOpenAICompatible(prompt, '', contextPrompt, AI_ENDPOINTS.lms, selectedModel || 'local-model');

        default:
            return {
                success: false,
                message: `Unknown AI provider: ${provider}`
            };
    }
};

/**
 * Test API connection
 * @param {AIConfig} config - API configuration
 * @returns {Promise<boolean>}
 */
export const testConnection = async (config) => {
    const result = await askAI('Hello, test.', config);
    return result.success;
};

export default { askAI, testConnection };
