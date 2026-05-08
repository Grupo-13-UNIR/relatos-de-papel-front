export interface Pageable {
  pageSize: number;
  page: number;
}

export interface Page<T> {
  content: T[];
  pageable: Pageable;
  total: number;
}
