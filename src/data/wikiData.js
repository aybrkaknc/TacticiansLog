/**
 * @fileoverview Wiki Data - Fire Emblem Awakening
 * Central data source (used by Wiki UI and AI Service)
 */

export const CLASSES = [
    // Lord Line
    { name: "Lord", type: "base", category: "Lord", weapons: ["Sword"], skills: [{ name: "Dual Strike+", lv: 1 }, { name: "Charm", lv: 10 }], desc: "Starting class for Chrom & Lucina. Can use Rapiers.", promotes: ["Great Lord"] },
    { name: "Great Lord", type: "promoted", category: "Lord", weapons: ["Sword", "Lance"], skills: [{ name: "Aether", lv: 5 }, { name: "Rightful King", lv: 15 }], desc: "Aether is S Tier! Rightful King increases all skill activation rates by +10%.", highlight: true },

    // Tactician Line
    { name: "Tactician", type: "base", category: "Tactician", weapons: ["Sword", "Tome"], skills: [{ name: "Veteran", lv: 1 }, { name: "Solidarity", lv: 10 }], desc: "Robin's special class. Uses both physical and magic.", promotes: ["Grandmaster"] },
    { name: "Grandmaster", type: "promoted", category: "Tactician", weapons: ["Sword", "Tome"], skills: [{ name: "Ignis", lv: 5 }, { name: "Rally Spectrum", lv: 15 }], desc: "Rally Spectrum increases all stats by +4. Ignis deals (Str+Mag)/2 bonus damage.", highlight: true },

    // Cavalier Line
    { name: "Cavalier", type: "base", category: "Cavalier", weapons: ["Sword", "Lance"], skills: [{ name: "Discipline", lv: 1 }, { name: "Outdoor Fighter", lv: 10 }], desc: "Mounted unit. +10 Hit/Avo outdoors.", promotes: ["Paladin", "Great Knight"] },
    { name: "Paladin", type: "promoted", category: "Cavalier", weapons: ["Sword", "Lance"], skills: [{ name: "Defender", lv: 5 }, { name: "Aegis", lv: 15 }], desc: "Balanced cavalry. Aegis halves ranged damage with Skill% chance." },
    { name: "Great Knight", type: "promoted", category: "Cavalier", weapons: ["Sword", "Lance", "Axe"], skills: [{ name: "Luna", lv: 5 }, { name: "Dual Guard+", lv: 15 }], desc: "3 weapons! Luna halves enemy Def with Skill% chance.", highlight: true },

    // Knight Line
    { name: "Knight", type: "base", category: "Knight", weapons: ["Lance"], skills: [{ name: "Defense +2", lv: 1 }, { name: "Indoor Fighter", lv: 10 }], desc: "Heavily armored tank. +10 Hit/Avo indoors.", promotes: ["General", "Great Knight"] },
    { name: "General", type: "promoted", category: "Knight", weapons: ["Lance", "Axe"], skills: [{ name: "Rally Defense", lv: 5 }, { name: "Pavise", lv: 15 }], desc: "Pavise halves melee damage with Skill% chance. Rally Def +4.", highlight: true },

    // Myrmidon Line
    { name: "Myrmidon", type: "base", category: "Myrmidon", weapons: ["Sword"], skills: [{ name: "Avoid +10", lv: 1 }, { name: "Vantage", lv: 10 }], desc: "Fast swordmaster. Vantage allows attacking first when HP < 50%.", promotes: ["Swordmaster", "Assassin"] },
    { name: "Swordmaster", type: "promoted", category: "Myrmidon", weapons: ["Sword"], skills: [{ name: "Astra", lv: 5 }, { name: "Swordfaire", lv: 15 }], desc: "Astra gives 5 consecutive attacks. Crit +15.", highlight: true },

    // Thief Line
    { name: "Thief", type: "base", category: "Thief", weapons: ["Sword"], skills: [{ name: "Locktouch", lv: 1 }, { name: "Movement +1", lv: 10 }], desc: "Opens locks. Mov+1 is very valuable!", promotes: ["Assassin", "Trickster"] },
    { name: "Assassin", type: "promoted", category: "Thief", weapons: ["Sword", "Bow"], skills: [{ name: "Lethality", lv: 5 }, { name: "Pass", lv: 15 }], desc: "Lethality gives Skill/4% instant kill! Pass allows moving through enemies." },
    { name: "Trickster", type: "promoted", category: "Thief", weapons: ["Sword", "Staff"], skills: [{ name: "Lucky Seven", lv: 5 }, { name: "Acrobat", lv: 15 }], desc: "Can use Staves. Lucky Seven gives +20 Hit/Avo for the first 7 turns." },

    // Mercenary Line
    { name: "Mercenary", type: "base", category: "Mercenary", weapons: ["Sword"], skills: [{ name: "Armsthrift", lv: 1 }, { name: "Patience", lv: 10 }], desc: "Armsthrift is S TIER! Luck x2% chance to not consume weapon durability.", promotes: ["Hero", "Bow Knight"], highlight: true },
    { name: "Hero", type: "promoted", category: "Mercenary", weapons: ["Sword", "Axe"], skills: [{ name: "Sol", lv: 5 }, { name: "Axebreaker", lv: 15 }], desc: "Sol recovers half of damage dealt as HP with Skill% chance.", highlight: true },
    { name: "Bow Knight", type: "promoted", category: "Mercenary", weapons: ["Sword", "Bow"], skills: [{ name: "Rally Skill", lv: 5 }, { name: "Bowbreaker", lv: 15 }], desc: "Mounted archer. Rally Skill +4. Bowbreaker gives +50 Hit/Avo against bows." },

    // Fighter Line
    { name: "Fighter", type: "base", category: "Fighter", weapons: ["Axe"], skills: [{ name: "HP +5", lv: 1 }, { name: "Zeal", lv: 10 }], desc: "Strong axe user. Zeal +5 Crit.", promotes: ["Warrior", "Hero"] },
    { name: "Warrior", type: "promoted", category: "Fighter", weapons: ["Axe", "Bow"], skills: [{ name: "Rally Strength", lv: 5 }, { name: "Counter", lv: 15 }], desc: "Counter reflects damage back to the melee attacker!", highlight: true },

    // Barbarian Line
    { name: "Barbarian", type: "base", category: "Barbarian", weapons: ["Axe"], skills: [{ name: "Despoil", lv: 1 }, { name: "Gamble", lv: 10 }], desc: "Wild axe user. Despoil gives gold on kill. Gamble +10 Crit/-10 Hit.", promotes: ["Berserker", "Warrior"] },
    { name: "Berserker", type: "promoted", category: "Barbarian", weapons: ["Axe"], skills: [{ name: "Wrath", lv: 5 }, { name: "Axefaire", lv: 15 }], desc: "Wrath gives +20 Crit when HP < 50%. Axefaire +5 Atk. Can walk on water!", highlight: true },

    // Archer Line
    { name: "Archer", type: "base", category: "Archer", weapons: ["Bow"], skills: [{ name: "Skill +2", lv: 1 }, { name: "Prescience", lv: 10 }], desc: "Long range archer. Prescience +10 Hit/Avo when attacking.", promotes: ["Sniper", "Bow Knight"] },
    { name: "Sniper", type: "promoted", category: "Archer", weapons: ["Bow"], skills: [{ name: "Hit Rate +20", lv: 5 }, { name: "Bowfaire", lv: 15 }], desc: "Longbow has 3 range! Bowfaire +5 Atk.", highlight: true },

    // Mage Line
    { name: "Mage", type: "base", category: "Mage", weapons: ["Tome"], skills: [{ name: "Magic +2", lv: 1 }, { name: "Focus", lv: 10 }], desc: "Anima mage. Focus +10 Crit when alone.", promotes: ["Sage", "Dark Knight"] },
    { name: "Sage", type: "promoted", category: "Mage", weapons: ["Tome", "Staff"], skills: [{ name: "Rally Magic", lv: 5 }, { name: "Tomefaire", lv: 15 }], desc: "Staff + Tome. Tomefaire +5 Atk.", highlight: true },
    { name: "Dark Knight", type: "promoted", category: "Mage", weapons: ["Sword", "Tome"], skills: [{ name: "Slow Burn", lv: 5 }, { name: "Lifetaker", lv: 15 }], desc: "Mounted mage. Lifetaker recovers 50% Max HP on kill." },

    // Dark Mage Line
    { name: "Dark Mage", type: "base", category: "Dark Mage", weapons: ["Tome"], skills: [{ name: "Hex", lv: 1 }, { name: "Anathema", lv: 10 }], desc: "Dark tome specialist. Hex/Anathema reduces enemy evasion.", promotes: ["Sorcerer", "Dark Knight"] },
    { name: "Sorcerer", type: "promoted", category: "Dark Mage", weapons: ["Tome"], skills: [{ name: "Vengeance", lv: 5 }, { name: "Tomebreaker", lv: 15 }], desc: "Vengeance deals (MaxHP-CurHP)/2 bonus damage. Nosferatu tank!", highlight: true },

    // Cleric/Priest Line
    { name: "Cleric", type: "base", category: "Healer (F)", weapons: ["Staff"], skills: [{ name: "Miracle", lv: 1 }, { name: "Healtouch", lv: 10 }], desc: "Female healer. Miracle escapes death with Luck% chance.", promotes: ["War Cleric", "Sage"] },
    { name: "Priest", type: "base", category: "Healer (M)", weapons: ["Staff"], skills: [{ name: "Miracle", lv: 1 }, { name: "Healtouch", lv: 10 }], desc: "Male healer. Healtouch +5 HP healing.", promotes: ["War Monk", "Sage"] },
    { name: "War Cleric", type: "promoted", category: "Healer (F)", weapons: ["Axe", "Staff"], skills: [{ name: "Rally Luck", lv: 5 }, { name: "Renewal", lv: 15 }], desc: "Renewal heals 30% Max HP at the start of each turn." },
    { name: "War Monk", type: "promoted", category: "Healer (M)", weapons: ["Axe", "Staff"], skills: [{ name: "Rally Luck", lv: 5 }, { name: "Renewal", lv: 15 }], desc: "Renewal heals 30% Max HP at the start of each turn.", highlight: true },

    // Troubadour Line
    { name: "Troubadour", type: "base", category: "Mounted Healer", weapons: ["Staff"], skills: [{ name: "Resistance +2", lv: 1 }, { name: "Demoiselle", lv: 10 }], desc: "Mounted healer. Demoiselle gives +10 Avo to nearby males.", promotes: ["Valkyrie", "War Cleric"] },
    { name: "Valkyrie", type: "promoted", category: "Mounted Healer", weapons: ["Tome", "Staff"], skills: [{ name: "Rally Resistance", lv: 5 }, { name: "Dual Support+", lv: 15 }], desc: "Mounted mage+healer. Dual Support+ bonus increases.", highlight: true },

    // Pegasus Knight Line
    { name: "Pegasus Knight", type: "base", category: "Pegasus", weapons: ["Lance"], skills: [{ name: "Speed +2", lv: 1 }, { name: "Relief", lv: 10 }], desc: "Flying lance user. Relief heals HP if no enemies are nearby. Weak to arrows!", promotes: ["Falcon Knight", "Dark Flier"] },
    { name: "Falcon Knight", type: "promoted", category: "Pegasus", weapons: ["Lance", "Staff"], skills: [{ name: "Rally Speed", lv: 5 }, { name: "Lancefaire", lv: 15 }], desc: "Flying healer. Lancefaire +5 Atk." },
    { name: "Dark Flier", type: "promoted", category: "Pegasus", weapons: ["Lance", "Tome"], skills: [{ name: "Rally Movement", lv: 5 }, { name: "Galeforce", lv: 15 }], desc: "GALEFORCE IS THE BEST SKILL IN THE GAME! Move again after a kill.", legendary: true, highlight: true },

    // Wyvern Rider Line
    { name: "Wyvern Rider", type: "base", category: "Wyvern", weapons: ["Axe"], skills: [{ name: "Strength +2", lv: 1 }, { name: "Tantivy", lv: 10 }], desc: "Dragon rider. Tantivy gives +10 Hit/Avo when alone. Weak to arrows!", promotes: ["Wyvern Lord", "Griffon Rider"] },
    { name: "Wyvern Lord", type: "promoted", category: "Wyvern", weapons: ["Lance", "Axe"], skills: [{ name: "Quick Burn", lv: 5 }, { name: "Swordbreaker", lv: 15 }], desc: "Strong flying tank. Quick Burn gives bonus in early turns.", highlight: true },
    { name: "Griffon Rider", type: "promoted", category: "Wyvern", weapons: ["Axe"], skills: [{ name: "Deliverer", lv: 5 }, { name: "Lancebreaker", lv: 15 }], desc: "Deliverer gives +2 Mov to the lead unit in a Pair Up!" },

    // Special Classes
    { name: "Villager", type: "special", category: "Special", weapons: ["Lance"], skills: [{ name: "Aptitude", lv: 1 }, { name: "Underdog", lv: 15 }], desc: "Donnel. Aptitude +20% TO ALL GROWTHS!", note: "Reclass to Mercenary/Fighter with Second Seal.", highlight: true },
    { name: "Dancer", type: "special", category: "Special", weapons: ["Sword"], skills: [{ name: "Luck +4", lv: 1 }, { name: "Special Dance", lv: 15 }], desc: "Olivia. Use Dance to make another unit move again!", note: "Cannot promote." },
    { name: "Taguel", type: "special", category: "Special", weapons: ["Beaststone"], skills: [{ name: "Even Rhythm", lv: 1 }, { name: "Beastbane", lv: 15 }], desc: "Panne/Yarne. Transforms with Beaststone. Beastbane is effective against cavalry." },
    { name: "Manakete", type: "special", category: "Special", weapons: ["Dragonstone"], skills: [{ name: "Odd Rhythm", lv: 1 }, { name: "Wyrmsbane", lv: 15 }], desc: "Nowi/Nah/Tiki. Dragonstone is very powerful! Wyrmsbane is effective against dragons." },
    { name: "Lodestar", type: "special", category: "Special", weapons: ["Sword"], skills: [{ name: "Charm", lv: 1 }, { name: "Dancing Blade", lv: 15 }], desc: "Marth DLC class. Can use Ragnell." },
    { name: "Conqueror", type: "special", category: "Special", weapons: ["Sword", "Lance"], skills: [{ name: "Conquest", lv: 1 }, { name: "Aegis+", lv: 15 }], desc: "Walhart DLC class. Strong cavalry." },

    // DLC Classes
    { name: "Dread Fighter", type: "dlc", category: "DLC", weapons: ["Sword", "Axe", "Tome"], skills: [{ name: "Resistance +10", lv: 1 }, { name: "Aggressor", lv: 15 }], desc: "DLC. 3 weapons! Aggressor gives +10 Atk when attacking." },
    { name: "Bride", type: "dlc", category: "DLC", weapons: ["Lance", "Bow", "Staff"], skills: [{ name: "Rally Heart", lv: 1 }, { name: "Bond", lv: 15 }], desc: "DLC. Females only. Rally Heart gives +2 all stats." }
];

