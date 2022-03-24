let doc = eval("document");
/** @param {import(".").NS } ns */
export const main = async (ns) => {
  while (true) {
    if (ns.hacknet.numHashes() > 4) {
      ns.print(ns.hacknet.spendHashes("Sell for Money"));
    } else {
      await ns.sleep(1);
    }
    await ns.sleep(1);
  }
}
