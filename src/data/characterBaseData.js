/**
 * @fileoverview Complete Character Starting Data
 * Contains official Fire Emblem Awakening base stats, weapon ranks, starting inventory, and skills
 * Source: Serenes Forest, Fire Emblem Wiki
 */

export const CHARACTER_BASE_DATA = {
    // ============ MAIN STORY CHARACTERS ============

    // Chrom - Chapter 1
    "Chrom": {
        class: "Lord",
        level: 1,
        stats: { HP: 20, Str: 7, Mag: 1, Skl: 8, Spd: 8, Lck: 5, Def: 7, Res: 1 },
        weaponRanks: [{ type: "Sword", rank: "D" }],
        skills: ["Dual Strike+"],
        inventory: ["Falchion", "Rapier"]
    },

    // Lissa - Chapter 1
    "Lissa": {
        class: "Cleric",
        level: 1,
        stats: { HP: 17, Str: 1, Mag: 5, Skl: 3, Spd: 4, Lck: 8, Def: 3, Res: 4 },
        weaponRanks: [{ type: "Staff", rank: "E" }],
        skills: ["Miracle"],
        inventory: ["Heal"]
    },

    // Frederick - Chapter 1
    "Frederick": {
        class: "Great Knight",
        level: 1,
        stats: { HP: 28, Str: 13, Mag: 2, Skl: 12, Spd: 10, Lck: 6, Def: 14, Res: 3 },
        weaponRanks: [{ type: "Sword", rank: "D" }, { type: "Lance", rank: "B" }, { type: "Axe", rank: "D" }],
        skills: ["Luna", "Discipline"],
        inventory: ["Silver Lance", "Bronze Sword"]
    },

    // Sully - Chapter 1
    "Sully": {
        class: "Cavalier",
        level: 1,
        stats: { HP: 19, Str: 7, Mag: 1, Skl: 8, Spd: 8, Lck: 6, Def: 7, Res: 2 },
        weaponRanks: [{ type: "Sword", rank: "E" }, { type: "Lance", rank: "D" }],
        skills: ["Discipline"],
        inventory: ["Bronze Lance"]
    },

    // Virion - Chapter 1
    "Virion": {
        class: "Archer",
        level: 1,
        stats: { HP: 18, Str: 6, Mag: 0, Skl: 10, Spd: 5, Lck: 7, Def: 5, Res: 1 },
        weaponRanks: [{ type: "Bow", rank: "D" }],
        skills: ["Skill +2"],
        inventory: ["Iron Bow"]
    },

    // Stahl - Chapter 2
    "Stahl": {
        class: "Cavalier",
        level: 2,
        stats: { HP: 22, Str: 8, Mag: 0, Skl: 7, Spd: 6, Lck: 5, Def: 8, Res: 1 },
        weaponRanks: [{ type: "Sword", rank: "D" }, { type: "Lance", rank: "E" }],
        skills: ["Discipline"],
        inventory: ["Iron Sword"]
    },

    // Vaike - Chapter 2
    "Vaike": {
        class: "Fighter",
        level: 3,
        stats: { HP: 25, Str: 10, Mag: 0, Skl: 9, Spd: 7, Lck: 4, Def: 5, Res: 0 },
        weaponRanks: [{ type: "Axe", rank: "D" }],
        skills: ["HP +5"],
        inventory: ["Iron Axe"]
    },

    // Miriel - Chapter 2
    "Miriel": {
        class: "Mage",
        level: 2,
        stats: { HP: 18, Str: 0, Mag: 7, Skl: 5, Spd: 6, Lck: 6, Def: 3, Res: 4 },
        weaponRanks: [{ type: "Tome", rank: "D" }],
        skills: ["Magic +2"],
        inventory: ["Fire", "Thunder"]
    },

    // Sumia - Chapter 3
    "Sumia": {
        class: "Pegasus Knight",
        level: 1,
        stats: { HP: 18, Str: 6, Mag: 3, Skl: 11, Spd: 12, Lck: 9, Def: 5, Res: 7 },
        weaponRanks: [{ type: "Lance", rank: "D" }],
        skills: ["Speed +2"],
        inventory: ["Iron Lance"]
    },

    // Kellam - Chapter 3
    "Kellam": {
        class: "Knight",
        level: 5,
        stats: { HP: 21, Str: 9, Mag: 0, Skl: 6, Spd: 4, Lck: 3, Def: 13, Res: 3 },
        weaponRanks: [{ type: "Lance", rank: "D" }],
        skills: ["Defense +2"],
        inventory: ["Iron Lance", "Javelin"]
    },

    // Donnel - Paralogue 1
    "Donnel": {
        class: "Villager",
        level: 1,
        stats: { HP: 16, Str: 3, Mag: 0, Skl: 2, Spd: 3, Lck: 10, Def: 3, Res: 1 },
        weaponRanks: [{ type: "Lance", rank: "E" }],
        skills: ["Aptitude"],
        inventory: ["Bronze Lance", "Log"]
    },

    // Lon'qu - Chapter 4
    "Lon'qu": {
        class: "Myrmidon",
        level: 4,
        stats: { HP: 20, Str: 7, Mag: 0, Skl: 12, Spd: 14, Lck: 6, Def: 5, Res: 2 },
        weaponRanks: [{ type: "Sword", rank: "D" }],
        skills: ["Avoid +10"],
        inventory: ["Killing Edge"]
    },

    // Ricken - Chapter 5
    "Ricken": {
        class: "Mage",
        level: 2,
        stats: { HP: 17, Str: 1, Mag: 5, Skl: 4, Spd: 5, Lck: 8, Def: 4, Res: 3 },
        weaponRanks: [{ type: "Tome", rank: "D" }],
        skills: ["Magic +2"],
        inventory: ["Elwind"]
    },

    // Maribelle - Chapter 5
    "Maribelle": {
        class: "Troubadour",
        level: 3,
        stats: { HP: 17, Str: 1, Mag: 6, Skl: 5, Spd: 7, Lck: 8, Def: 3, Res: 7 },
        weaponRanks: [{ type: "Staff", rank: "C" }],
        skills: ["Resistance +2"],
        inventory: ["Mend", "Rescue"]
    },

    // Panne - Chapter 6
    "Panne": {
        class: "Taguel",
        level: 6,
        stats: { HP: 26, Str: 12, Mag: 0, Skl: 11, Spd: 12, Lck: 6, Def: 10, Res: 3 },
        weaponRanks: [{ type: "Beaststone", rank: "-" }],
        skills: ["Even Rhythm"],
        inventory: ["Beaststone"]
    },

    // Gaius - Chapter 6
    "Gaius": {
        class: "Thief",
        level: 5,
        stats: { HP: 21, Str: 7, Mag: 0, Skl: 12, Spd: 15, Lck: 5, Def: 4, Res: 2 },
        weaponRanks: [{ type: "Sword", rank: "D" }],
        skills: ["Locktouch"],
        inventory: ["Iron Sword", "Lockpick"]
    },

    // Cordelia - Chapter 7
    "Cordelia": {
        class: "Pegasus Knight",
        level: 7,
        stats: { HP: 21, Str: 9, Mag: 4, Skl: 13, Spd: 14, Lck: 8, Def: 8, Res: 10 },
        weaponRanks: [{ type: "Lance", rank: "C" }],
        skills: ["Speed +2"],
        inventory: ["Steel Lance", "Javelin"]
    },

    // Gregor - Chapter 8
    "Gregor": {
        class: "Mercenary",
        level: 10,
        stats: { HP: 30, Str: 13, Mag: 0, Skl: 15, Spd: 13, Lck: 10, Def: 10, Res: 2 },
        weaponRanks: [{ type: "Sword", rank: "B" }],
        skills: ["Armsthrift"],
        inventory: ["Steel Sword", "Levin Sword"]
    },

    // Nowi - Chapter 8
    "Nowi": {
        class: "Manakete",
        level: 3,
        stats: { HP: 22, Str: 6, Mag: 4, Skl: 4, Spd: 5, Lck: 10, Def: 7, Res: 5 },
        weaponRanks: [{ type: "Dragonstone", rank: "-" }],
        skills: ["Odd Rhythm"],
        inventory: ["Dragonstone"]
    },

    // Libra - Chapter 9
    "Libra": {
        class: "War Monk",
        level: 2,
        stats: { HP: 32, Str: 13, Mag: 14, Skl: 12, Spd: 12, Lck: 9, Def: 11, Res: 13 },
        weaponRanks: [{ type: "Axe", rank: "C" }, { type: "Staff", rank: "B" }],
        skills: ["Miracle", "Healtouch"],
        inventory: ["Killer Axe", "Recover"]
    },

    // Tharja - Chapter 9
    "Tharja": {
        class: "Dark Mage",
        level: 10,
        stats: { HP: 23, Str: 3, Mag: 12, Skl: 10, Spd: 12, Lck: 4, Def: 9, Res: 6 },
        weaponRanks: [{ type: "Tome", rank: "C" }],
        skills: ["Hex"],
        inventory: ["Elthunder", "Nosferatu"]
    },

    // Anna - Paralogue 4
    "Anna": {
        class: "Trickster",
        level: 5,
        stats: { HP: 30, Str: 12, Mag: 14, Skl: 18, Spd: 20, Lck: 18, Def: 9, Res: 13 },
        weaponRanks: [{ type: "Sword", rank: "C" }, { type: "Staff", rank: "C" }],
        skills: ["Locktouch", "Movement +1"],
        inventory: ["Levin Sword", "Mend"]
    },

    // Olivia - Chapter 11
    "Olivia": {
        class: "Dancer",
        level: 1,
        stats: { HP: 18, Str: 4, Mag: 3, Skl: 9, Spd: 10, Lck: 10, Def: 4, Res: 5 },
        weaponRanks: [{ type: "Sword", rank: "E" }],
        skills: ["Luck +4"],
        inventory: ["Iron Sword"]
    },

    // Cherche - Chapter 12
    "Cherche": {
        class: "Wyvern Rider",
        level: 12,
        stats: { HP: 31, Str: 16, Mag: 0, Skl: 17, Spd: 11, Lck: 10, Def: 16, Res: 2 },
        weaponRanks: [{ type: "Axe", rank: "B" }],
        skills: ["Strength +2"],
        inventory: ["Steel Axe", "Hammer"]
    },

    // Henry - Chapter 13
    "Henry": {
        class: "Dark Mage",
        level: 12,
        stats: { HP: 27, Str: 4, Mag: 14, Skl: 14, Spd: 14, Lck: 10, Def: 12, Res: 6 },
        weaponRanks: [{ type: "Tome", rank: "B" }],
        skills: ["Hex", "Anathema"],
        inventory: ["Ruin", "Nosferatu"]
    },

    // Lucina - Chapter 14
    "Lucina": {
        class: "Lord",
        level: 10,
        stats: { HP: 26, Str: 12, Mag: 5, Skl: 16, Spd: 17, Lck: 16, Def: 10, Res: 7 },
        weaponRanks: [{ type: "Sword", rank: "B" }],
        skills: ["Dual Strike+", "Charm"],
        inventory: ["Parallel Falchion"]
    },

    // Say'ri - Chapter 15
    "Say'ri": {
        class: "Swordmaster",
        level: 1,
        stats: { HP: 36, Str: 18, Mag: 5, Skl: 23, Spd: 25, Lck: 14, Def: 11, Res: 10 },
        weaponRanks: [{ type: "Sword", rank: "A" }],
        skills: ["Avoid +10", "Vantage", "Astra"],
        inventory: ["Amatsu", "Killing Edge"]
    },

    // Tiki - Paralogue 17
    "Tiki": {
        class: "Manakete",
        level: 20,
        stats: { HP: 40, Str: 18, Mag: 20, Skl: 18, Spd: 18, Lck: 22, Def: 16, Res: 16 },
        weaponRanks: [{ type: "Dragonstone", rank: "-" }],
        skills: ["Odd Rhythm", "Wyrmsbane"],
        inventory: ["Dragonstone+"]
    },

    // Basilio - Chapter 16
    "Basilio": {
        class: "Warrior",
        level: 5,
        stats: { HP: 50, Str: 25, Mag: 0, Skl: 21, Spd: 19, Lck: 11, Def: 18, Res: 4 },
        weaponRanks: [{ type: "Axe", rank: "A" }, { type: "Bow", rank: "C" }],
        skills: ["HP +5", "Zeal", "Rally Strength"],
        inventory: ["Tomahawk", "Silver Axe"]
    },

    // Flavia - Chapter 16
    "Flavia": {
        class: "Hero",
        level: 5,
        stats: { HP: 44, Str: 21, Mag: 3, Skl: 25, Spd: 24, Lck: 16, Def: 16, Res: 8 },
        weaponRanks: [{ type: "Sword", rank: "A" }, { type: "Axe", rank: "C" }],
        skills: ["Armsthrift", "Patience", "Sol"],
        inventory: ["Silver Sword", "Hand Axe"]
    },

    // ============ CHILDREN CHARACTERS ============

    // Lucina is already in main story section

    // Owain (Lissa's son)
    "Owain": {
        class: "Myrmidon",
        level: 10,
        stats: { HP: 22, Str: 9, Mag: 2, Skl: 13, Spd: 13, Lck: 10, Def: 7, Res: 4 },
        weaponRanks: [{ type: "Sword", rank: "D" }],
        skills: ["Avoid +10"],
        inventory: ["Missiletainn"]
    },

    // Inigo (Olivia's son)
    "Inigo": {
        class: "Mercenary",
        level: 10,
        stats: { HP: 24, Str: 10, Mag: 2, Skl: 12, Spd: 12, Lck: 12, Def: 8, Res: 4 },
        weaponRanks: [{ type: "Sword", rank: "D" }],
        skills: ["Armsthrift"],
        inventory: ["Steel Sword"]
    },

    // Brady (Maribelle's son)
    "Brady": {
        class: "Priest",
        level: 10,
        stats: { HP: 20, Str: 3, Mag: 10, Skl: 8, Spd: 8, Lck: 10, Def: 6, Res: 8 },
        weaponRanks: [{ type: "Staff", rank: "C" }],
        skills: ["Miracle"],
        inventory: ["Mend", "Physic"]
    },

    // Kjelle (Sully's daughter)
    "Kjelle": {
        class: "Knight",
        level: 10,
        stats: { HP: 24, Str: 12, Mag: 1, Skl: 10, Spd: 8, Lck: 8, Def: 15, Res: 4 },
        weaponRanks: [{ type: "Lance", rank: "C" }],
        skills: ["Defense +2"],
        inventory: ["Steel Lance", "Javelin"]
    },

    // Cynthia (Sumia's daughter)
    "Cynthia": {
        class: "Pegasus Knight",
        level: 10,
        stats: { HP: 21, Str: 9, Mag: 5, Skl: 13, Spd: 14, Lck: 12, Def: 8, Res: 10 },
        weaponRanks: [{ type: "Lance", rank: "C" }],
        skills: ["Speed +2"],
        inventory: ["Steel Lance", "Javelin"]
    },

    // Severa (Cordelia's daughter)
    "Severa": {
        class: "Mercenary",
        level: 10,
        stats: { HP: 23, Str: 10, Mag: 3, Skl: 13, Spd: 13, Lck: 10, Def: 8, Res: 6 },
        weaponRanks: [{ type: "Sword", rank: "D" }],
        skills: ["Armsthrift"],
        inventory: ["Steel Sword"]
    },

    // Gerome (Cherche's son)
    "Gerome": {
        class: "Wyvern Rider",
        level: 10,
        stats: { HP: 27, Str: 14, Mag: 0, Skl: 13, Spd: 10, Lck: 8, Def: 14, Res: 2 },
        weaponRanks: [{ type: "Axe", rank: "C" }],
        skills: ["Strength +2"],
        inventory: ["Steel Axe", "Hand Axe"]
    },

    // Morgan (M) - Robin (F)'s son
    "Morgan (M)": {
        class: "Tactician",
        level: 10,
        stats: { HP: 22, Str: 8, Mag: 10, Skl: 10, Spd: 10, Lck: 12, Def: 7, Res: 6 },
        weaponRanks: [{ type: "Sword", rank: "D" }, { type: "Tome", rank: "D" }],
        skills: ["Veteran"],
        inventory: ["Steel Sword", "Elfire"]
    },

    // Morgan (F) - Robin (M)'s daughter
    "Morgan (F)": {
        class: "Tactician",
        level: 10,
        stats: { HP: 22, Str: 8, Mag: 10, Skl: 10, Spd: 10, Lck: 12, Def: 7, Res: 6 },
        weaponRanks: [{ type: "Sword", rank: "D" }, { type: "Tome", rank: "D" }],
        skills: ["Veteran"],
        inventory: ["Steel Sword", "Elfire"]
    },

    // Yarne (Panne's son)
    "Yarne": {
        class: "Taguel",
        level: 10,
        stats: { HP: 28, Str: 13, Mag: 0, Skl: 12, Spd: 13, Lck: 10, Def: 11, Res: 4 },
        weaponRanks: [{ type: "Beaststone", rank: "-" }],
        skills: ["Even Rhythm"],
        inventory: ["Beaststone"]
    },

    // Laurent (Miriel's son)
    "Laurent": {
        class: "Mage",
        level: 10,
        stats: { HP: 22, Str: 2, Mag: 12, Skl: 10, Spd: 9, Lck: 10, Def: 7, Res: 8 },
        weaponRanks: [{ type: "Tome", rank: "C" }],
        skills: ["Magic +2"],
        inventory: ["Elfire", "Elwind"]
    },

    // Noire (Tharja's daughter)
    "Noire": {
        class: "Archer",
        level: 10,
        stats: { HP: 22, Str: 10, Mag: 4, Skl: 13, Spd: 11, Lck: 8, Def: 8, Res: 5 },
        weaponRanks: [{ type: "Bow", rank: "C" }],
        skills: ["Skill +2"],
        inventory: ["Steel Bow", "Longbow"]
    },

    // Nah (Nowi's daughter)
    "Nah": {
        class: "Manakete",
        level: 10,
        stats: { HP: 25, Str: 8, Mag: 8, Skl: 8, Spd: 8, Lck: 12, Def: 10, Res: 8 },
        weaponRanks: [{ type: "Dragonstone", rank: "-" }],
        skills: ["Odd Rhythm"],
        inventory: ["Dragonstone"]
    },

    // ============ AVATARS (Default) ============

    "Robin (M)": {
        class: "Tactician",
        level: 1,
        stats: { HP: 19, Str: 6, Mag: 5, Skl: 6, Spd: 6, Lck: 4, Def: 6, Res: 4 },
        weaponRanks: [{ type: "Sword", rank: "E" }, { type: "Tome", rank: "D" }],
        skills: ["Veteran"],
        inventory: ["Bronze Sword", "Thunder"]
    },

    "Robin (F)": {
        class: "Tactician",
        level: 1,
        stats: { HP: 19, Str: 6, Mag: 5, Skl: 6, Spd: 6, Lck: 4, Def: 6, Res: 4 },
        weaponRanks: [{ type: "Sword", rank: "E" }, { type: "Tome", rank: "D" }],
        skills: ["Veteran"],
        inventory: ["Bronze Sword", "Thunder"]
    },

    // ============ SPOTPASS CHARACTERS ============

    "Gangrel": {
        class: "Trickster",
        level: 5,
        stats: { HP: 38, Str: 15, Mag: 18, Skl: 22, Spd: 24, Lck: 12, Def: 13, Res: 16 },
        weaponRanks: [{ type: "Sword", rank: "B" }, { type: "Staff", rank: "C" }],
        skills: ["Locktouch", "Movement +1", "Lucky Seven"],
        inventory: ["Levin Sword", "Heal"]
    },

    "Walhart": {
        class: "Conqueror",
        level: 20,
        stats: { HP: 60, Str: 30, Mag: 5, Skl: 28, Spd: 22, Lck: 15, Def: 28, Res: 10 },
        weaponRanks: [{ type: "Sword", rank: "A" }, { type: "Lance", rank: "A" }, { type: "Axe", rank: "A" }],
        skills: ["Conquest"],
        inventory: ["Wolf Berg"]
    },

    "Emmeryn": {
        class: "Sage",
        level: 5,
        stats: { HP: 40, Str: 5, Mag: 28, Skl: 22, Spd: 24, Lck: 30, Def: 12, Res: 28 },
        weaponRanks: [{ type: "Tome", rank: "A" }, { type: "Staff", rank: "A" }],
        skills: ["Miracle", "Healtouch", "Rally Magic"],
        inventory: ["Arcfire", "Recover"]
    },

    "Yen'fay": {
        class: "Swordmaster",
        level: 5,
        stats: { HP: 48, Str: 24, Mag: 8, Skl: 30, Spd: 30, Lck: 18, Def: 18, Res: 14 },
        weaponRanks: [{ type: "Sword", rank: "A" }],
        skills: ["Avoid +10", "Vantage", "Astra"],
        inventory: ["Amatsu", "Killing Edge"]
    },

    "Aversa": {
        class: "Dark Flier",
        level: 5,
        stats: { HP: 44, Str: 12, Mag: 28, Skl: 22, Spd: 28, Lck: 18, Def: 16, Res: 22 },
        weaponRanks: [{ type: "Tome", rank: "A" }, { type: "Lance", rank: "C" }],
        skills: ["Speed +2", "Relief", "Rally Movement", "Galeforce"],
        inventory: ["Goetia", "Silver Lance"]
    },

    "Priam": {
        class: "Hero",
        level: 15,
        stats: { HP: 60, Str: 32, Mag: 5, Skl: 34, Spd: 32, Lck: 25, Def: 26, Res: 14 },
        weaponRanks: [{ type: "Sword", rank: "A" }, { type: "Axe", rank: "B" }],
        skills: ["Armsthrift", "Patience", "Sol", "Axebreaker"],
        inventory: ["Ragnell", "Silver Axe"]
    }
};

/**
 * Get complete starting data for a character by name
 * @param {string} name - Character name
 * @returns {Object|null} - Character base data or null if not found
 */
export const getCharacterBaseData = (name) => {
    return CHARACTER_BASE_DATA[name] || null;
};

/**
 * Get default weapon ranks for a character
 * Falls back to class weapons if character not in database
 * @param {string} name - Character name
 * @param {string} className - Character's class name
 * @param {Array} CLASSES - CLASSES data from wikiData
 * @returns {Array} - Weapon ranks array
 */
export const getDefaultWeaponRanks = (name, className, CLASSES) => {
    const charData = CHARACTER_BASE_DATA[name];
    if (charData && charData.weaponRanks) {
        return charData.weaponRanks;
    }

    // Fallback to class-based weapons
    const classData = CLASSES?.find(c => c.name === className);
    if (classData && classData.weapons) {
        return classData.weapons.map(w => ({ type: w, rank: 'E' }));
    }

    return [{ type: '', rank: '-' }, { type: '', rank: '-' }];
};
