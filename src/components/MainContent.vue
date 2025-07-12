<template>
  <div class="w-full" role="main" aria-label="Main content area">
    <div class="flex-1 h-screen flex">
      <div class="flex flex-col md:flex-row w-full h-full" v-if="treeStore.selectedNode">
        <template v-if="treeStore.selectedNode?.type === 'branch'">
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
import LeafDetails from "./LeafDetails.vue";
import BranchDetails from "./BranchDetails.vue";

const treeStore = useTreeStore();
</script>
