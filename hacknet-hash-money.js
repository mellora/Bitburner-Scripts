let doc = eval("document");
/** @param {import(".").NS } ns */
export const main = async (ns) => {
  ns.disableLog("ALL");

  while (true) {
    const funds = {
      name: "Sell for Money",
      cost: ns.hacknet.hashCost("Sell for Money"),
    };

    if (ns.hacknet.numHashes() > funds.cost) {
      ns.hacknet.spendHashes(funds.name);
      ns.print("Purchased:");
      ns.print(funds);
    } else {
      await ns.sleep(1);
    }
  }
};
