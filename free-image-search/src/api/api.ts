import axios from "axios";
import type { SearchHistoryResponse, PhotoResult } from "../types";

const api = axios.create({
  baseURL: "https://localhost:8081",
});

export const fetchHistory = async (queryText: string, page = 1, pageSize = 5) => {
  const res = await api.get<SearchHistoryResponse>(`/api/SearchHistory/search`, {
    params: { queryText, page, pageSize },
  });
  return res.data;
};

export const searchPhotos = async (query: string, page = 1, per_page = 10) => {
  const res = await api.get<PhotoResult[]>(`/api/photos/search`, {
    params: { query, page, per_page },
  });
  return res.data;
};

export default api;
