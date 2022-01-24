/** @param {import(".").NS } ns */
export async function main(ns) {
    // ns.disableLog('ALL');

    let target = ns.args[0];

    let moneyThresh = ns.getServerMaxMoney(target) * 0.9;
    
    while (true) {
        if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            await ns.grow(target);
        }
    }
}
