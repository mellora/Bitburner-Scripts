/** @param {import("./..").NS } ns */
export const main = async (ns) => {
  const hacknetPrefix = "hacknet-node-";
  const hacknetNetwork = ns
    .scan("home")
    .filter((node) => node.includes(hacknetPrefix));

  hacknetNetwork.forEach((node) => ns.killall(node));
};
