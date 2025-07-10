import { shallowRef, ref } from 'vue';
import type { TreeNode } from '../types/tree';
import { parseApiTree } from '../utils/treeHelpers';

export function useTreeData() {
  const treeData = shallowRef<TreeNode[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchTreeData = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch('https://storyblok-frontend-engineer-homework-data.vercel.app/treeOfLife.json');
      if (!response.ok) throw new Error('Failed to fetch tree data');
      const data = await response.json();
      // Always parse as a single root node
      treeData.value = [parseApiTree(data)];
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : String(err) || 'Unknown error';
    } finally {
      isLoading.value = false;
    }
  };

  return { treeData, isLoading, error, fetchTreeData };
} 