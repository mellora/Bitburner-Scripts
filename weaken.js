/** @param {import(".").NS } ns */
export async function main(ns) {
    // ns.disableLog('ALL');

    let target = ns.args[0];

    let securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    
    while (true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target);
        }
    }
}
