// LucinAI - Fire Emblem Awakening Knowledge Base
// Offline expert system data

export const LUCINA_KNOWLEDGE = {
    // Character tier list for children
    childTiers: {
        S: ["Morgan (F)", "Morgan (M)", "Lucina"],
        A: ["Severa", "Inigo", "Owain", "Cynthia"],
        B: ["Kjelle", "Noire", "Gerome", "Brady"],
        C: ["Laurent", "Nah", "Yarne"]
    },

    // Optimal pairings database
    optimalPairings: {
        "Chrom": {
            best: ["Sumia", "Olivia"],
            good: ["Maribelle", "Sully"],
            analysis: {
                "Sumia": {
                    child: "Lucina gets +2 Spd, +1 Skl. Cynthia gets Aether + Rightful King access.",
                    skills: ["Galeforce from Sumia"],
                    rating: 10
                },
                "Olivia": {
                    child: "Lucina gets +1 Spd, +1 Lck. Inigo gets Rightful King + Aether.",
                    skills: ["Galeforce harder to get"],
                    rating: 9
                },
                "Maribelle": {
                    child: "Brady gets Aether + Rightful King. Magic hybrid potential.",
                    skills: ["Good for War Monk Brady"],
                    rating: 7
                }
            }
        },
        "Avatar (M)": {
            best: ["Lucina", "Cordelia", "Tharja"],
            good: ["Nowi", "Cherche"],
            analysis: {
                "Lucina": {
                    child: "Morgan (F) gets Aether + Rightful King. Ultimate unit potential.",
                    skills: ["All skills accessible", "Best Morgan"],
                    rating: 10
                },
                "Cordelia": {
                    child: "Severa gets +4 Spd. Best physical Severa.",
                    skills: ["Galeforce from mother"],
                    rating: 9
                },
                "Tharja": {
                    child: "Noire becomes magic powerhouse. Dark Mage access.",
                    skills: ["Vengeance synergy"],
                    rating: 8
                }
            }
        },
        "Lon'qu": {
            best: ["Cordelia", "Tharja"],
            good: ["Lissa", "Miriel"],
            analysis: {
                "Cordelia": {
                    child: "Severa gets insane +7 Spd total! Speed demon.",
                    skills: ["Vantage from father", "Galeforce from mother"],
                    rating: 10
                },
                "Tharja": {
                    child: "Noire gets +4 Spd, +3 Skl. Assassin build.",
                    skills: ["Vantage + Vengeance combo"],
                    rating: 8
                }
            }
        },
        "Donnel": {
            best: ["Nowi", "Sully"],
            good: ["Maribelle"],
            analysis: {
                "Nowi": {
                    child: "Nah gets Aptitude access! +2 Str, +1 Lck.",
                    skills: ["Aptitude for fast growth", "Armsthrift viable"],
                    rating: 9
                },
                "Sully": {
                    child: "Kjelle gets Aptitude + Galeforce access.",
                    skills: ["Aptitude inheritance", "Tank build"],
                    rating: 8
                }
            }
        },
        "Gaius": {
            best: ["Tharja", "Maribelle"],
            good: ["Sumia"],
            analysis: {
                "Tharja": {
                    child: "Noire gets high Lck for Armsthrift. Sniper build.",
                    skills: ["Pass + Movement skills"],
                    rating: 8
                },
                "Maribelle": {
                    child: "Brady gets decent stats and thief skills.",
                    skills: ["Lockpick utility"],
                    rating: 6
                }
            }
        },
        "Stahl": {
            best: ["Cordelia", "Sully"],
            good: ["Cherche"],
            analysis: {
                "Cordelia": {
                    child: "Severa gets balanced stats. Paladin build.",
                    skills: ["Luna from father"],
                    rating: 7
                },
                "Sully": {
                    child: "Kjelle tank with balanced growths.",
                    skills: ["Aegis + Pavise potential"],
                    rating: 8
                }
            }
        },
        "Vaike": {
            best: ["Cherche", "Sully"],
            good: ["Lissa"],
            analysis: {
                "Cherche": {
                    child: "Gerome gets +4 Str! Physical nuke with Wyvern.",
                    skills: ["Counter inheritance"],
                    rating: 9
                },
                "Sully": {
                    child: "Kjelle physical powerhouse.",
                    skills: ["Strong early game"],
                    rating: 7
                }
            }
        },
        "Frederick": {
            best: ["Cherche", "Sumia"],
            good: ["Cordelia"],
            analysis: {
                "Cherche": {
                    child: "Gerome gets Luna + defensive skills. Tank wyvern.",
                    skills: ["Luna + Aegis combo"],
                    rating: 8
                },
                "Sumia": {
                    child: "Cynthia gets balanced flier stats.",
                    skills: ["Luna access"],
                    rating: 7
                }
            }
        },
        "Virion": {
            best: ["Cherche", "Panne"],
            good: ["Olivia"],
            analysis: {
                "Cherche": {
                    child: "Gerome balanced archer/wyvern. Not optimal.",
                    skills: ["Bowfaire option"],
                    rating: 5
                },
                "Panne": {
                    child: "Yarne gets archer skills and Taguel.",
                    skills: ["Mixed build"],
                    rating: 5
                }
            }
        },
        "Ricken": {
            best: ["Maribelle", "Miriel"],
            good: ["Panne"],
            analysis: {
                "Maribelle": {
                    child: "Brady magic monster with Sage/War Monk.",
                    skills: ["Tomefaire potential"],
                    rating: 7
                },
                "Miriel": {
                    child: "Laurent gets solid magic stats.",
                    skills: ["Pure mage build"],
                    rating: 7
                }
            }
        },
        "Henry": {
            best: ["Tharja", "Olivia"],
            good: ["Sumia"],
            analysis: {
                "Tharja": {
                    child: "Noire gets dark magic access. Unique build.",
                    skills: ["Lifetaker + Vengeance"],
                    rating: 7
                },
                "Olivia": {
                    child: "Inigo can go Sorcerer! Unique option.",
                    skills: ["Dark magic Inigo"],
                    rating: 7
                }
            }
        },
        "Kellam": {
            best: ["Sully", "Cherche"],
            good: ["Nowi"],
            analysis: {
                "Sully": {
                    child: "Kjelle ultra tank. Massive Def.",
                    skills: ["Pavise + Aegis"],
                    rating: 7
                },
                "Nowi": {
                    child: "Nah dragon tank. High survivability.",
                    skills: ["Defensive skills"],
                    rating: 6
                }
            }
        },
        "Gregor": {
            best: ["Nowi", "Cherche"],
            good: ["Panne"],
            analysis: {
                "Nowi": {
                    child: "Nah balanced stats. Armsthrift build.",
                    skills: ["Sol + Axebreaker"],
                    rating: 7
                },
                "Cherche": {
                    child: "Gerome with Sol and mercenary skills.",
                    skills: ["Solid all-around"],
                    rating: 7
                }
            }
        },
        "Libra": {
            best: ["Tharja", "Maribelle"],
            good: ["Miriel"],
            analysis: {
                "Tharja": {
                    child: "Noire magic/physical hybrid.",
                    skills: ["Renewal + combat skills"],
                    rating: 6
                },
                "Maribelle": {
                    child: "Brady top-tier healer with offensive magic.",
                    skills: ["Renewal from father"],
                    rating: 8
                }
            }
        }
    },

    // Optimal builds per character
    optimalBuilds: {
        "Morgan (F)": {
            tier: "S",
            bestClasses: ["Grandmaster", "Dark Flier", "Sorcerer"],
            coreSkills: ["Galeforce", "Ignis", "Tomefaire", "Vantage", "Vengeance"],
            strategy: "Magic nuke with mobility. Galeforce + high Mag = unstoppable.",
            inheritance: "Get Galeforce from mother. Father's skill varies by choice.",
            notes: "Best unit in game. Can inherit almost any skill."
        },
        "Morgan (M)": {
            tier: "S",
            bestClasses: ["Grandmaster", "Hero", "Assassin"],
            coreSkills: ["Galeforce", "Aether", "Rightful King", "Armsthrift", "Limit Breaker"],
            strategy: "Physical or mixed attacker. Incredible versatility.",
            inheritance: "Mother determines class access. Lucina gives Aether.",
            notes: "Nearly as broken as female Morgan."
        },
        "Lucina": {
            tier: "S",
            bestClasses: ["Great Lord", "Assassin", "Paladin"],
            coreSkills: ["Aether", "Galeforce", "Rightful King", "Luna", "Armsthrift"],
            strategy: "Balanced attacker with Aether. 50% Aether proc with Rightful King.",
            inheritance: "Galeforce from Sumia mother is ideal.",
            notes: "Aether + Rightful King = consistent healing and damage."
        },
        "Severa": {
            tier: "A",
            bestClasses: ["Hero", "Assassin", "Bow Knight"],
            coreSkills: ["Galeforce", "Armsthrift", "Sol", "Vantage", "Astra"],
            strategy: "Speed demon. Sol Katti + high Lck = infinite durability.",
            inheritance: "Gets Galeforce from Cordelia. Father for stats.",
            notes: "Lon'qu father gives +7 Spd total!"
        },
        "Inigo": {
            tier: "A",
            bestClasses: ["Hero", "Assassin", "Sorcerer"],
            coreSkills: ["Galeforce", "Astra", "Sol", "Armsthrift", "Vantage"],
            strategy: "Dancer's son. Strong physical with sword access.",
            inheritance: "Rightful King if Chrom father. Dark magic if Henry.",
            notes: "Chrom!Inigo gets Rightful King and Aether."
        },
        "Owain": {
            tier: "A",
            bestClasses: ["Swordmaster", "Dread Fighter", "Assassin"],
            coreSkills: ["Astra", "Vantage", "Vengeance", "Sol", "Galeforce"],
            strategy: "Crit monster. Swordfaire + high skill = deadly.",
            inheritance: "Lon'qu father for speed. Gaius for luck.",
            notes: "Unique Missiletainn sword."
        },
        "Cynthia": {
            tier: "A",
            bestClasses: ["Dark Flier", "Falcon Knight", "Hero"],
            coreSkills: ["Galeforce", "Aether", "Luna", "Lancefaire", "Aegis"],
            strategy: "Flying Aether user. Strong and mobile.",
            inheritance: "Aether from Chrom father guaranteed.",
            notes: "Best flier unit in many playthroughs."
        },
        "Kjelle": {
            tier: "B",
            bestClasses: ["General", "Paladin", "Great Knight"],
            coreSkills: ["Pavise", "Aegis", "Sol", "Luna", "Galeforce"],
            strategy: "Ultimate tank. Pavise + Aegis = near invincible.",
            inheritance: "Aptitude from Donnel father is huge.",
            notes: "Slow but virtually unkillable."
        },
        "Noire": {
            tier: "B",
            bestClasses: ["Sniper", "Assassin", "Sorcerer"],
            coreSkills: ["Vengeance", "Vantage", "Bowfaire", "Hit+20", "Galeforce"],
            strategy: "Sniper or magic hybrid. Vengeance synergy.",
            inheritance: "Dark magic from Tharja. Father varies.",
            notes: "Gaius father = high luck for Armsthrift."
        },
        "Gerome": {
            tier: "B",
            bestClasses: ["Wyvern Lord", "Berserker", "Warrior"],
            coreSkills: ["Axefaire", "Lancebreaker", "Quick Burn", "Deliverer", "Galeforce"],
            strategy: "Flying physical nuke. High Str ceiling.",
            inheritance: "Vaike father gives +4 Str!",
            notes: "Unique Minerva wyvern."
        },
        "Brady": {
            tier: "B",
            bestClasses: ["War Monk", "Sage", "Priest"],
            coreSkills: ["Renewal", "Miracle", "Healtouch", "Tomefaire", "Rally Skills"],
            strategy: "Combat healer. War Monk for axes.",
            inheritance: "Libra father for best healer build.",
            notes: "Underrated support unit."
        },
        "Laurent": {
            tier: "C",
            bestClasses: ["Sage", "Sorcerer", "Dark Knight"],
            coreSkills: ["Tomefaire", "Lifetaker", "Vengeance", "Vantage", "Focus"],
            strategy: "Pure mage. Slow but powerful.",
            inheritance: "Ricken father for magic.",
            notes: "Good for Lunatic runs as glass cannon."
        },
        "Nah": {
            tier: "C",
            bestClasses: ["Manakete", "Sage", "Wyvern Lord"],
            coreSkills: ["Swordbreaker", "Bowbreaker", "Renewal", "Lifetaker", "Limit Breaker"],
            strategy: "Dragon tank. Dragonstone+ for stats.",
            inheritance: "Donnel father gives Aptitude!",
            notes: "Underrated in late game."
        },
        "Yarne": {
            tier: "C",
            bestClasses: ["Taguel", "Assassin", "Berserker"],
            coreSkills: ["Beastbane", "Lethality", "Pavise", "Sol", "Galeforce"],
            strategy: "Fast Taguel. Beaststone+ is strong.",
            inheritance: "Lon'qu father for speed.",
            notes: "Limited class options hurt viability."
        }
    },

    // Core skills tier list
    skillTiers: {
        S: ["Galeforce", "Armsthrift", "Rightful King", "Aether", "Limit Breaker"],
        A: ["Sol", "Luna", "Vantage", "Vengeance", "Pavise", "Aegis"],
        B: ["Axefaire", "Swordfaire", "Tomefaire", "Lancefaire", "Lifetaker"],
        C: ["Hit+20", "Renewal", "Mov+1", "Pass", "Lethality"]
    },

    // Skill inheritance priority
    inheritancePriority: {
        physical: ["Galeforce", "Armsthrift", "Sol", "Luna", "Aether"],
        magical: ["Galeforce", "Tomefaire", "Lifetaker", "Vengeance", "Vantage"],
        tank: ["Pavise", "Aegis", "Sol", "Renewal", "Miracle"],
        support: ["Rally Spectrum", "Healtouch", "Renewal", "Miracle", "Lifetaker"]
    },

    // Quick tips
    tips: [
        "Galeforce is the most important skill to inherit. Get it from mothers.",
        "Armsthrift + high Luck (50+) = weapons never break.",
        "Rightful King (Chrom) adds +10% to all skill activations.",
        "Limit Breaker DLC raises all stat caps by 10.",
        "Morgan can inherit almost any skill. Plan parents carefully.",
        "Pair Up gives +10 Hit/Avoid minimum. Use it always.",
        "Son units inherit father's last equipped skill.",
        "Daughter units inherit mother's last equipped skill."
    ]
};

