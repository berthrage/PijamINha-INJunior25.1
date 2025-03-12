// npx json-server --watch src/data/examplepajamas.json --port 3000 -- usar json-server como testes? -Leandro
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/',
});

export default api;