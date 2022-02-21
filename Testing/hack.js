/** @param {import("..").NS } ns */
export async function main(ns) {
  // ns.disableLog('ALL');

  let target = ns.args[0];

  while (true) {
    await ns.hack(target);
  }
}