// Analysis functions
export const LUCINA_AI = {
    // Analyze current pairings vs optimal
    analyzePairings(pairings, characters) {
        const suggestions = [];
        const married = pairings.filter(p => p.status === 'S Rank');
        const planned = pairings.filter(p => p.status === 'Planned');

        married.forEach(p => {
            const optimal = LUCINA_KNOWLEDGE.optimalPairings[p.parent1];
            if (optimal) {
                if (optimal.best.includes(p.parent2)) {
                    suggestions.push(`✅ ${p.parent1} + ${p.parent2}: Perfect match!`);
                } else if (optimal.good?.includes(p.parent2)) {
                    suggestions.push(`👍 ${p.parent1} + ${p.parent2}: Good match.`);
                } else {
                    const bestOpt = optimal.best[0];
                    suggestions.push(`⚠️ ${bestOpt} could have been a better choice for ${p.parent1}.`);
                }
            }
        });

        return suggestions;
    },

    // Get character build recommendation
    getBuildAdvice(charName) {
        const build = LUCINA_KNOWLEDGE.optimalBuilds[charName];
        if (!build) return null;
        return build;
    },

    // Get pairing recommendation
    getPairingAdvice(charName) {
        const pairing = LUCINA_KNOWLEDGE.optimalPairings[charName];
        if (!pairing) return null;
        return pairing;
    },

    // Generate response based on query
    processQuery(query, appData) {
        const q = query.toLowerCase().trim();

        // Pairing questions
        if (q.includes('partner') || q.includes('marry') || q.includes('pairing')) {
            const charMatch = this.extractCharacterName(query);
            if (charMatch) {
                const advice = this.getPairingAdvice(charMatch);
                if (advice) {
                    const best = advice.best.join(' or ');
                    const detail = advice.analysis[advice.best[0]];
                    return `💕 Best matches for ${charMatch}: ${best}\n\n` +
                        `📊 If you choose ${advice.best[0]}:\n${detail.child}\n\n` +
                        `🎯 Inheritance Skills: ${detail.skills.join(', ')}`;
                }
            }
            return this.getGeneralPairingAdvice();
        }

        // Build questions
        if (q.includes('build') || q.includes('how') || q.includes('class')) {
            const charMatch = this.extractCharacterName(query);
            if (charMatch) {
                const build = this.getBuildAdvice(charMatch);
                if (build) {
                    return `⚔️ ${charMatch} Build Guide (Tier ${build.tier})\n\n` +
                        `📋 Best Classes: ${build.bestClasses.join(', ')}\n\n` +
                        `🎯 Core Skills: ${build.coreSkills.join(', ')}\n\n` +
                        `💡 Strategy: ${build.strategy}\n\n` +
                        `📝 Inheritance: ${build.inheritance}`;
                }
            }
            return "Which character do you want build advice for? Example: 'How to build Morgan?'";
        }

        // Skill questions
        if (q.includes('skill') || q.includes('inheritance') || q.includes('inherit')) {
            const charMatch = this.extractCharacterName(query);
            if (charMatch) {
                const build = this.getBuildAdvice(charMatch);
                if (build) {
                    return `🎯 Skill Inheritance Plan for ${charMatch}:\n\n` +
                        `Priority: ${build.coreSkills.slice(0, 3).join(', ')}\n\n` +
                        `💡 ${build.inheritance}\n\n` +
                        `📝 Note: ${build.notes}`;
                }
            }
            return this.getSkillInheritanceGuide();
        }

        // Status/progress questions
        if (q.includes('status') || q.includes('progress') || q.includes('analysis')) {
            return this.analyzeProgress(appData);
        }

        // Children tier list
        if (q.includes('tier') || q.includes('best child') || q.includes('meta')) {
            return this.getChildTierList();
        }

        // Tips
        if (q.includes('tip') || q.includes('advice') || q.includes('recommendation')) {
            const randomTips = LUCINA_KNOWLEDGE.tips.sort(() => 0.5 - Math.random()).slice(0, 3);
            return `💡 Aegis Intel Expert Tips:\n\n${randomTips.map((t, i) => `${i + 1}. ${t}`).join('\n\n')}`;
        }

        // Default response
        return this.getDefaultResponse();
    },

    extractCharacterName(query) {
        const names = Object.keys(LUCINA_KNOWLEDGE.optimalBuilds)
            .concat(Object.keys(LUCINA_KNOWLEDGE.optimalPairings));

        for (const name of names) {
            if (query.toLowerCase().includes(name.toLowerCase())) {
                return name;
            }
        }

        // Check partial matches
        const partialMap = {
            'morgan': 'Morgan (F)',
            'lucina': 'Lucina',
            'severa': 'Severa',
            'inigo': 'Inigo',
            'owain': 'Owain',
            'cynthia': 'Cynthia',
            'kjelle': 'Kjelle',
            'noire': 'Noire',
            'gerome': 'Gerome',
            'brady': 'Brady',
            'laurent': 'Laurent',
            'nah': 'Nah',
            'yarne': 'Yarne',
            'chrom': 'Chrom',
            'avatar': 'Avatar (M)',
            'robin': 'Avatar (M)',
            'lon\'qu': 'Lon\'qu',
            'lonqu': 'Lon\'qu',
            'donnel': 'Donnel',
            'gaius': 'Gaius',
            'stahl': 'Stahl',
            'vaike': 'Vaike',
            'frederick': 'Frederick',
            'virion': 'Virion',
            'ricken': 'Ricken',
            'henry': 'Henry',
            'kellam': 'Kellam',
            'gregor': 'Gregor',
            'libra': 'Libra'
        };

        for (const [partial, full] of Object.entries(partialMap)) {
            if (query.toLowerCase().includes(partial)) {
                return full;
            }
        }

        return null;
    },

    analyzeProgress(appData) {
        const chars = appData.characters || [];
        const pairings = appData.pairings || [];
        const todos = appData.todoLists || [];

        const married = pairings.filter(p => p.status === 'S Rank').length;
        const recruited = pairings.filter(p => p.recruited).length;
        const pendingTasks = todos.reduce((acc, list) =>
            acc + list.items.filter(t => !t.checked).length, 0);

        let response = `📊 Game Progress Analysis:\n\n`;
        response += `👥 Characters: ${chars.length} registered\n`;
        response += `💕 Married Couples: ${married}\n`;
        response += `👶 Recruited Children: ${recruited}\n`;
        response += `📋 Pending Tasks: ${pendingTasks}\n\n`;

        if (married < 5) {
            response += `💡 Tip: Plan more marriages! Child characters are very powerful.`;
        } else if (recruited < married) {
            response += `💡 Tip: Play Paralogue maps and recruit the children!`;
        } else if (pendingTasks > 5) {
            response += `💡 Tip: Focus on pending tasks.`;
        } else {
            response += `✅ Great progress! Keep going!`;
        }

        return response;
    },

    getChildTierList() {
        const tiers = LUCINA_KNOWLEDGE.childTiers;
        return `👑 Child Character Tier List:\n\n` +
            `🏆 S Tier (Best):\n${tiers.S.join(', ')}\n\n` +
            `⭐ A Tier (Very Good):\n${tiers.A.join(', ')}\n\n` +
            `👍 B Tier (Good):\n${tiers.B.join(', ')}\n\n` +
            `📊 C Tier (Average):\n${tiers.C.join(', ')}\n\n` +
            `💡 Note: Morgan is always the strongest child. Parent choice is critical!`;
    },

    getGeneralPairingAdvice() {
        return `💕 General Pairing Advice:\n\n` +
            `1. Chrom + Sumia: Most popular. Lucina gets Galeforce.\n\n` +
            `2. Avatar + Lucina: Morgan (F) becomes the ultimate unit.\n\n` +
            `3. Lon'qu + Cordelia: Severa becomes a speed demon with +7 Spd.\n\n` +
            `4. Donnel + Nowi: Nah grows incredibly fast with Aptitude.\n\n` +
            `Ask for a specific character! Example: "Who should Chrom marry?"`;
    },

    getSkillInheritanceGuide() {
        const priority = LUCINA_KNOWLEDGE.inheritancePriority;
        return `🎯 Skill Inheritance Guide:\n\n` +
            `⚔️ Physical Build:\n${priority.physical.join(' > ')}\n\n` +
            `🔮 Magic Build:\n${priority.magical.join(' > ')}\n\n` +
            `🛡️ Tank Build:\n${priority.tank.join(' > ')}\n\n` +
            `💡 Galeforce is priority for everyone! Inherited from the mother.`;
    },

    getDefaultResponse() {
        return `System active. Hello, I am Aegis Intel. 🛡️ Fire Emblem Awakening expert.\n\n` +
            `I can help you with:\n\n` +
            `💕 "Who should Chrom marry?"\n` +
            `⚔️ "How to build Morgan?"\n` +
            `🎯 "What skills for Severa?"\n` +
            `📊 "How is my progress?"\n` +
            `👑 "Who are the best children?"\n` +
            `💡 "Give me some advice"\n\n` +
            `What would you like to ask?`;
    }
};
