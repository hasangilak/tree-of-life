<template>
  <div class="flex flex-col md:flex-row w-full h-full">
    <div
      class="bg-center bg-no-repeat bg-cover flex items-center justify-center w-full h-64 md:h-full md:basis-3/5 md:w-3/5"
      :style="{ backgroundImage: `url('${getAnimalImage(leaf)}')` }"
    ></div>
    <div
      class="flex flex-col items-center justify-center w-full min-h-[100px] md:min-h-0 md:h-full md:basis-2/5 md:w-2/5 md:min-w-[300px]"
    >
      <span
        v-if="leaf.type === 'leaf'"
        class="text-4xl md:text-6xl font-extrabold text-secondary font-serif text-center mb-6 tracking-tight drop-shadow"
      >
        {{ leaf.data.name }}
      </span>
      <div class="w-2/3 h-0.5 bg-secondary rounded-full mb-6"></div>
      <span
        class="text-base md:text-lg text-accent font-serif text-center italic opacity-80 px-6"
      >
        {{ getFacts(leaf) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TreeNode } from '../types/tree';
import { getAnimalImage, getFacts } from '../composables/useAnimalAssets';
defineProps<{ leaf: TreeNode }>();
</script> 