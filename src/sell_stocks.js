/** @param {import("./..").NS } ns */
export const main = async (ns) => {
  const stocks = ns.stock.getSymbols();
  for (const stock of stocks) {
    ns.stock.getPosition(stock);
    ns.stock.sell(stock, ns.stock.getMaxShares(stock));
  }
};
