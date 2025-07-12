<script setup lang="ts">
import TreeOfLife from "./components/TreeOfLife/TreeOfLife.vue";
import Sidebar from "./components/Sidebar.vue";
import HamburgerMenu from "./components/HamburgerMenu.vue";
import MainContent from "./components/MainContent.vue";
import { ref } from "vue";
import { useTreeStore } from "./stores/tree";
import type { TreeNode } from "./types/tree";

const treeStore = useTreeStore();
const sidebarOpen = ref(false);

function handleSelectNode(node: TreeNode | null) {
  treeStore.setSelectedNode(node);
}

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function closeSidebar() {
  sidebarOpen.value = false;
}
</script>

<template>
  <div class="flex bg-primary text-primary min-h-screen overflow-hidden">
    <div
      class="fixed inset-0 z-30 bg-black/[0.02] md:hidden"
      @click="closeSidebar"
      aria-label="Close sidebar overlay"
      tabindex="0"
      @keydown.enter="closeSidebar"
    ></div>
    <Sidebar :open="sidebarOpen">
      <TreeOfLife @select-node="handleSelectNode" />
    </Sidebar>
    <HamburgerMenu @open="toggleSidebar" />
    <MainContent/>
  </div>
</template>
