/* eslint-disable */
export {};

declare global {
  type Tag = Entry<Node[]>;

  interface Tags {
    [key: string]: Node[];
    $all: Node[];
  }
}
