<template>
  <div class="error-message" role="alert">
    <span>{{ message }}</span>
    <button @click="$emit('retry')" class="retry-btn">Retry</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ message: string }>();
</script>

<style scoped>
.error-message {
  color: #ef4444;
  background: #fef2f2;
  border: 1px solid #fecaca;
  padding: 1rem 2rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.retry-btn {
  background: #38bdf8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}
.retry-btn:hover {
  background: #0ea5e9;
}
</style> 