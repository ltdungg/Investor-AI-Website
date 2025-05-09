import api from "../Api";

function getStockFinanceCashFlow(symbol) {
  return api.get("/finance-cash-flow/" + symbol);
}

export default getStockFinanceCashFlow;
