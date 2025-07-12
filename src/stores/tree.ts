import { defineStore } from 'pinia';
import type { TreeNode } from '../types/tree';

export interface TreeState {
  selectedNode: TreeNode | null;
}

export const useTreeStore = defineStore('tree', {
  state: (): TreeState => ({
    selectedNode: null,
  }),
  actions: {
    setSelectedNode(node: TreeNode | null) {
      this.selectedNode = node;
    },
  },
}); 