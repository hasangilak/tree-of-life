import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TreeNode } from '../types/tree';

export const useTreeStore = defineStore('tree', () => {
  const selectedNode = ref<TreeNode | null>(null);

  function setSelectedNode(node: TreeNode | null) {
    selectedNode.value = node;
  }

  return {
    selectedNode,
    setSelectedNode,
  };
}); 