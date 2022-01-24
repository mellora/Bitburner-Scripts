/** @param {import(".").NS } ns */
export async function main(ns) {
    // eval("ns.bypass(document);");
  // ns['document']
    Number.prototype.toExponential = function () { return null; };
}