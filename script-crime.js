let doc = eval("document");
/** @param {import(".").NS } ns */
export const main = async (ns) => {
  const crimes = [
    "heist",
    "assassination",
    "kidnap and ransom",
    "grand theft auto",
    "homicide",
    "traffick illegal arms",
    "bond forgery",
    "deal drugs",
    "larceny",
    "mug someone",
    "rob store",
    "shoplift",
  ];
  let crimeCount = 0;

  ns.disableLog("ALL"); // Disable the log

  ns.tail(); // Open a window to view the status of the script
  let timeout = 250; // In ms - too low of a time will result in a lockout/hang

  while (true) {
    await ns.sleep(timeout); // Wait it out first
    if (ns.isBusy()) continue;
    /** Calculate the risk value of all crimes */
    let choices = crimes.map((crime) => {
      let crimeStats = ns.getCrimeStats(crime); // Let us look at the important bits
      let crimeChance = ns.getCrimeChance(crime); // We need to calculate if its worth it
      /**
       * Using probabilty(odds) to calculate the "risk" to get the best reward
       * Risk Value = Money Earned * Odds of Success(P(A) / ~P(A)) / Time taken
       *
       * Larger risk values indicate a better choice
       */
      let crimeRiskValue =
        (crimeStats.money *
          (ns.getPlayer().crime_money_mult *
            ns.getBitNodeMultipliers().CrimeMoney) *
          Math.log10(crimeChance / (1 - crimeChance + Number.EPSILON))) /
        crimeStats.time;
      return [crime, crimeRiskValue];
    });

    let bestCrime = choices.reduce((prev, current) => {
      return prev[1] > current[1] ? prev : current;
    });

    ns.print(
      `Crime: ${bestCrime[0]} | Cash: $${
        ns.getCrimeStats(bestCrime[0]).money *
        (
          ns.getPlayer().crime_money_mult *
          ns.getBitNodeMultipliers().CrimeMoney
        ).toPrecision(5)
      } | Count: #${crimeCount}`
    );
    crimeCount++;
    ns.commitCrime(bestCrime[0]);
  }
};
