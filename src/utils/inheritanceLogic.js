import { PARENT_MODIFIERS, CHILD_BASE_MODIFIERS } from '../data/statModifiers';
import { GAME_DATA } from '../data/gameConstants';
import { CLASSES, GROWTH_RATES } from '../data/wikiData';

/**
 * Calculates the max stat modifiers for a child character.
 * Formula: Parent1 + Parent2 + ChildBase + 1
 * @param {string} parent1Name - Name of the first parent (Father)
 * @param {string} parent2Name - Name of the second parent (Mother)
 * @param {string} childName - Name of the child
 * @returns {Object} Object containing stat modifiers
 */
export const calculateChildModifiers = (parent1Name, parent2Name, childName) => {
    const p1Mods = PARENT_MODIFIERS[parent1Name] || { str: 0, mag: 0, skl: 0, spd: 0, lck: 0, def: 0, res: 0 };
    const p2Mods = PARENT_MODIFIERS[parent2Name] || { str: 0, mag: 0, skl: 0, spd: 0, lck: 0, def: 0, res: 0 };
    const cMods = CHILD_BASE_MODIFIERS[childName] || { str: 0, mag: 0, skl: 0, spd: 0, lck: 0, def: 0, res: 0 };

    // Morgan (Avatar's child) logic is complex, simplified here as sum of parents
    // Standard 2nd gen formula: P1 + P2 + Child + 1

    const stats = ['str', 'mag', 'skl', 'spd', 'lck', 'def', 'res'];
    const result = {};

    stats.forEach(stat => {
        result[stat] = (p1Mods[stat] || 0) + (p2Mods[stat] || 0) + (cMods[stat] || 0) + 1;
    });

    return result;
};

/**
 * Predicts the likely inherited skill from a parent based on their current class.
 * Assumes the parent passes down the last learnable skill of their current class.
 * @param {Object} parentChar - The parent character object from user roster
 * @returns {Object|null} The skill object or null
 */
export const getProbableInheritedSkill = (parentChar) => {
    if (!parentChar || !parentChar.class) return null;

    const charClass = CLASSES.find(c => c.name === parentChar.class);
    if (!charClass || !charClass.skills || charClass.skills.length === 0) return null;

    // Return the highest level skill they would learn in this class
    // Simple logic: return the last skill in the list (usually Lv 15 or Lv 10)
    return charClass.skills[charClass.skills.length - 1];
};

/**
 * Returns available classes for the child.
 * @param {string} childName
 * @returns {Array} List of class names
 */
export const getChildPotentialClasses = (childName) => {
    // This is hard to perfect without a huge database of class sets.
    // For now, return a generic list or specific ones if we add them to constants.
    // Simplifying to just return the default class of the child for now.
    const childDef = GAME_DATA.characters.find(c => c.name === childName);
    return childDef ? [childDef.defaultClass] : [];
};

/**
 * Calculates simulated stats for a character at a specific level.
 * Formula: Base + (Growth * (Level - 1) / 100) + Parent Modifiers (Max Cap influence)
 * Note: This is a simplified "Average Stats" calculation.
 * @param {string} className - Current class of the child
 * @param {Object} modifiers - Child's max stat modifiers
 * @param {number} level - Target level (e.g., 1 or 20)
 * @returns {Object} Simulated stats
 */
export const calculateSimulatedStats = (className, modifiers, level = 20) => {
    const classGrowths = GROWTH_RATES[className] || { HP: 50, Str: 30, Mag: 30, Skl: 30, Spd: 30, Lck: 30, Def: 30, Res: 30 };

    // Base stats for generic class at Lv 1 (Simplified estimates)
    const baseStats = { HP: 18, Str: 6, Mag: 2, Skl: 5, Spd: 6, Lck: 5, Def: 6, Res: 2 };
    if (className.includes("Mage") || className.includes("Cleric")) { baseStats.Str = 2; baseStats.Mag = 6; baseStats.Res = 5; }
    if (className.includes("Knight")) { baseStats.Def = 9; baseStats.Spd = 3; }

    const simulated = {};
    const stats = ['HP', 'Str', 'Mag', 'Skl', 'Spd', 'Lck', 'Def', 'Res'];

    stats.forEach(stat => {
        const growth = classGrowths[stat] || 0;
        const gain = (growth * (level - 1)) / 100;
        const geneticBonus = (modifiers[stat.toLowerCase()] || 0);

        simulated[stat.toLowerCase()] = Math.floor(baseStats[stat] + gain + geneticBonus);
    });

    return simulated;
};
