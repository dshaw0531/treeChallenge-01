export interface TreeNode {
  id: number;
  name: string;
  childNodes?: TreeNode[];
  factoryId?: number;
}
