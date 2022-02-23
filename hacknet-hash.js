/** @param {import(".").NS } ns */
export async function main(ns) {
  while (true) {
    if (ns.hacknet.numHashes() > 4) {
      ns.print(ns.hacknet.spendHashes("Sell for Money"));
    } else {
      await ns.sleep(1);
    }
    await ns.sleep(1);
  }
}
