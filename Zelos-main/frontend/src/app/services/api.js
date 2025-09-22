import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:8080/api",
});


export const getRelatorios = () => {
  return api.get("/relatorios");
};


export const getApontamentos = (idRelatorio) => {
  return api.get(`/relatorios/${idRelatorio}/apontamentos`);
};


export const addApontamento = (idRelatorio, data) => {
  return api.post(`/relatorios/${idRelatorio}/apontamentos`, data);
};

export default api;