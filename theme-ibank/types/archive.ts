import type { PageNode } from "./page";

export type ArchiveDay = PageNode[];

export interface ArchiveMonth {
  [day: string]: ArchiveDay;
}

export interface ArchiveYear {
  [month: string]: ArchiveMonth;
}

export interface Archive {
  [year: string]: ArchiveYear;
}
