import api from "../Api";

function getStockPrice(symbol) {
  return api.get("/stock-price/" + symbol);
}

export default getStockPrice;
