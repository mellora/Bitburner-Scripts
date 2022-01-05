/** @param {import(".").NS } ns */
export async function main(ns) {
  const pServerPrefix = 'pserv-'
  for (let i = 0; i < ns.getPurchasedServerLimit(); i++) {
    let pServer = pServerPrefix + i;
    if(ns.serverExists(pServer)) {
      ns.killall(pServer);
      await ns.sleep(10);
      ns.deleteServer(pServer);
      await ns.sleep(10);
    }
  }
}
