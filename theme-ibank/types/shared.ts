export type Entry<T = unknown> = [string, T];

export interface PaginationItem {
  text: string;
  pageIndex: number;
}

export interface Friend {
  name: string;
  avatar: string;
  link: string;
  desc: string;
}
