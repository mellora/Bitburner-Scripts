let doc = eval("document");
/** @param {import("./..").NS } ns */
export const main = async (ns) => {
  const crime = "homicide";
  let crimeCount = 0;

  ns.disableLog("ALL"); // Disable the log

  ns.tail(); // Open a window to view the status of the script
  let timeout = 250; // In ms - too low of a time will result in a lockout/hang

  while (true) {
    await ns.sleep(timeout); // Wait it out first
    if (ns.isBusy()) continue;

    ns.print(
      `Crime: ${crime} | Count: #${crimeCount}`
    );
    crimeCount++;
    ns.commitCrime(crime);
  }
};
