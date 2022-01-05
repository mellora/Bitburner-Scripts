/** @param {import(".").NS } ns */
export async function main(ns) {
  ns.run('scan-servers.js');

  ns.run('stocks.js');
  ns.run('purchase-hacknet-nodes.js');

  ns.run('get-root.js');

  ns.run('early-hack-template.js', 5000, 'n00dles');
}