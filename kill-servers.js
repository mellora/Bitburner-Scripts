/** @param {import(".").NS } ns */
export const main = async (ns) => {
  ns.disableLog("ALL");

  const pServerPrefix = "pserv-";
  for (let i = 0; i < ns.getPurchasedServerLimit(); i++) {
    let pServer = pServerPrefix + i;
    if (ns.serverExists(pServer)) {
      ns.killall(pServer);
      await ns.sleep(10);
      ns.deleteServer(pServer);
      await ns.sleep(10);
      ns.print("Killed server " + pServer);
    }
  }
}
