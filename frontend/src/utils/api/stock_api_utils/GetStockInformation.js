import api from "../Api";

function getStockInfomation(symbol) {
  return api.get("/stock/" + symbol);
}

export default getStockInfomation;
