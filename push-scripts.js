/** @param {import(".").NS } ns */
export async function main(ns) {
  ns.disableLog("ALL");

  const getThreadCount = (hostName, scriptName) => {
    let maxRam = ns.getServerMaxRam(hostName);
    let usedRam = ns.getServerUsedRam(hostName);
    let scriptRam = ns.getScriptRam(scriptName);
    let count = Math.floor((maxRam - usedRam) / scriptRam);

    return count;
  };

  // ns.run("scan-servers.js");

  let file = "server-list.txt";
  let servers = ns.read(file);
  servers = servers.split(",");

  const scriptName = "early-hack-template.js";
  // const scriptName = "hack.js";
  const target = "joesguns";
  // const target = 'johnson-ortho';

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
        // Connects to server long enough to backdoor it.
        ns.connect(server);
        await ns.installBackdoor();
        ns.connect("home");
        // Kill running scripts on host
        await ns.killall(server);
        // Copy hacking script over to servers
        await ns.scp(scriptName, server);
        // Find out how many threads that can be run of the script from the server
        let threads = getThreadCount(server, scriptName);
        // Execute script on target server
        if (threads > 0) {
          ns.exec(scriptName, server, threads, target);
          ns.print("Script Running on " + server);
        }
      }
    }
  }
}
