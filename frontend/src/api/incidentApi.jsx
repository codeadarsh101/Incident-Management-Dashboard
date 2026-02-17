
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getIncidents = (params) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== "" && v !== null)
  );

  return API.get("/incidents", { params: cleanParams });
};

export const getIncidentById = (id) => API.get(`/incidents/${id}`);
export const createIncident = (data) => API.post("/incidents", data);
export const updateIncident = (id, data) => API.patch(`/incidents/${id}`, data);
