export interface MenuItem {
  name: string;
  title: string;
  icon: string;
  pos: number;
  path: string;
  redirect: string;
  component: string;
  children?: MenuItem[];
}

/**
 * @description: Get menu return value
 */
export type getMenuListResult = MenuItem[];
