<template>
  <div v-if="branch.children && branch.children.length" class="flex flex-col md:flex-row w-full h-full">
    <div
      v-motion
      :initial="{ flex: 1 }"
      :hovered="{ flex: 1.7 }"
      :transition="{ type: 'tween', duration: 0.5 }"
      v-for="child in branch.children"
      :key="child.type === 'branch' ? 'branch-' + child.label : 'leaf-' + child.data.name"
      class="relative flex items-center justify-center h-64 md:h-full min-w-0 overflow-hidden group cursor-pointer transition-all duration-500 shadow-lg border-b md:border-b-0 md:border-r border-secondary"
    >
      <div
        class="absolute inset-0 bg-center bg-cover transition-all duration-500 grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-75 group-hover:scale-105"
        :style="{ backgroundImage: `url('${getAnimalImage(child)}')` }"
      ></div>
      <div class="absolute inset-0 bg-primary/5"></div>
      <div class="relative z-10 flex items-center justify-center w-full h-full">
        <span class="text-2xl md:text-5xl font-bold text-secondary font-serif text-center w-full">
          {{ child.type === 'branch' ? child.label : child.data.name }}
        </span>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center justify-center w-full h-full p-8">
    <span
      class="text-4xl md:text-6xl font-extrabold text-secondary font-serif text-center mb-6 tracking-tight drop-shadow"
    >
      {{ branch.label }}
    </span>
    <div class="w-2/3 h-0.5 bg-secondary rounded-full mb-6"></div>
    <span
      class="text-base md:text-lg text-accent font-serif text-center italic opacity-80 px-6"
    >
      {{ getFacts(branch) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { BranchNode } from '../types/tree';
import { getAnimalImage, getFacts } from '../composables/useAnimalAssets';
defineProps<{ branch: BranchNode }>();
</script> 