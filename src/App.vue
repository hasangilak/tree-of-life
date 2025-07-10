<script setup lang="ts">
import TreeOfLife from "./components/TreeOfLife/TreeOfLife.vue";
import { ref } from "vue";
import { useTreeStore } from "./stores/tree";
import type { TreeNode } from "./types/tree";

const panels = [
  { title: "Elephants" },
  { title: "Pandas" },
  { title: "Tigers" },
  { title: "Gorillas" },
];

const currentSlide = ref(1);
const totalSlides = panels.length;

const handlePanelHover = (idx: number) => {
  currentSlide.value = idx + 1;
};

const treeStore = useTreeStore();
function handleSelectNode(node: TreeNode | null) {
  treeStore.setSelectedNode(node);
}

function getAnimalImage(child: TreeNode): string {
  const name = child.type === 'branch' ? child.label : child.data.name;
  const images: Record<string, string> = {
    Elephants: " http://unsplash.it/600/800?random",
    Pandas: "https://source.unsplash.com/600x800/?Pandas",
    Tigers: "https://source.unsplash.com/600x800/?Tigers",
    Gorillas: "https://source.unsplash.com/600x800/?Gorillas", 
    // Add more as needed
  };
  return images[name] || "http://unsplash.it/600/800?random/?" + name;
}
</script>

<template>
  <div class="bg-primary text-primary min-h-screen overflow-hidden">
    <!-- Sidebar -->
    <div
      class="fixed left-0 top-0 w-80 h-full bg-primary z-20 flex flex-col shadow-xl"
    >
      <div class="p-8">
        <h1 class="text-2xl font-bold text-accent tracking-wide mb-4">
          InDanger
        </h1>
        <TreeOfLife @select-node="handleSelectNode" />
      </div>
      <div class="p-8 mt-auto">
        <div class="text-muted text-sm font-light">
          <span>{{ String(currentSlide).padStart(2, "0") }}</span> /
          <span>{{ String(totalSlides).padStart(2, "0") }}</span>
        </div>
      </div>
    </div>
    <!-- Top right buttons -->
    <div class="fixed top-6 right-6 z-30 flex items-center space-x-4">
      <button
        class="w-10 h-10 flex items-center justify-center text-accent hover:text-muted transition-colors"
        aria-label="Search"
      >
        <i class="ri-search-line ri-lg" />
      </button>
      <button
        class="w-10 h-10 flex items-center justify-center text-accent hover:text-muted transition-colors"
        aria-label="Menu"
      >
        <i class="ri-menu-line ri-lg" />
      </button>
    </div>
    <!-- Main content panels -->
    <div class="ml-80 h-screen flex">
      <div class="flex w-full h-full">
        <template
          v-if="
            treeStore.selectedNode &&
            treeStore.selectedNode.type === 'branch' &&
            treeStore.selectedNode.children &&
            treeStore.selectedNode.children.length
          "
        >
          <div class="flex w-full h-full">
            <div
              v-motion
              :initial="{ flex: 1 }"
              :hovered="{ flex: 1.7 }"
              :transition="{ type: 'tween', duration: 0.5 }"
              v-for="(child, idx) in treeStore.selectedNode.children"
              :key="child.type === 'branch' ? 'branch-' + child.label : 'leaf-' + child.data.name"
              class="relative flex items-center justify-center h-full min-w-0 overflow-hidden group cursor-pointer transition-all duration-500 shadow-lg"
              :class="
                idx !== treeStore.selectedNode.children.length - 1
                  ? 'border-r border-secondary'
                  : ''
              "
            >
              <!-- Background image -->
              <div
                class="absolute inset-0 bg-center bg-cover transition-all duration-500 grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-75 group-hover:scale-105"
                :style="{
                  backgroundImage: `url('${getAnimalImage(child)}')`,
                }"
              ></div>
              <!-- Overlay -->
              <div class="absolute inset-0 bg-primary bg-opacity-60"></div>
              <!-- Animal name -->
              <div
                class="relative z-10 flex items-center justify-center w-full h-full"
              >
                <span
                  class="text-5xl font-bold text-secondary font-serif text-center w-full"
                >
                  {{ child.type === 'branch' ? child.label : child.data.name }}
                </span>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="text-muted m-auto">Select a node to see details.</div>
        </template>
      </div>
    </div>
  </div>
</template>