export const SKILLS = [
    // S Tier
    { name: "Galeforce", tier: "S", class: "Dark Flier", lv: 15, desc: "Can move again after defeating an enemy. THE BEST SKILL!" },
    { name: "Armsthrift", tier: "S", class: "Mercenary", lv: 1, desc: "Luck x2% chance to not consume weapon durability. Luck 50 = 100% protection!" },
    { name: "Aether", tier: "S", class: "Great Lord", lv: 5, desc: "Sol + Luna in succession. Skill% activation." },
    { name: "Rightful King", tier: "S", class: "Great Lord", lv: 15, desc: "Increases all skill activation rates by +10%." },
    { name: "Limit Breaker", tier: "S", class: "DLC", lv: 0, desc: "Increases all stat caps by +10. Requires DLC." },
    { name: "Aptitude", tier: "S", class: "Villager", lv: 1, desc: "Increases all stat growth rates by +20%." },

    // A Tier - Triggers
    { name: "Sol", tier: "A", class: "Hero", lv: 5, desc: "Skill% chance to recover half of damage dealt as HP." },
    { name: "Luna", tier: "A", class: "Great Knight", lv: 5, desc: "Skill% chance to ignore half of enemy defense." },
    { name: "Ignis", tier: "A", class: "Grandmaster", lv: 5, desc: "Skill% chance to deal (Str+Mag)/2 bonus damage." },
    { name: "Vengeance", tier: "A", class: "Sorcerer", lv: 5, desc: "Skill% chance to deal (MaxHP-CurrentHP)/2 bonus damage." },
    { name: "Astra", tier: "A", class: "Swordmaster", lv: 5, desc: "Skill/2% chance to deal 5 consecutive half-power attacks." },
    { name: "Lethality", tier: "A", class: "Assassin", lv: 5, desc: "Skill/4% chance for an instant kill." },
    { name: "Pavise", tier: "A", class: "General", lv: 15, desc: "Skill% chance to halve melee attack damage." },
    { name: "Aegis", tier: "A", class: "Paladin", lv: 15, desc: "Skill% chance to halve ranged attack damage." },
    { name: "Miracle", tier: "A", class: "Cleric", lv: 1, desc: "Luck% chance to survive a lethal blow with 1 HP." },
    { name: "Counter", tier: "A", class: "Warrior", lv: 15, desc: "Reflect damage back after a melee attack." },
    { name: "Vantage", tier: "A", class: "Myrmidon", lv: 10, desc: "Attack first if HP < 50%." },

    // B Tier - Faires & Buffs
    { name: "Tomefaire", tier: "B", class: "Sage", lv: 15, desc: "+5 damage with Tomes." },
    { name: "Swordfaire", tier: "B", class: "Swordmaster", lv: 15, desc: "+5 damage with Swords." },
    { name: "Lancefaire", tier: "B", class: "Falcon Knight", lv: 15, desc: "+5 damage with Lances." },
    { name: "Axefaire", tier: "B", class: "Berserker", lv: 15, desc: "+5 damage with Axes." },
    { name: "Bowfaire", tier: "B", class: "Sniper", lv: 15, desc: "+5 damage with Bows." },
    { name: "Lifetaker", tier: "B", class: "Dark Knight", lv: 15, desc: "Heal 50% of Max HP after defeating an enemy." },
    { name: "Renewal", tier: "B", class: "War Monk/Cleric", lv: 15, desc: "Heal 30% of Max HP at the start of each turn." },
    { name: "Rally Spectrum", tier: "B", class: "Grandmaster", lv: 15, desc: "Rally: +4 to all stats for nearby allies." },
    { name: "Wrath", tier: "B", class: "Berserker", lv: 5, desc: "+20 Crit when HP < 50%." },

    // C Tier - Utility
    { name: "Rally Strength", tier: "C", class: "Warrior", lv: 5, desc: "Rally: +4 Str." },
    { name: "Rally Magic", tier: "C", class: "Sage", lv: 5, desc: "Rally: +4 Mag." },
    { name: "Rally Skill", tier: "C", class: "Bow Knight", lv: 5, desc: "Rally: +4 Skill." },
    { name: "Rally Speed", tier: "C", class: "Falcon Knight", lv: 5, desc: "Rally: +4 Spd." },
    { name: "Rally Defense", tier: "C", class: "General", lv: 5, desc: "Rally: +4 Def." },
    { name: "Rally Resistance", tier: "C", class: "Valkyrie", lv: 5, desc: "Rally: +4 Res." },
    { name: "Rally Luck", tier: "C", class: "War Monk/Cleric", lv: 5, desc: "Rally: +8 Luck." },
    { name: "Rally Movement", tier: "C", class: "Dark Flier", lv: 5, desc: "Rally: +1 Mov." },
    { name: "Movement +1", tier: "C", class: "Thief", lv: 10, desc: "Movement +1." },
    { name: "Pass", tier: "C", class: "Assassin", lv: 15, desc: "Move through spaces occupied by enemy units." },
    { name: "Deliverer", tier: "C", class: "Griffon Rider", lv: 5, desc: "+2 Mov to the lead unit in a Pair Up." },
    { name: "Acrobat", tier: "C", class: "Trickster", lv: 15, desc: "All traversable terrain costs 1 movement." },
    { name: "Hit Rate +20", tier: "C", class: "Sniper", lv: 5, desc: "Hit Rate +20." },
    { name: "Dual Support+", tier: "C", class: "Valkyrie", lv: 15, desc: "Increases Pair Up support bonuses." },
    { name: "Dual Guard+", tier: "C", class: "Great Knight", lv: 15, desc: "Increases Dual Guard activation chance." }
];

