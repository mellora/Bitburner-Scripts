import getThreadCount from "./Library/thread-count.js";

/** @param {import("./..").NS } ns */
export const main = async (ns) => {
  let threadCount = getThreadCount(
    ns,
    "home",
    "early-hack-template.js",
    ns.getScriptRam("script-crime.js")
  );
  ns.nuke("n00dles");
  ns.run("early-hack-template.js", threadCount, "n00dles");
};
