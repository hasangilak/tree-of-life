import { ref, computed, watch } from "vue";
import type { Ref } from "vue";
import type { TreeNode } from "../types/tree";

function buildNodeMap(
  nodes: TreeNode[],
  parentId?: string,
  map = new Map<string, TreeNode>()
): Map<string, TreeNode> {
  nodes.forEach((node) => {
    map.set(node.id, { ...node, parentId });
    if (node.type === "branch" && node.children)
      buildNodeMap(node.children, node.id, map);
  });
  return map;
}

export function useTreeNavigation(treeData: Ref<TreeNode[]>) {
  const selectedNodeId = ref<string | null>(null);
  const expandedNodes = ref<string[]>([]);
  const nodeMap = computed(() => buildNodeMap(treeData.value));

  const visibleNodes = computed(() => {
    const visible: TreeNode[] = [];
    const recurse = (nodes: TreeNode[]) => {
      nodes.forEach((node) => {
        visible.push(node);
        if (
          node.type === "branch" &&
          expandedNodes.value.includes(node.id) &&
          node.children
        ) {
          recurse(node.children);
        }
      });
    };
    recurse(treeData.value);
    return visible;
  });

  function selectNode(nodeId: string) {
    selectedNodeId.value = nodeId;
    const node = nodeMap.value.get(nodeId);
    if (node?.type === "branch" && !expandedNodes.value.includes(nodeId)) {
      expandNode(nodeId);
    }
  }

  function expandNode(nodeId: string) {
    if (!expandedNodes.value.includes(nodeId)) {
      expandedNodes.value.push(nodeId);
    }
  }

  function collapseNode(nodeId: string) {
    expandedNodes.value = expandedNodes.value.filter((id) => id !== nodeId);
  }

  watch(
    treeData,
    (val) => {
      if (val.length && !selectedNodeId.value) {
        const rootId = val[0].id;
        expandNode(rootId);
        selectNode(rootId);
      }
    },
    { immediate: true }
  );

  return {
    selectedNodeId,
    expandedNodes,
    visibleNodes,
    nodeMap,
    selectNode,
    expandNode,
    collapseNode,
  };
}
