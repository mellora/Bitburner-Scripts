let doc = eval("document");
/** @param {import(".").NS } ns */
export const main = async (ns) => {
  ns.disableLog("ALL");
  const jobs = [
    { name: "ECorp", factionRep: 200000 },
    { name: "MegaCorp", factionRep: 200000 },
    { name: "KuaiGong International", factionRep: 200000 },
    { name: "Four Sigma", factionRep: 200000 },
    { name: "NWO", factionRep: 200000 },
    { name: "Blade Industries", factionRep: 200000 },
    { name: "OmniTek Incorporated", factionRep: 200000 },
    { name: "Bachman & Associates", factionRep: 200000 },
    { name: "Clarke Incorporated", factionRep: 200000 },
    { name: "Fulcrum Technologies", factionRep: 250000 },
  ];
  const field = "Software";

  ns.tail();

  for (const job of jobs) {
    ns.print(job.name);

    while (ns.getCompanyRep(job.name) < job.factionRep) {
      ns.stopAction();

      ns.applyToCompany(job.name, field);

      const rep = ns.getCompanyRep(job.name);
      ns.print(
        `Company ${job.name} | Reputation ${rep.toFixed(0)} of ${
          job.factionRep
        } | ${((rep / job.factionRep) * 100).toFixed(0)}%`
      );
      ns.workForCompany(job.name, false);
      await ns.sleep(60000);
    }
    ns.stopAction();
  }
};
