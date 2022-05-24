/** @param {import("./..").NS } ns */
export const main = async (ns) => {
  ns.disableLog("ALL");

  let thresholdMultiplier = 2; //Bigger threshold, the less it spends

  while (true) {
    await ns.sleep(1);

    let ownedNodes = ns.hacknet.numNodes();
    let minValue = ns.hacknet.getPurchaseNodeCost();
    let nodeIndex = ownedNodes;
    let upgradeType = -1; //-1 -> purchase, 0 -> level, 1 -> ram, 2 -> core, 3 -> cache

    for (let i = 0; i < ownedNodes; i++) {
      let upgrades = [
        ns.hacknet.getLevelUpgradeCost(i, 1),
        ns.hacknet.getRamUpgradeCost(i, 1),
        ns.hacknet.getCoreUpgradeCost(i, 1),
        ns.hacknet.getCacheUpgradeCost(i, 1),
      ];

      let value = Math.min.apply(Math, upgrades);
      if (value < minValue) {
        minValue = value;
        nodeIndex = i;
        upgradeType = upgrades.indexOf(value);
      }
    }

    if (ns.getPlayer().money / thresholdMultiplier < minValue) {
      continue;
    }

    switch (upgradeType) {
      case -1:
        ns.hacknet.purchaseNode();
        ns.print("Purchased Node");
        break;
      case 0:
        ns.hacknet.upgradeLevel(nodeIndex, 1);
        ns.print("Upgrade Node Level");
        break;
      case 1:
        ns.hacknet.upgradeRam(nodeIndex, 1);
        ns.print("Upgrade Node Ram");
        break;
      case 2:
        ns.hacknet.upgradeCore(nodeIndex, 1);
        ns.print("Upgrade Node Core");
        break;
      case 3:
        ns.hacknet.upgradeCache(nodeIndex, 1);
        ns.print("Upgrade Node Cache");
        break;
    }
  }
};
