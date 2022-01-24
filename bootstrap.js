/** @param {import(".").NS } ns */
export async function main(ns) {
  const getThreadCount = (hostName, scriptName) => {
    let maxRam = ns.getServerMaxRam(hostName);
    let usedRam = ns.getServerUsedRam(hostName);
    let scriptRam = ns.getScriptRam(scriptName);
    let count = Math.floor((maxRam - usedRam) / scriptRam);

    return count;
  };

  ns.run("scan-servers.js");

  await ns.sleep(5000);

  ns.run("stocks.js");
  // ns.run("purchase-hacknet-nodes.js");

  ns.run("get-root.js");

  await ns.sleep(5000);

  ns.run(
    "early-hack-template.js",
    getThreadCount("home", "early-hack-template.js") - 6,
    "n00dles"
  );
}