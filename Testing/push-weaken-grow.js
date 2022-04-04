/** @param {import(".").NS } ns */
export async function main(ns) {
  const getThreadCount = (hostName) => {
    let maxRam = ns.getServerMaxRam(hostName);
    let usedRam = ns.getServerUsedRam(hostName);
    let count = Math.floor(maxRam - usedRam);

    return count;
  };

  const scanServers = () => {
    let servers = ns.scan("home");
    let ownedServers = ["home"];
    for (let server of servers) {
      if (server.includes("pserv-")) {
        ownedServers = ownedServers.concat(server);
      }
    }
    return ownedServers;
  };

  const target = "joesguns";
  let serverList = scanServers();

  for (let server of serverList) {
    // Kill running scripts on host
    await ns.kill("early-hack-template.js", server);
    await ns.kill("weaken.js", server);
    await ns.kill("grow.js", server);

    // Copy hacking script over to servers
    await ns.scp("weaken.js", server);
    await ns.scp("grow.js", server);

    // Find out how many threads that can be run of the script from the server
    let threads = getThreadCount(server);
    let thread1 = threads/3;
    let thread2 = threads/3;

    // Execute script on target server
    if (thread1 > 0) {
      ns.exec("weaken.js", server, thread1, target);
    }
    if (thread2 > 0) {
      ns.exec("grow.js", server, thread2, target);
    }
  }
}
