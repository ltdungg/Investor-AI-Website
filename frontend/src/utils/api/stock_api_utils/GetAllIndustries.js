import api from "../Api";

function getAllIndustries() {
    return api.get('/industries');
}

export default getAllIndustries;