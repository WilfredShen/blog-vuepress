import type { PageNode } from "./page";
import type { Entry } from "./shared";

export type Tag = Entry<PageNode[]>;

export interface Tags {
  [key: string]: PageNode[];
}
