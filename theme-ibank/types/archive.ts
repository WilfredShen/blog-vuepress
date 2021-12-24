import type { PageNode } from "./page";

export type Archive = PageNode[];
export interface Archives {
  [date: string]: Archive;
}
