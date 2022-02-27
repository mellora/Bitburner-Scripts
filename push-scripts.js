/** @param {import(".").NS } ns */
export const main = async (ns) => {
  ns.disableLog("ALL");

  const getThreadCount = (hostName, scriptName) => {
    let maxRam = ns.getServerMaxRam(hostName);
    let usedRam = ns.getServerUsedRam(hostName);
    let scriptRam = ns.getScriptRam(scriptName);
    let count = Math.floor((maxRam - usedRam) / scriptRam);

    return count;
  };

  const getServerList = async (server, parent) => {
    let results = [server];
    let children = ns.scan(server);
    for (let child of children) {
      if (
        child != parent &&
        !child.includes("pserv-") &&
        !child.includes("hacknet")
      ) {
        results = results.concat(await getServerList(child, server));
      }
    }
    return results;
  };

  const scriptName = "early-hack-template.js";

  let servers = await getServerList("home", "");
  servers = servers.filter((item) => item != "home");

  for (let server of servers) {
    let portCount = 0;
    if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(server)) {
      if (ns.fileExists("BruteSSH.exe")) {
        ns.brutessh(server);
        portCount++;
      }
      if (ns.fileExists("FTPCrack.exe")) {
        ns.ftpcrack(server);
        portCount++;
      }
      if (ns.fileExists("RelaySMTP.exe")) {
        ns.relaysmtp(server);
        portCount++;
      }
      if (ns.fileExists("HTTPWorm.exe")) {
        ns.httpworm(server);
        portCount++;
      }
      if (ns.fileExists("SQLInject.exe")) {
        ns.sqlinject(server);
        portCount++;
      }
      if (portCount >= ns.getServerNumPortsRequired(server)) {
        ns.nuke(server);
      }
      if (ns.hasRootAccess(server)) {
        // Kill running scripts on host
        await ns.killall(server);
        // Copy hacking script over to servers
        await ns.scp(scriptName, server);
        // Find out how many threads that can be run of the script from the server
        let threads = getThreadCount(server, scriptName);
        // Execute script on target server
        if (threads > 0) {
          ns.exec(scriptName, server, threads, server);
        }
      }
    }
  }
}