export const WEAPONS = [
    // Swords
    { name: "Falchion", type: "Sword", mt: 14, hit: 95, crit: 5, rng: "1", desc: "Chrom/Lucina exclusive. Deals 3x damage to dragons. Infinite uses." },
    { name: "Parallel Falchion", type: "Sword", mt: 14, hit: 95, crit: 5, rng: "1", desc: "Lucina exclusive. Heals HP to full when used." },
    { name: "Ragnell", type: "Sword", mt: 18, hit: 80, crit: 5, rng: "1-2", desc: "Ike/Priam exclusive. Ranged sword!" },
    { name: "Sol Katti", type: "Sword", mt: 12, hit: 95, crit: 25, rng: "1", desc: "Lyn exclusive. High critical. Swordmaster only." },
    { name: "Amatsu", type: "Sword", mt: 12, hit: 80, crit: 10, rng: "1-2", desc: "Say'ri exclusive. Ranged sword." },
    { name: "Noble Rapier", type: "Sword", mt: 7, hit: 95, crit: 5, rng: "1", desc: "Lord exclusive. 3x damage against cavalry/armored." },
    { name: "Killing Edge", type: "Sword", mt: 9, hit: 85, crit: 30, rng: "1", desc: "High critical rate." },
    { name: "Brave Sword", type: "Sword", mt: 9, hit: 75, crit: 0, rng: "1", desc: "Strikes twice per attack. -5 Spd." },
    { name: "Levin Sword", type: "Sword", mt: 11, hit: 80, crit: 5, rng: "1-2", desc: "Magic-based ranged sword." },
    { name: "Wyrmslayer", type: "Sword", mt: 8, hit: 75, crit: 0, rng: "1", desc: "3x damage against dragons." },
    { name: "Armorslayer", type: "Sword", mt: 8, hit: 85, crit: 0, rng: "1", desc: "3x damage against armored units." },

    // Lances
    { name: "Gradivus", type: "Lance", mt: 15, hit: 85, crit: 0, rng: "1-2", desc: "Legendary regalia lance. Heals HP when used." },
    { name: "Killer Lance", type: "Lance", mt: 10, hit: 75, crit: 30, rng: "1", desc: "High critical rate." },
    { name: "Brave Lance", type: "Lance", mt: 10, hit: 70, crit: 0, rng: "1", desc: "Strikes twice per attack." },
    { name: "Javelin", type: "Lance", mt: 6, hit: 65, crit: 0, rng: "1-2", desc: "Ranged lance. Low power." },
    { name: "Short Spear", type: "Lance", mt: 9, hit: 70, crit: 0, rng: "1-2", desc: "Stronger ranged lance." },
    { name: "Beast Killer", type: "Lance", mt: 10, hit: 70, crit: 0, rng: "1", desc: "3x damage against cavalry/pegasi/taguel." },

    // Axes
    { name: "Helswath", type: "Axe", mt: 20, hit: 75, crit: 0, rng: "1", desc: "Legendary regalia axe. Extremely powerful!" },
    { name: "Killer Axe", type: "Axe", mt: 11, hit: 65, crit: 30, rng: "1", desc: "High critical rate." },
    { name: "Brave Axe", type: "Axe", mt: 11, hit: 60, crit: 0, rng: "1", desc: "Strikes twice per attack." },
    { name: "Hammer", type: "Axe", mt: 10, hit: 55, crit: 0, rng: "1", desc: "3x damage against armored units." },
    { name: "Hand Axe", type: "Axe", mt: 7, hit: 60, crit: 0, rng: "1-2", desc: "Ranged axe." },
    { name: "Tomahawk", type: "Axe", mt: 13, hit: 65, crit: 0, rng: "1-2", desc: "Stronger ranged axe." },

    // Bows
    { name: "Longbow", type: "Bow", mt: 5, hit: 65, crit: 0, rng: "2-3", desc: "3 range! Sniper exclusive." },
    { name: "Killer Bow", type: "Bow", mt: 9, hit: 75, crit: 30, rng: "2", desc: "High critical rate." },
    { name: "Brave Bow", type: "Bow", mt: 8, hit: 70, crit: 0, rng: "2", desc: "Strikes twice per attack." },
    { name: "Double Bow", type: "Bow", mt: 8, hit: 80, crit: 0, rng: "2-3", desc: "Versatile ranged bow." },

    // Tomes
    { name: "Book of Naga", type: "Tome", mt: 17, hit: 95, crit: 5, rng: "1-2", desc: "Most powerful light tome. Effective against dragons." },
    { name: "Valflame", type: "Tome", mt: 15, hit: 85, crit: 5, rng: "1-2", desc: "Legendary fire tome." },
    { name: "Forseti", type: "Tome", mt: 14, hit: 95, crit: 0, rng: "1-2", desc: "Legendary wind tome. +5 Spd." },
    { name: "Mjölnir", type: "Tome", mt: 13, hit: 75, crit: 10, rng: "1-2", desc: "Powerful thunder tome." },
    { name: "Nosferatu", type: "Tome", mt: 7, hit: 80, crit: 0, rng: "1-2", desc: "Recover half of damage dealt as HP! Sorcerer favorite." },
    { name: "Aversa's Night", type: "Tome", mt: 12, hit: 70, crit: 10, rng: "1-2", desc: "Stronger Nosferatu. Aversa exclusive." },
    { name: "Goetia", type: "Tome", mt: 18, hit: 80, crit: 0, rng: "1-2", desc: "The most powerful dark tome." },
    { name: "Ruin", type: "Tome", mt: 4, hit: 95, crit: 20, rng: "1-2", desc: "High critical dark tome." }
];

