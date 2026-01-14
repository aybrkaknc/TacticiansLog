/**
 * @fileoverview Character Class Trees
 * Defines which classes each character can access through reclassing.
 * Used by Genetic Lab for dynamic class selection.
 */

export const CHARACTER_CLASS_TREES = {
    // Lords
    "Chrom": ["Lord", "Great Lord", "Cavalier", "Paladin", "Great Knight", "Archer", "Sniper", "Bow Knight"],
    "Lucina": ["Lord", "Great Lord", "Cavalier", "Paladin", "Great Knight", "Archer", "Sniper", "Bow Knight"],

    // Avatar (Complete Access)
    "Robin (M)": ["Tactician", "Grandmaster", "Cavalier", "Paladin", "Great Knight", "Knight", "General", "Myrmidon", "Swordmaster", "Assassin", "Thief", "Trickster", "Mercenary", "Hero", "Bow Knight", "Fighter", "Warrior", "Barbarian", "Berserker", "Archer", "Sniper", "Mage", "Sage", "Dark Knight", "Dark Mage", "Sorcerer", "Cleric", "War Cleric", "Priest", "War Monk", "Troubadour", "Valkyrie", "Pegasus Knight", "Falcon Knight", "Dark Flier", "Wyvern Rider", "Wyvern Lord", "Griffon Rider", "Dread Fighter"],
    "Robin (F)": ["Tactician", "Grandmaster", "Cavalier", "Paladin", "Great Knight", "Knight", "General", "Myrmidon", "Swordmaster", "Assassin", "Thief", "Trickster", "Mercenary", "Hero", "Bow Knight", "Fighter", "Warrior", "Barbarian", "Berserker", "Archer", "Sniper", "Mage", "Sage", "Dark Knight", "Dark Mage", "Sorcerer", "Cleric", "War Cleric", "Troubadour", "Valkyrie", "Pegasus Knight", "Falcon Knight", "Dark Flier", "Wyvern Rider", "Wyvern Lord", "Griffon Rider", "Bride"],

    // First Gen Males
    "Frederick": ["Cavalier", "Paladin", "Great Knight", "Knight", "General", "Wyvern Rider", "Wyvern Lord", "Griffon Rider"],
    "Virion": ["Archer", "Sniper", "Bow Knight", "Mage", "Sage", "Dark Knight", "Wyvern Rider", "Wyvern Lord", "Griffon Rider"],
    "Stahl": ["Cavalier", "Paladin", "Great Knight", "Myrmidon", "Swordmaster", "Assassin", "Archer", "Sniper", "Bow Knight"],
    "Vaike": ["Fighter", "Warrior", "Hero", "Barbarian", "Berserker", "Thief", "Assassin", "Trickster"],
    "Kellam": ["Knight", "General", "Great Knight", "Thief", "Assassin", "Trickster", "Priest", "War Monk", "Sage"],
    "Donnel": ["Villager", "Fighter", "Warrior", "Hero", "Mercenary", "Bow Knight"],
    "Lon'qu": ["Myrmidon", "Swordmaster", "Assassin", "Thief", "Trickster", "Wyvern Rider", "Wyvern Lord", "Griffon Rider"],
    "Ricken": ["Mage", "Sage", "Dark Knight", "Dark Mage", "Sorcerer", "Cavalier", "Paladin", "Great Knight", "Archer", "Sniper", "Bow Knight"],
    "Gaius": ["Thief", "Assassin", "Trickster", "Myrmidon", "Swordmaster", "Fighter", "Warrior", "Hero"],
    "Gregor": ["Mercenary", "Hero", "Bow Knight", "Myrmidon", "Swordmaster", "Assassin", "Barbarian", "Berserker", "Warrior"],
    "Libra": ["Priest", "War Monk", "Sage", "Mage", "Dark Knight", "Dark Mage", "Sorcerer"],
    "Henry": ["Dark Mage", "Sorcerer", "Dark Knight", "Thief", "Assassin", "Trickster", "Barbarian", "Berserker", "Warrior"],

    // First Gen Females
    "Lissa": ["Cleric", "War Cleric", "Sage", "Troubadour", "Valkyrie", "Pegasus Knight", "Falcon Knight", "Dark Flier"],
    "Sully": ["Cavalier", "Paladin", "Great Knight", "Myrmidon", "Swordmaster", "Assassin", "Wyvern Rider", "Wyvern Lord", "Griffon Rider"],
    "Miriel": ["Mage", "Sage", "Dark Knight", "Dark Mage", "Sorcerer", "Troubadour", "Valkyrie", "War Cleric"],
    "Sumia": ["Pegasus Knight", "Falcon Knight", "Dark Flier", "Knight", "General", "Great Knight", "Cleric", "War Cleric", "Sage"],
    "Maribelle": ["Troubadour", "Valkyrie", "War Cleric", "Mage", "Sage", "Dark Knight", "Pegasus Knight", "Falcon Knight", "Dark Flier"],
    "Panne": ["Taguel", "Thief", "Assassin", "Trickster", "Wyvern Rider", "Wyvern Lord", "Griffon Rider"],
    "Cordelia": ["Pegasus Knight", "Falcon Knight", "Dark Flier", "Mercenary", "Hero", "Bow Knight", "Dark Mage", "Sorcerer", "Dark Knight"],
    "Nowi": ["Manakete", "Mage", "Sage", "Dark Knight", "Wyvern Rider", "Wyvern Lord", "Griffon Rider"],
    "Tharja": ["Dark Mage", "Sorcerer", "Dark Knight", "Knight", "General", "Great Knight", "Archer", "Sniper", "Bow Knight"],
    "Olivia": ["Dancer", "Myrmidon", "Swordmaster", "Assassin", "Pegasus Knight", "Falcon Knight", "Dark Flier"],
    "Cherche": ["Wyvern Rider", "Wyvern Lord", "Griffon Rider", "Troubadour", "Valkyrie", "War Cleric", "Cleric", "Sage"],

    // Children (inherit from parents, simplified here)
    "Morgan (M)": ["Tactician", "Grandmaster", "Cavalier", "Paladin", "Great Knight", "Mage", "Sage", "Dark Knight"],
    "Morgan (F)": ["Tactician", "Grandmaster", "Cavalier", "Paladin", "Great Knight", "Mage", "Sage", "Dark Knight", "Pegasus Knight", "Falcon Knight", "Dark Flier"],
    "Owain": ["Myrmidon", "Swordmaster", "Assassin", "Priest", "War Monk", "Sage", "Barbarian", "Berserker", "Warrior"],
    "Inigo": ["Mercenary", "Hero", "Bow Knight", "Myrmidon", "Swordmaster", "Assassin", "Barbarian", "Berserker", "Warrior"],
    "Brady": ["Priest", "War Monk", "Sage", "Cavalier", "Paladin", "Great Knight", "Mage", "Dark Knight"],
    "Yarne": ["Taguel", "Thief", "Assassin", "Trickster", "Barbarian", "Berserker", "Warrior"],
    "Laurent": ["Mage", "Sage", "Dark Knight", "Dark Mage", "Sorcerer", "Barbarian", "Berserker", "Warrior"],
    "Gerome": ["Wyvern Rider", "Wyvern Lord", "Griffon Rider", "Fighter", "Warrior", "Hero", "Priest", "War Monk", "Sage"],
    "Kjelle": ["Knight", "General", "Great Knight", "Cavalier", "Paladin", "Myrmidon", "Swordmaster", "Assassin"],
    "Cynthia": ["Pegasus Knight", "Falcon Knight", "Dark Flier", "Knight", "General", "Great Knight", "Cleric", "War Cleric", "Sage"],
    "Severa": ["Mercenary", "Hero", "Bow Knight", "Pegasus Knight", "Falcon Knight", "Dark Flier", "Dark Mage", "Sorcerer", "Dark Knight"],
    "Noire": ["Archer", "Sniper", "Bow Knight", "Knight", "General", "Great Knight", "Dark Mage", "Sorcerer", "Dark Knight"],
    "Nah": ["Manakete", "Mage", "Sage", "Dark Knight", "Wyvern Rider", "Wyvern Lord", "Griffon Rider"]
};

/**
 * Get all available classes for a character
 * @param {string} charName - Character name
 * @returns {string[]} - Array of class names
 */
export const getCharacterClasses = (charName) => {
    return CHARACTER_CLASS_TREES[charName] || [];
};
