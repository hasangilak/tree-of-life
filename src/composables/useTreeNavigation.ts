import { ref, computed, watch } from 'vue';
import type { Ref } from 'vue';
import type { TreeNode } from '../types/tree';

function buildNodeMap(nodes: TreeNode[], parentId?: string, map = new Map<string, TreeNode>()): Map<string, TreeNode> {
  nodes.forEach(node => {
    map.set(node.id, { ...node, parentId });
    if (node.children) buildNodeMap(node.children, node.id, map);
  });
  return map;
}

export function useTreeNavigation(treeData: Ref<TreeNode[]>) {
  const selectedNodeId = ref<string | null>(null);
  const expandedPath = ref<string[]>([]);
  const nodeMap = computed(() => buildNodeMap(treeData.value));

  // Helper to get parent chain up to root
  function getParentChain(nodeId: string): string[] {
    const chain: string[] = [];
    let current = nodeMap.value.get(nodeId);
    while (current && current.parentId) {
      chain.unshift(current.parentId);
      current = nodeMap.value.get(current.parentId);
    }
    return chain;
  }

  // Compute visible nodes based on selection and expansion rules
  const visibleNodes = computed(() => {
    if (!selectedNodeId.value) return [];
    const visible = new Set<string>();
    const addNodeAndChildren = (id: string) => {
      visible.add(id);
      const node = nodeMap.value.get(id);
      if (node && node.children) {
        node.children.forEach((child: TreeNode) => visible.add(child.id));
      }
    };
    // Add all parent nodes and their children
    const parentChain = getParentChain(selectedNodeId.value);
    parentChain.forEach(id => addNodeAndChildren(id));
    // Add selected node and its children
    addNodeAndChildren(selectedNodeId.value);
    // Return visible nodes in tree order
    return Array.from(visible).map(id => nodeMap.value.get(id)).filter(Boolean) as TreeNode[];
  });

  // Select a node and update expanded path
  function selectNode(nodeId: string) {
    selectedNodeId.value = nodeId;
    expandedPath.value = [...getParentChain(nodeId), nodeId];
  }

  // Expand a node (add to expandedPath)
  function expandNode(nodeId: string) {
    if (!expandedPath.value.includes(nodeId)) {
      expandedPath.value = [...getParentChain(nodeId), nodeId];
    }
  }

  // Collapse a node (remove from expandedPath)
  function collapseNode(nodeId: string) {
    expandedPath.value = expandedPath.value.filter(id => id !== nodeId);
  }

  // Initialize selection to root node
  watch(treeData, (val) => {
    if (val.length && !selectedNodeId.value) {
      selectNode(val[0].id);
    }
  }, { immediate: true });

  return { selectedNodeId, expandedPath, visibleNodes, selectNode, expandNode, collapseNode };
} 