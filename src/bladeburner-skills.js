/** @param {import("./..").NS } ns */
export const main = async (ns) => {
  ns.disableLog("ALL");
  /**
   * Array of available skills for bladeburner automation.
   * Format follows this rational:
   * name: name of the skill;
   * levelMax: sets max desired level for skill;
   * LevelCurrent: do not touch, code sets as part of runtime;
   * levelUpCost: do not touch, code sets as part of runtime
   */
  let skills = [
    {
      name: "Blade's Intuition",
      levelMax: null,
      levelCurrent: null,
      levelUpCost: null,
    },
    {
      name: "Cloak",
      levelMax: 25,
      levelCurrent: null,
      levelUpCost: null,
    },
    {
      name: "Short-Circuit",
      levelMax: 25,
      levelCurrent: null,
      levelUpCost: null,
    },
    {
      name: "Digital Observer",
      levelMax: null,
      levelCurrent: null,
      levelUpCost: null,
    },
    {
      name: "Tracer",
      levelMax: 10,
      levelCurrent: null,
      levelUpCost: null,
    },
    {
      name: "Overclock",
      levelMax: 90,
      levelCurrent: null,
      levelUpCost: null,
    },
    {
      name: "Reaper",
      levelMax: null,
      levelCurrent: null,
      levelUpCost: null,
    },
    {
      name: "Evasive System",
      levelMax: null,
      levelCurrent: null,
      levelUpCost: null,
    },
    {
      name: "Datamancer",
      levelMax: 0,
      levelCurrent: null,
      levelUpCost: null,
    },
    {
      name: "Cyber's Edge",
      levelMax: 0,
      levelCurrent: null,
      levelUpCost: null,
    },
    {
      name: "Hands of Midas",
      levelMax: 0,
      levelCurrent: null,
      levelUpCost: null,
    },
    {
      name: "Hyperdrive",
      levelMax: 20,
      levelCurrent: null,
      levelUpCost: null,
    },
  ];

  const checkLevel = (skill) => {
    if (skill.levelMax === null) {
      return skill;
    }
    if (skill.levelCurrent < skill.levelMax) {
      return skill;
    }
  };

  /**
   * While loop code block is the meat of the code execution,
   * Checks to see what the lowest cost skill is that is not
   * all ready at max desired level to then level that skill
   * next.
   */
  while (true) {
    // Gets current available skill points.
    let skillPoints = ns.bladeburner.getSkillPoints();
    let skillsFiltered = [];
    // For loop sets the current skill variables.
    // Then filters out maxed level skills
    for (let x = 0; x < skills.length; x++) {
      let skillName = skills[x].name;
      skills[x].levelCurrent = ns.bladeburner.getSkillLevel(skillName);
      skills[x].levelUpCost = ns.bladeburner.getSkillUpgradeCost(skillName);

      skillsFiltered = skills.filter(checkLevel);
    }
    // Reduce the skill array to find the skill with the lowest cost to level up.
    let skillToLevel = skillsFiltered.reduce((previousValue, currentValue) =>
      previousValue.levelUpCost < currentValue.levelUpCost
        ? previousValue
        : currentValue
    );
    if (skillToLevel.levelUpCost <= skillPoints) {
      ns.bladeburner.upgradeSkill(skillToLevel.name);
      ns.print("Upgraded Bladeburner Skill: " + skillToLevel.name);
    }
    await ns.sleep(10);
  }
};
