/** @param {import("./../..").NS } ns */
const getThreadCount = (ns, hostName, scriptName, memBuffer = 0) => {
  /**
   * Arrow Function to get available number of threads
   * on a server for a givin script
   */
  let maxRam = ns.getServerMaxRam(hostName);
  let usedRam = ns.getServerUsedRam(hostName);
  let scriptRam = ns.getScriptRam(scriptName);
  let count = 0;

  count = Math.floor((maxRam - usedRam - memBuffer) / scriptRam);

  return count;
};

export default getThreadCount;
