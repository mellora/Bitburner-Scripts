/** @param {import(".").NS } ns */
export async function main(ns) {
    // eval("ns.bypass(document);");
  // ns['document'];
  // ns.print(ns.getServer('home').cpuCores)
  let growPercent = ns.formulas.hacking.growPercent(ns.getServer('joesguns'), 10, ns.getPlayer(), ns.getServer('home').cpuCores);
  ns.print(growPercent);
  // ns.run('grow.js', 1, 'joesguns');
}