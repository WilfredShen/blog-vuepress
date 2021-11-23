export {};

declare global {
  interface LinkRaw {
    text: string;
    link?: string;
    children?: LinkRaw[];
  }

  interface NavLink extends LinkRaw {
    $data: { [key: string]: any };
    $children?: { [key: string]: Node };
  }
}