export const MECHANICS = [
    { name: "Pair Up", desc: "Combine two units for various combat advantages.", tips: ["Rear unit gives stat bonuses (based on support rank)", "Dual Strike: Rear unit attacks with 50% power", "Dual Guard: Chance to negate damage", "Place defensive units in the rear and DPS units in front"] },
    { name: "Support Bonus", desc: "Support bonuses strengthen as support ranks increase.", tips: ["C rank: +1 bonus", "B rank: +2 bonus", "A rank: +3 bonus", "S rank: +4 bonus (marriage)"] },
    { name: "Marriage", desc: "S rank support = marriage.", tips: ["Only available between first-generation characters", "Robin can marry anyone", "Marriage unlocks paralogues (second-generation children)"] },
    { name: "Second-Generation Characters", desc: "Inherit skills and stats from parents.", tips: ["Male children: Inherit the father's last equipped skill slot", "Female children: Inherit the mother's last skill", "Stats are influenced by parent growth rates", "Inheriting Galeforce from the mother is ideal!"] },
    { name: "Reclassing", desc: "Change classes with a Second Seal to learn different skills.", tips: ["Second Seal: Requires Lv 10+ base OR any promoted class", "Each character has access to 2-3 different class trees", "Reclassing allows collecting all accessible skills", "Aptitude + Second Seal = powerhouse character"] },
    { name: "Promotion", desc: "Move from a base class to a promoted class using a Master Seal.", tips: ["Master Seal: Requires Lv 10+ base class", "Promoted classes are stronger and teach new skills", "Consider the trade-off between early and late promotion"] },
    { name: "Weapon Triangle", desc: "Sword > Axe > Lance > Sword cycle.", tips: ["Advantage: +15 Hit, +1 Dmg", "Disadvantage: -15 Hit, -1 Dmg", "Breaker skills (e.g., Swordbreaker) can reverse triangle effects", "Tomes are outside the triangle in Awakening"] },
    { name: "Stat Caps", desc: "Each class has maximum stat limits.", tips: ["Promoted classes have higher caps", "Limit Breaker (DLC) adds +10 to all caps", "Sorcerer: 45 Mag cap - highest", "Assassin: 48 Spd cap - highest"] }
];

