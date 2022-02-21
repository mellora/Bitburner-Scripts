/** @param {import(".").NS } ns */
export async function main(ns) {
  const getServerList = async (server, parent) => {
    let results = [server];
    let children = ns.scan(server);
    for (let child of children) {
      if (child != parent && !child.includes("pserv-") && !child.includes("hacknet")) {
        results = results.concat(await getServerList(child, server));
      }
    }
    return results;
  };

  let results = await getServerList("home", "");

  let file = "server-list.txt";

  ns.clear(file);

  await ns.write(file, results, "w");
}
