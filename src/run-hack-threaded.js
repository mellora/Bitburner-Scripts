import getThreadCount from "./Library/thread-count.js";

/** @param {import("./..").NS } ns */
export const main = async (ns) => {
  ns.nuke("n00dles");
  ns.run(
    "early-hack-template.js",
    getThreadCount(ns, "home", "early-hack-template.js", {
      bigScript: "script-crime.js",
    }),
    "n00dles"
  );
};
