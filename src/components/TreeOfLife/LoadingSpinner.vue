<template>
  <div class="spinner" aria-label="Loading">
    <svg width="32" height="32" viewBox="0 0 32 32">
      <circle
        class="path"
        cx="16"
        cy="16"
        r="14"
        fill="none"
        stroke-width="4"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
// No script needed
</script>

<style scoped>
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
.path {
  stroke: #38bdf8;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style> 