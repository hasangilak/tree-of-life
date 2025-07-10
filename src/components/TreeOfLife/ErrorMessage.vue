<template>
  <div class="flex items-center gap-4 text-red-600 bg-red-50 border border-red-200 p-4 rounded-md">
    <slot />
    <button class="bg-sky-400 text-white border-none rounded px-4 py-2 cursor-pointer font-medium transition-colors duration-200 hover:bg-sky-600 retry-btn">
      Retry
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string }>();
</script> 