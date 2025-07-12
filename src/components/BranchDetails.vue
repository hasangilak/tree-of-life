<template>
  <div class="flex flex-col items-center justify-center w-full h-full p-8">
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
import { getFacts } from '../composables/useAnimalAssets';
defineProps<{ branch: BranchNode }>();
</script> 