import api from "../Api";

function getStockBalanceSheel(symbol) {
  return api.get("/finance-balance-sheet/" + symbol);
}

export default getStockBalanceSheel;
