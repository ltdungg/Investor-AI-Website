import api from "../Api";

function getFinanceIncomeStatement(symbol) {
  return api.get("finance-income-statement/" + symbol);
}

export default getFinanceIncomeStatement;
