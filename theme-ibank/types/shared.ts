export type Entry<T = unknown> = [string, T];

export interface PaginationItem {
  text: string;
  pageIndex: number;
}
