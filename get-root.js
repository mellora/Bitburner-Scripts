/** @param {import(".").NS } ns */
export async function main(ns) {
  let file = "server-list.txt";
  let servers = ns.read(file);
  servers = servers.split(",");

  for (let server of servers) {
    let portCount = 0;
    if (
      ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(server) &&
      !server.includes("pserv-")
    ) {
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
      // if (ns.hasRootAccess(server)) {
      //   ns.installBackdoor(server);
      // }
    }
  }
}
