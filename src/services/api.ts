// npx json-server --watch unknown.json 3000 -- usar json-server como testes? -Leandro
import axios from "axios";

const api = axios.create({
    //baseURL: 'http://localhost:3000/unknown',
});

export default api;