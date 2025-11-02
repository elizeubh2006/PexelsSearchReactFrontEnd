export interface SearchHistoryItem {
  id: string;
  query: string;
  searchDate: string;
}

export interface SearchHistoryResponse {
  total: number;
  page: number;
  pageSize: number;
  items: SearchHistoryItem[];
}

export interface PhotoResult {
  searchDate: string;
  elapsedSeconds: number;
  originalUrl: string;
  thumbnailUrl: string;
  author: string;
  width: number;
  height: number;
  id: string;
}
