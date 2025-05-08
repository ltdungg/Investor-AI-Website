import api from "../Api";

function getFinanceRatio(symbol) {
  return api.get("/finance-ratio/" + symbol);
}

export default getFinanceRatio;
