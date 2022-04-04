/** @param {import(".").NS } ns */
export const main = async (ns) => {
  const getThreadCount = (hostName, scriptName) => {
    let maxRam = ns.getServerMaxRam(hostName);
    let usedRam = ns.getServerUsedRam(hostName);
    let scriptRam = ns.getScriptRam(scriptName);
    let count = Math.floor((maxRam - usedRam) / scriptRam);

    return count;
  };

  ns.disableLog("ALL");

  const serverCostMulti = ns.getPurchasedServerCost(16) / 16;
  const maxNumServers = ns.getPurchasedServerLimit();
  const maxMoney = ns.getServerMoneyAvailable("home") / maxNumServers;
  const maxRam = ns.getPurchasedServerMaxRam("home");

  // get servers with the minimum, predefined amount, but check if there is already
  // a higher configured pserv
  let pServer;
  let ramToBuy = 16;

  // calculate max RAM for the buck
  if (maxMoney > serverCostMulti * ramToBuy) {
    ramToBuy *= 2;

    while (maxMoney > serverCostMulti * ramToBuy) {
      ramToBuy *= 2;
    }
    ramToBuy /= 2;
  }

  if (ramToBuy > maxRam) {
    ramToBuy = maxRam;
  }

  ns.print(
    "Calculated: " +
      ramToBuy +
      " GB RAM for " +
      serverCostMulti * ramToBuy +
      "$"
  );

  const serverCost = ns.getPurchasedServerCost(ramToBuy);

  let i = 0;
  while (i < maxNumServers) {
    if (ns.getServerMoneyAvailable("home") > serverCost) {
      if (
        !ns.serverExists("pserv-" + i) ||
        ns.getServerMaxRam("pserv-" + i) < ramToBuy
      ) {
        //if (maxMoney > serverCostMulti * ramToBuy) {
        if (ns.serverExists("pserv-" + i)) {
          ns.killall("pserv-" + i);
          await ns.sleep(8000);
          ns.deleteServer("pserv-" + i);
          await ns.sleep(5000);
        }

        if (!ns.serverExists("pserv-" + i)) {
          pServer = ns.purchaseServer("pserv-" + i, ramToBuy);
          if (pServer) {
            ns.print(
              "Bought player server #" +
                i +
                " with " +
                ramToBuy +
                " GB RAM for $" +
                serverCostMulti * ramToBuy
            );
            ++i;
            await ns.scp("early-hack-template.js", pServer);
            ns.exec(
              "early-hack-template.js",
              pServer,
              getThreadCount(pServer, "early-hack-template.js"),
              "joesguns"
            );
          }
        }
        await ns.sleep(500);
      } else {
        ++i;
        await ns.sleep(500);
      }
    }
    await ns.sleep(500);
  }
}
