/** @param {import(".").NS } ns */
export const main = async (ns) => {
  ns.kill("stocks.js", "home");
  const stocks = ns.stock.getSymbols();
  for (const stock of stocks) {
    ns.stock.sell(stock, ns.stock.getMaxShares(stock));
  }
};
