/** @param {import(".").NS } ns */
export const main = async (ns) => {
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
      if (child.includes("hacknet")) {
        results = results.concat(await getServerList(child, server));
      }
    }
    return results;
  };

  const scriptName = "early-hack-template.js";

  let servers = await getServerList("home", "");
  servers = servers.filter((item) => item != "home");

  ns.nuke("n00dles");

  for (const server of servers) {
    await ns.killall(server);
    await ns.scp(scriptName, server);
    const threads = getThreadCount(server, scriptName);
    if (threads > 0) {
      ns.exec(scriptName, server, threads, "n00dles");
    }
  }
};
