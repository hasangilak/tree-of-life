<template>
  <button
    class="fixed top-4 left-4 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-primary shadow-md text-accent md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
    @click="$emit('open')"
    aria-label="Open menu"
    :aria-pressed="false"
    tabindex="0"
    @keydown.enter="$emit('open')"
    @keydown.space.prevent="$emit('open')"
  >
    <svg
      class="w-7 h-7"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
defineEmits(['open']);
</script> 