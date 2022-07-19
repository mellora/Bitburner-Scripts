let doc = eval("document");
/** @param {import("./..").NS } ns */
export const main = async (ns) => {
  ns.disableLog("ALL");

  while (true) {
    const hashCapacity = ns.hacknet.hashCapacity();
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
      corpFunds.cost <= corpResearch.cost &&
      corpFunds.cost < hashCapacity
    ) {
      hash = corpFunds;
    } else if (
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
