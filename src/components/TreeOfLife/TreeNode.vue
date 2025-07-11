<template>
  <div
    :class="[
      'flex items-center min-h-[40px] cursor-pointer rounded transition-colors',
      isSelected ? 'bg-secondary font-bold' : '',
      isExpanded ? 'bg-primary' : '',
      hasChildren ? '' : '',
    ]"
    :style="{ paddingLeft: `${depth * 20}px` }"
    role="treeitem"
    :aria-selected="isSelected"
    :aria-expanded="hasChildren ? isExpanded : undefined"
    :tabindex="isSelected ? 0 : -1"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <div class="flex items-center w-full">
      <button
        v-if="hasChildren && node.type === 'branch'"
        class="bg-transparent border-none cursor-pointer text-lg w-6 h-6 flex items-center justify-center mr-2 text-accent"
        :aria-label="isExpanded ? 'Collapse' : 'Expand'"
        @click.stop="handleExpand"
      >
        <span>{{ isExpanded ? "-" : "+" }}</span>
      </button>
      <span class="flex-1">
        <template v-if="node.type === 'branch'">
          <span class="ml-2 text-accent"> {{ node.label }}</span>
        </template>
        <template v-else-if="node.type === 'leaf'">
          <span class="ml-2 text-accent">{{ node.data?.name }}</span>
          <span v-if="node.data?.status" class="ml-2 text-secondary text-sm">
            ({{ node.data.status }})
          </span>
        </template>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { TreeNode } from "../../types/tree";

interface Props {
  node: TreeNode;
  isSelected: boolean;
  isExpanded: boolean;
  depth: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "select", nodeId: string): void;
  (e: "expand", nodeId: string): void;
  (e: "collapse", nodeId: string): void;
}>();

const hasChildren = computed(
  () => props.node.type === "branch" && props.node.children.length > 0
);

function handleClick() {
  emit("select", props.node.id);
}

function handleExpand() {
  if (props.isExpanded) {
    emit("collapse", props.node.id);
  } else {
    emit("expand", props.node.id);
  }
}

function handleKeydown() {
  // Placeholder for keyboard navigation logic
}
</script>
