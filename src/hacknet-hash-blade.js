let doc = eval("document");
/** @param {import("./..").NS } ns */
export const main = async (ns) => {
  ns.disableLog("ALL");

  while (true) {
    const hashCapacity = ns.hacknet.hashCapacity();
    const bladeRank = {
      name: "Exchange for Bladeburner Rank",
      cost: ns.hacknet.hashCost("Exchange for Bladeburner Rank"),
    };
    const bladeSp = {
      name: "Exchange for Bladeburner SP",
      cost: ns.hacknet.hashCost("Exchange for Bladeburner SP"),
    };
    const funds = {
      name: "Sell for Money",
      cost: ns.hacknet.hashCost("Sell for Money"),
    };

    let hash;

    if (bladeRank.cost <= bladeSp.cost && bladeRank.cost < hashCapacity) {
      hash = bladeRank;
    } else if (bladeSp.cost < bladeRank.cost && bladeSp.cost < hashCapacity) {
      hash = bladeSp;
    } else {
      hash = funds;
    }

    if (ns.hacknet.numHashes() > hash.cost) {
      ns.hacknet.spendHashes(hash.name);
      ns.print("Purchased:");
      ns.print(hash);
    } else {
      await ns.sleep(1);
    }
  }
};
