/**
 * @fileoverview SettingsContext - Global settings management
 * Central context for API keys, theme, and user preferences
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * @typedef {Object} SettingsContextType
 * @property {string} apiKey - AI API key
 * @property {string} aiProvider - Selected AI provider (gemini, openai, etc.)
 * @property {string} theme - Application theme (dark, light)
 * @property {Function} setApiKey - Update API key
 * @property {Function} setAiProvider - Update AI provider
 * @property {Function} setTheme - Update theme
 * @property {Function} saveSettings - Save all settings to localStorage
 */

const SettingsContext = createContext(null);

/**
 * SettingsProvider - Wrapper component providing settings context
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element}
 */
export const SettingsProvider = ({ children }) => {
    // API Settings
    const [apiKey, setApiKey] = useState(() =>
        import.meta.env.VITE_GEMINI_API_KEY ||
        localStorage.getItem('ai_api_key') ||
        localStorage.getItem('gemini_api_key') || ''
    );
    const [aiProvider, setAiProvider] = useState(() =>
        localStorage.getItem('ai_provider') || 'gemini'
    );

    // Theme Settings (currently only dark)
    const [theme, setTheme] = useState(() =>
        localStorage.getItem('app_theme') || 'dark'
    );

    /**
     * Save all settings to localStorage
     */
    const saveSettings = () => {
        localStorage.setItem('ai_api_key', apiKey);
        localStorage.setItem('ai_provider', aiProvider);
        localStorage.setItem('app_theme', theme);
    };

    // Save automatically when settings change
    useEffect(() => {
        saveSettings();
    }, [apiKey, aiProvider, theme]);

    const value = {
        apiKey,
        setApiKey,
        aiProvider,
        setAiProvider,
        theme,
        setTheme,
        saveSettings
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

/**
 * useSettings - Hook to access settings context
 * @returns {SettingsContextType}
 * @throws {Error} Throws error if used outside SettingsProvider
 */
export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

export default SettingsContext;
