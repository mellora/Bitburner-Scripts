/**
 * Arrow Function to get available number of threads on a server for a givin script
 * @param {import("./../..").NS } ns
 * @param {hostName} Name of host to calculate ram availability for.
 * @param {scriptName} Name of script to calculate number of runnable threads for script size
 * @param {memBuffer} Optional - Additional memory to leave available for thread calculation
 */
const getThreadCount = (ns, hostName, scriptName, memBuffer = 0) => {
  let maxRam = ns.getServerMaxRam(hostName);
  let usedRam = ns.getServerUsedRam(hostName);
  let scriptRam = ns.getScriptRam(scriptName);
  let count = 0;

  count = Math.floor((maxRam - usedRam - memBuffer) / scriptRam);

  return count;
};

export default getThreadCount;
