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

  function expandNode(nodeId: string) {
    const node = nodeMap.value.get(nodeId);
    if (!node || node.type !== "branch") return;
    // If this is the root node (no parentId), collapse all descendant branch nodes
    if (!node.parentId) {
      // Collect all descendant branch ids
      function collectDescendantBranchIds(n: TreeNode): string[] {
        let ids: string[] = [];
        if (n.type === "branch" && n.children) {
          n.children.forEach((child: TreeNode) => {
            if (child.type === "branch") {
              ids.push(child.id);
              ids = ids.concat(collectDescendantBranchIds(child));
            }
          });
        }
        return ids;
      }
      const descendantBranchIds = collectDescendantBranchIds(node);
      expandedNodes.value = expandedNodes.value.filter(
        (id) => !descendantBranchIds.includes(id)
      );
    }
    // Find siblings (nodes with the same parentId)
    const siblings = Array.from(nodeMap.value.values()).filter(
      (n) => n.parentId === node.parentId && n.type === "branch"
    );
    // Remove all siblings (including self) from expandedNodes
    expandedNodes.value = expandedNodes.value.filter(
      (id) => !siblings.some((s) => s.id === id)
    );
    // Add only the clicked node
    if (!expandedNodes.value.includes(nodeId)) {
      expandedNodes.value.push(nodeId);
    }
  }

  function selectNode(nodeId: string) {
    selectedNodeId.value = nodeId;
    const node = nodeMap.value.get(nodeId);
    // If selecting the root node, collapse all descendant branches
    if (node?.type === "branch" && !node.parentId) {
      function collectDescendantBranchIds(n: TreeNode): string[] {
        let ids: string[] = [];
        if (n.type === "branch" && n.children) {
          n.children.forEach((child: TreeNode) => {
            if (child.type === "branch") {
              ids.push(child.id);
              ids = ids.concat(collectDescendantBranchIds(child));
            }
          });
        }
        return ids;
      }
      const descendantBranchIds = collectDescendantBranchIds(node);
      expandedNodes.value = expandedNodes.value.filter(
        (id) => !descendantBranchIds.includes(id)
      );
    }
    if (node?.type === "branch" && !expandedNodes.value.includes(nodeId)) {
      expandNode(nodeId);
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
