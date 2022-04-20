let doc = eval("document");
/** @param {import(".").NS } ns */
export const main = async (ns) => {
  ns.disableLog("ALL");

  while (true) {
    const corpFunds = {
      name: "Sell for Corporation Funds",
      cost: ns.hacknet.hashCost("Sell for Corporation Funds"),
    };
    const corpResearch = {
      name: "Exchange for Corporation Research",
      cost: ns.hacknet.hashCost("Exchange for Corporation Research"),
    };

    let hash = corpFunds.cost <= corpResearch.cost ? corpFunds : corpResearch;

    if (ns.hacknet.numHashes() > hash.cost) {
      ns.hacknet.spendHashes(hash.name);
      ns.print("Purchased:");
      ns.print(hash);
    } else {
      await ns.sleep(1);
    }
  }
};