export const CHARACTERS = [
    { name: "Chrom", join: "Prolog", class: "Lord", desc: "Main character, Prince of Ylisse. Lucina's father." },
    { name: "Robin (Avatar)", join: "Prolog", class: "Tactician", desc: "Player's avatar. Can reclass to almost any class!" },
    { name: "Frederick", join: "Prolog", class: "Great Knight", desc: "Chrom's lieutenant. Very strong in the early game." },
    { name: "Lissa", join: "Prolog", class: "Cleric", desc: "Chrom's younger sister. Owain's mother." },
    { name: "Sully", join: "Ch 1", class: "Cavalier", desc: "Female knight. Consider promoting to Paladin." },
    { name: "Virion", join: "Ch 1", class: "Archer", desc: "Duke of Rosanne. Flashy archer." },
    { name: "Stahl", join: "Ch 1", class: "Cavalier", desc: "Average knight. Balanced stats." },
    { name: "Vaike", join: "Ch 2", class: "Fighter", desc: "Self-proclaimed 'Teach'. High Strength." },
    { name: "Miriel", join: "Ch 2", class: "Mage", desc: "Scholar-mage. High Magic." },
    { name: "Sumia", join: "Ch 3", class: "Pegasus Knight", desc: "Clumsy pegasus rider. Can marry Chrom." },
    { name: "Kellam", join: "Ch 3", class: "Knight", desc: "Invisible armored knight. High Defense." },
    { name: "Donnel", join: "Ch 4 (Paralogue)", class: "Villager", desc: "Farm boy. S-TIER potential with Aptitude!", highlight: true },
    { name: "Lon'qu", join: "Ch 4", class: "Myrmidon", desc: "Gynophobic swordmaster. High Speed/Skill." },
    { name: "Ricken", join: "Ch 5", class: "Mage", desc: "Young mage. Joins early." },
    { name: "Maribelle", join: "Ch 5", class: "Troubadour", desc: "Noble mounted healer. Brady's mother." },
    { name: "Panne", join: "Ch 6", class: "Taguel", desc: "The last Taguel. Transforms with a Beaststone." },
    { name: "Gaius", join: "Ch 6", class: "Thief", desc: "Sweet-toothed thief. Ideal for Movement +1." },
    { name: "Cordelia", join: "Ch 7", class: "Pegasus Knight", desc: "Perfectionist pegasus. Severa's mother." },
    { name: "Gregor", join: "Ch 8", class: "Mercenary", desc: "Older mercenary. Can learn Armsthrift." },
    { name: "Nowi", join: "Ch 8", class: "Manakete", desc: "1000-year-old child dragon. Incredibly strong tank!" },
    { name: "Libra", join: "Ch 9", class: "War Monk", desc: "Narcissist. Both combat and healing." },
    { name: "Tharja", join: "Ch 9", class: "Dark Mage", desc: "Obsessive dark mage. Loves Robin. Nosferatu tank!" },
    { name: "Olivia", join: "Ch 11", class: "Dancer", desc: "Shy dancer. Dance is a CRITICAL skill!", highlight: true },
    { name: "Cherche", join: "Ch 12", class: "Wyvern Rider", desc: "Virion's servant. Strong wyvern." },
    { name: "Henry", join: "Ch 13", class: "Dark Mage", desc: "Cheerful dark mage. Crow lover." },
    { name: "Lucina", join: "Ch 13", class: "Lord", desc: "Chrom's daughter from the future. Parallel Falchion." },
    { name: "Say'ri", join: "Ch 15", class: "Swordmaster", desc: "Princess of Chon'sin. Amatsu is her special weapon." },
    { name: "Tiki", join: "Ch 17", class: "Manakete", desc: "Divine Dragon. Legendary and powerful character!" },
    { name: "Basilio", join: "Ch 23", class: "Warrior", desc: "West-Khan. Joins late but strong." },
    { name: "Flavia", join: "Ch 23", class: "Hero", desc: "East-Khan. Joins with Sol already learned." }
];

