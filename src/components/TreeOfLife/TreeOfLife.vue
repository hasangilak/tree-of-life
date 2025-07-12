<template>
  <div class="min-h-[400px]" role="tree" aria-label="Tree of Life Navigation">
    <div
      v-if="isLoading"
      class="flex items-center justify-center min-h-[200px]"
    >
      <LoadingSpinner />
    </div>
    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-[200px]"
    >
      <ErrorMessage :message="error" @retry="fetchTreeData" />
    </div>
    <template v-else>
      <TreeNode
        v-for="node in visibleNodes"
        :key="node.id"
        :node="node"
        :is-selected="selectedNodeId === node.id"
        :is-expanded="expandedNodes.includes(node.id)"
        :depth="getNodeDepth(node.id, nodeMap)"
        @select="handleNodeSelect"
        @expand="handleNodeExpand"
        @collapse="handleNodeCollapse"
        @keydown="handleKeyNavigation"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useTreeData } from "../../composables/useTreeData";
import { useTreeNavigation } from "../../composables/useTreeNavigation";
import type { TreeNode as TreeNodeType } from "../../types/tree";
// import { useKeyboardNavigation } from '../../composables/useKeyboardNavigation';
import LoadingSpinner from "./LoadingSpinner.vue";
import ErrorMessage from "./ErrorMessage.vue";
import TreeNode from "./TreeNode.vue";
import { getNodeDepth } from '../../utils/treeHelpers';

const emit = defineEmits<{
  (e: "select-node", node: TreeNodeType | null): void;
}>();

const { treeData, isLoading, error, fetchTreeData } = useTreeData();
const {
  selectedNodeId,
  expandedNodes,
  visibleNodes,
  nodeMap,
  selectNode,
  expandNode,
  collapseNode,
} = useTreeNavigation(treeData);
// const { handleKeyNavigation } = useKeyboardNavigation(selectNode);

onMounted(() => {
  fetchTreeData();
});

watch(selectedNodeId, (id) => {
  if (id) {
    const node = visibleNodes.value.find((n: TreeNodeType) => n.id === id) || null;
    emit("select-node", node);
  }
});

function handleNodeSelect(nodeId: string) {
  selectNode(nodeId);
}
function handleNodeExpand(nodeId: string) {
  expandNode(nodeId);
}
function handleNodeCollapse(nodeId: string) {
  collapseNode(nodeId);
}
function handleKeyNavigation() {
  // Placeholder for keyboard navigation logic
}
</script>
