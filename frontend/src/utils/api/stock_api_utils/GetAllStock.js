import api from "../Api";

function getAllStock() {
  return api.get("/stock/");
}

export default getAllStock;
