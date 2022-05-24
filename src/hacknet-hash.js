let doc = eval("document");
/** @param {import("./..").NS } ns */
export const main = async (ns) => {
  ns.disableLog("ALL");

  while (true) {
    const funds = {
      name: "Sell for Money",
      cost: ns.hacknet.hashCost("Sell for Money"),
    };

    let hash = funds;

    if (ns.hacknet.numHashes() > hash.cost) {
      ns.hacknet.spendHashes(hash.name);
      ns.print("Purchased:");
      ns.print(hash);
    } else {
      await ns.sleep(1);
    }
  }
};