export const PROMOTION_PATHS = [
    // Lord
    { from: "Lord", to: "Great Lord", item: "Master Seal" },
    // Tactician
    { from: "Tactician", to: "Grandmaster", item: "Master Seal" },
    // Cavalier
    { from: "Cavalier", to: "Paladin", item: "Master Seal" },
    { from: "Cavalier", to: "Great Knight", item: "Master Seal" },
    // Knight
    { from: "Knight", to: "General", item: "Master Seal" },
    { from: "Knight", to: "Great Knight", item: "Master Seal" },
    // Myrmidon
    { from: "Myrmidon", to: "Swordmaster", item: "Master Seal" },
    { from: "Myrmidon", to: "Assassin", item: "Master Seal" },
    // Thief
    { from: "Thief", to: "Assassin", item: "Master Seal" },
    { from: "Thief", to: "Trickster", item: "Master Seal" },
    // Mercenary
    { from: "Mercenary", to: "Hero", item: "Master Seal" },
    { from: "Mercenary", to: "Bow Knight", item: "Master Seal" },
    // Fighter
    { from: "Fighter", to: "Warrior", item: "Master Seal" },
    { from: "Fighter", to: "Hero", item: "Master Seal" },
    // Barbarian
    { from: "Barbarian", to: "Berserker", item: "Master Seal" },
    { from: "Barbarian", to: "Warrior", item: "Master Seal" },
    // Archer
    { from: "Archer", to: "Sniper", item: "Master Seal" },
    { from: "Archer", to: "Bow Knight", item: "Master Seal" },
    // Mage
    { from: "Mage", to: "Sage", item: "Master Seal" },
    { from: "Mage", to: "Dark Knight", item: "Master Seal" },
    // Dark Mage
    { from: "Dark Mage", to: "Sorcerer", item: "Master Seal" },
    { from: "Dark Mage", to: "Dark Knight", item: "Master Seal" },
    // Cleric/Priest
    { from: "Cleric", to: "War Cleric", item: "Master Seal" },
    { from: "Cleric", to: "Sage", item: "Master Seal" },
    { from: "Priest", to: "War Monk", item: "Master Seal" },
    { from: "Priest", to: "Sage", item: "Master Seal" },
    // Troubadour
    { from: "Troubadour", to: "Valkyrie", item: "Master Seal" },
    { from: "Troubadour", to: "War Cleric", item: "Master Seal" },
    // Pegasus
    { from: "Pegasus Knight", to: "Falcon Knight", item: "Master Seal" },
    { from: "Pegasus Knight", to: "Dark Flier", item: "Master Seal" },
    // Wyvern
    { from: "Wyvern Rider", to: "Wyvern Lord", item: "Master Seal" },
    { from: "Wyvern Rider", to: "Griffon Rider", item: "Master Seal" },
    // Special
    { from: "Villager", to: "Mercenary", item: "Second Seal" },
    { from: "Villager", to: "Fighter", item: "Second Seal" }
];

