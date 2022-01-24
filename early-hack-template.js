/** @param {import(".").NS } ns */
export async function main(ns) {
  // ns.disableLog('ALL');
  // Defines the "target server", which is the server
  // that we're going to hack.
  let target = ns.args[0];

  // Defines how much money a server should have before we hack it
  let moneyThresh = ns.getServerMaxMoney(target) * 0.9;

  // Defines the maximum security level the target server can
  // have. If the target's security level is higher than this,
  // we'll weaken it before doing anything else
  let securityThresh = ns.getServerMinSecurityLevel(target) + 5;

  // Infinite loop that continously hacks/grows/weakens the target server
  while (true) {
    if (ns.getServerSecurityLevel(target) > securityThresh) {
      // If the server's security level is above our threshold, weaken it
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      // If the server's money is less than our threshold, grow it
      await ns.grow(target);
    } else {
      // Otherwise, hack it
      await ns.hack(target);
    }
  }
}
