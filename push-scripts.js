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

  let file = "server-list.txt";
  let servers = ns.read(file);
  servers = servers.split(",");

  const scriptName = "early-hack-template.js";
  const target = "joesguns";
  // const target = 'johnson-ortho';

  // Run the rooting scripts
  ns.run("get-root.js");

  servers = servers.filter((item) => item != "home");

  for (let server of servers) {
    if (ns.hasRootAccess(server)) {
      // Kill running scripts on host
      await ns.killall(server);
      // Copy hacking script over to servers
      await ns.scp(scriptName, server);
      // Find out how many threads that can be run of the script from the server
      let threads = getThreadCount(server, scriptName);
      // Execute script on target server
      if (threads > 0) {
        ns.exec(scriptName, server, threads, target);
      }
    }
  }
}