// Estimated Growth Rates (For Base Class + Character Modifiers Simulation)
export const GROWTH_RATES = {
    // Class-Based Growth Rates (Percent)
    "Lord": { HP: 90, Str: 60, Mag: 20, Skl: 60, Spd: 60, Lck: 70, Def: 50, Res: 40 },
    "Great Lord": { HP: 100, Str: 70, Mag: 20, Skl: 70, Spd: 70, Lck: 80, Def: 60, Res: 50 },
    "Tactician": { HP: 80, Str: 50, Mag: 50, Skl: 50, Spd: 50, Lck: 50, Def: 40, Res: 40 },
    "Grandmaster": { HP: 90, Str: 60, Mag: 60, Skl: 60, Spd: 60, Lck: 60, Def: 50, Res: 50 },
    "Cavalier": { HP: 85, Str: 60, Mag: 10, Skl: 55, Spd: 55, Lck: 40, Def: 55, Res: 20 },
    "Paladin": { HP: 95, Str: 70, Mag: 15, Skl: 65, Spd: 65, Lck: 50, Def: 65, Res: 30 },
    "Great Knight": { HP: 100, Str: 75, Mag: 10, Skl: 60, Spd: 50, Lck: 40, Def: 75, Res: 20 },
    "Knight": { HP: 100, Str: 70, Mag: 10, Skl: 50, Spd: 35, Lck: 40, Def: 80, Res: 15 },
    "General": { HP: 110, Str: 80, Mag: 10, Skl: 60, Spd: 40, Lck: 50, Def: 90, Res: 25 },
    "Myrmidon": { HP: 70, Str: 50, Mag: 15, Skl: 70, Spd: 75, Lck: 50, Def: 35, Res: 30 },
    "Swordmaster": { HP: 80, Str: 60, Mag: 20, Skl: 80, Spd: 85, Lck: 60, Def: 45, Res: 40 },
    "Assassin": { HP: 80, Str: 65, Mag: 20, Skl: 85, Spd: 85, Lck: 50, Def: 40, Res: 30 },
    "Thief": { HP: 70, Str: 45, Mag: 15, Skl: 65, Spd: 70, Lck: 60, Def: 30, Res: 25 },
    "Trickster": { HP: 80, Str: 50, Mag: 40, Skl: 70, Spd: 75, Lck: 70, Def: 35, Res: 40 },
    "Mercenary": { HP: 85, Str: 60, Mag: 10, Skl: 65, Spd: 60, Lck: 45, Def: 50, Res: 25 },
    "Hero": { HP: 95, Str: 70, Mag: 15, Skl: 75, Spd: 70, Lck: 55, Def: 60, Res: 35 },
    "Bow Knight": { HP: 90, Str: 65, Mag: 10, Skl: 70, Spd: 75, Lck: 50, Def: 50, Res: 30 },
    "Fighter": { HP: 95, Str: 75, Mag: 5, Skl: 50, Spd: 50, Lck: 40, Def: 45, Res: 15 },
    "Warrior": { HP: 105, Str: 85, Mag: 10, Skl: 60, Spd: 60, Lck: 50, Def: 55, Res: 25 },
    "Barbarian": { HP: 100, Str: 80, Mag: 5, Skl: 45, Spd: 55, Lck: 35, Def: 40, Res: 10 },
    "Berserker": { HP: 110, Str: 90, Mag: 5, Skl: 55, Spd: 65, Lck: 45, Def: 45, Res: 15 },
    "Archer": { HP: 75, Str: 55, Mag: 10, Skl: 65, Spd: 60, Lck: 50, Def: 40, Res: 20 },
    "Sniper": { HP: 85, Str: 65, Mag: 15, Skl: 75, Spd: 70, Lck: 60, Def: 50, Res: 30 },
    "Mage": { HP: 70, Str: 10, Mag: 70, Skl: 55, Spd: 60, Lck: 50, Def: 30, Res: 55 },
    "Sage": { HP: 80, Str: 15, Mag: 80, Skl: 65, Spd: 70, Lck: 60, Def: 40, Res: 65 },
    "Dark Knight": { HP: 90, Str: 50, Mag: 65, Skl: 60, Spd: 60, Lck: 50, Def: 55, Res: 50 },
    "Dark Mage": { HP: 75, Str: 20, Mag: 65, Skl: 50, Spd: 50, Lck: 40, Def: 45, Res: 50 },
    "Sorcerer": { HP: 85, Str: 25, Mag: 75, Skl: 60, Spd: 60, Lck: 50, Def: 55, Res: 60 },
    "Cleric": { HP: 65, Str: 15, Mag: 55, Skl: 50, Spd: 55, Lck: 60, Def: 30, Res: 60 },
    "Priest": { HP: 70, Str: 20, Mag: 55, Skl: 50, Spd: 55, Lck: 60, Def: 30, Res: 60 },
    "War Cleric": { HP: 90, Str: 60, Mag: 60, Skl: 60, Spd: 65, Lck: 70, Def: 50, Res: 65 },
    "War Monk": { HP: 90, Str: 65, Mag: 60, Skl: 60, Spd: 65, Lck: 70, Def: 50, Res: 65 },
    "Troubadour": { HP: 65, Str: 10, Mag: 55, Skl: 50, Spd: 65, Lck: 60, Def: 25, Res: 60 },
    "Valkyrie": { HP: 75, Str: 15, Mag: 65, Skl: 60, Spd: 75, Lck: 70, Def: 35, Res: 70 },
    "Pegasus Knight": { HP: 70, Str: 45, Mag: 25, Skl: 60, Spd: 75, Lck: 60, Def: 35, Res: 60 },
    "Falcon Knight": { HP: 80, Str: 55, Mag: 35, Skl: 70, Spd: 85, Lck: 70, Def: 45, Res: 70 },
    "Dark Flier": { HP: 80, Str: 50, Mag: 55, Skl: 65, Spd: 85, Lck: 60, Def: 40, Res: 65 },
    "Wyvern Rider": { HP: 85, Str: 70, Mag: 10, Skl: 55, Spd: 50, Lck: 40, Def: 60, Res: 20 },
    "Wyvern Lord": { HP: 95, Str: 80, Mag: 15, Skl: 65, Spd: 60, Lck: 50, Def: 70, Res: 30 },
    "Griffon Rider": { HP: 90, Str: 75, Mag: 15, Skl: 70, Spd: 75, Lck: 50, Def: 55, Res: 30 },
    "Villager": { HP: 60, Str: 30, Mag: 10, Skl: 30, Spd: 30, Lck: 50, Def: 25, Res: 10 },
    "Dancer": { HP: 65, Str: 25, Mag: 15, Skl: 50, Spd: 70, Lck: 70, Def: 25, Res: 25 },
    "Taguel": { HP: 80, Str: 60, Mag: 10, Skl: 65, Spd: 70, Lck: 60, Def: 40, Res: 30 },
    "Manakete": { HP: 90, Str: 70, Mag: 40, Skl: 50, Spd: 50, Lck: 50, Def: 60, Res: 40 }
};
