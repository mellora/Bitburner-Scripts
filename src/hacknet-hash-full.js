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
    const corpFunds = {
      name: "Sell for Corporation Funds",
      cost: ns.hacknet.hashCost("Sell for Corporation Funds"),
    };
    const corpResearch = {
      name: "Exchange for Corporation Research",
      cost: ns.hacknet.hashCost("Exchange for Corporation Research"),
    };
    const funds = {
      name: "Sell for Money",
      cost: ns.hacknet.hashCost("Sell for Money"),
    };

    let hash;

    if (
      bladeRank.cost <= bladeSp.cost &&
      bladeRank.cost <= corpFunds.cost &&
      bladeRank.cost <= corpResearch.cost &&
      bladeRank.cost < hashCapacity
    ) {
      hash = bladeRank;
    } else if (
      bladeSp.cost < bladeRank.cost &&
      bladeSp.cost <= corpFunds.cost &&
      bladeSp.cost <= corpResearch.cost &&
      bladeSp.cost < hashCapacity
    ) {
      hash = bladeSp;
    } else if (
      corpFunds.cost < bladeRank.cost &&
      corpFunds.cost < bladeSp.cost &&
      corpFunds.cost <= corpResearch.cost &&
      corpFunds.cost < hashCapacity
    ) {
      hash = corpFunds;
    } else if (
      corpResearch.cost < bladeRank.cost &&
      corpResearch.cost < bladeSp.cost &&
      corpResearch.cost < corpFunds.cost &&
      corpResearch.cost < hashCapacity
    ) {
      hash = corpResearch;
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
