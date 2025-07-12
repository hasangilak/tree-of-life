<template>
  <div class="md:flex md:flex-row" role="main" aria-label="Main content area">
    <div class="flex-1 h-screen flex">
      <div class="flex flex-col md:flex-row w-full h-full">
        <template v-if="hasChildren">
          <BranchDetails :branch="treeStore.selectedNode" />
        </template>
        <template v-else>
          <LeafDetails :leaf="treeStore.selectedNode" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTreeStore } from "../stores/tree";
import { computed } from "vue";
import LeafDetails from "./LeafDetails.vue";
import BranchDetails from "./BranchDetails.vue";
type TreeStoreType = ReturnType<typeof useTreeStore>;
const props = defineProps<{
  treeStore: TreeStoreType;
  sidebarOpen: boolean;
}>();

const hasChildren = computed(() => {
  return (
    props.treeStore.selectedNode &&
    props.treeStore.selectedNode.type === "branch" &&
    props.treeStore.selectedNode.children &&
    props.treeStore.selectedNode.children.length
  );
});
</script>
