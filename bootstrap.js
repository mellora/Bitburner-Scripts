let doc = eval("document");
/** @param {import(".").NS } ns */
export const main = async (ns) => {
  const getThreadCount = (hostName, scriptName) => {
    /**
     * Arrow Function to get available number of threads
     * on a server for a givin script
     */
    let maxRam = ns.getServerMaxRam(hostName);
    let usedRam = ns.getServerUsedRam(hostName);
    let scriptRam = ns.getScriptRam(scriptName);
    let count = Math.floor((maxRam - usedRam) / scriptRam);

    return count;
  };

  /**
   * Try Catch to attemp to purchase the tor router.
   * If it is unable to buy the router due to not having
   * enough cash or not having access to the singularity API
   * simply prints an error to the log console.
   */
  try {
    ns.purchaseTor();
  } catch (error) {
    ns.print(error);
  }

  ns.run("stocks.js"); // Runs script to auto manage stocks.
  ns.run("purchase-hacknet.js"); // Runs script to purchase Hacknet Servers
  ns.run("hacknet-hash-money.js"); // Runs script to spend hashes generated my Hacknet Server Network

  await ns.sleep(1000);
  /**
   * Following nukes server n00dles and then runs hacking script
   * against the server.
   */
  ns.nuke("n00dles");
  ns.run(
    "early-hack-template.js",
    getThreadCount("home", "early-hack-template.js"),
    "n00dles"
  );
};
