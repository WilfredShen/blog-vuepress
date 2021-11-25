/* eslint-disable */
export {};

declare global {
  interface LinkRaw {
    text: string;
    link?: string;
    children?: LinkRaw[];
  }

  interface NavLink extends LinkRaw {
    $data: NodeData;
    $children?: Record<string, Node>;
  }
}
