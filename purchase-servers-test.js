/** @param {import(".").NS } ns */
export async function main(ns) {
  ns.disableLog("ALL");

  let delayTime = ns.args[0] || 1000;
  let thresholdMultiplier = ns.args[1] || 1; //Bigger threshold, the less it spends

  const getThreadCount = (hostName, scriptName) => {
    let maxRam = ns.getServerMaxRam(hostName);
    let usedRam = ns.getServerUsedRam(hostName);
    let scriptRam = ns.getScriptRam(scriptName);
    let count = Math.floor((maxRam - usedRam) / scriptRam);

    return count;
  };

  const waitForMoney = async (targetMoney, delayTime, thresholdMultiplier) => {
    while (ns.getPlayer().money / thresholdMultiplier < targetMoney) {
      await ns.sleep(delayTime);
    }
  };

  const getServerCost = ramTier => {
    let ramAmount = Math.pow(2, ramTier);
    return ns.getPurchasedServerCost(ramAmount);
  }

  const maxServerNum = ns.getPurchasedServerLimit();
  let ramStart = 4;

  const pServerPrefix = 'pserver-';
  let pServer;

  // for (let i = 0; i < )

  while (true) {
    ns.print(getServerCost(5));
    // for
    ramStart++;
    await ns.sleep(1);
  }
}
