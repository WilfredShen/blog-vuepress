import type { PageNodeData, PageNode } from "./page";

export interface LinkRaw {
  text: string;
  link?: string;
  children?: LinkRaw[];
}

export interface NavLink extends LinkRaw {
  $data: PageNodeData;
  $children?: Record<string, PageNode>;
}
