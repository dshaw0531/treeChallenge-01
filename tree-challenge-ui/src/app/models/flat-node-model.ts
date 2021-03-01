/** Flat node with expandable and level information */
export interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  showButtons: boolean;
  id: number;
  factoryId: number;
}
