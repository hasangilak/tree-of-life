<template>
  <aside
    class="bg-primary flex flex-col shadow-xl transition-transform duration-300 md:relative md:w-80 md:h-screen md:z-20 fixed top-0 left-0 h-full w-72 max-w-full z-40 md:translate-x-0"
    :class="[open ? 'translate-x-0' : '-translate-x-full', 'md:translate-x-0']"
    role="region"
    aria-label="Sidebar navigation"
  >
    <div class="p-6 pt-20 md:p-8 md:pt-8">
      <h1
        class="text-xl md:text-2xl font-bold text-accent tracking-wide mb-4"
        aria-label="App logo"
      >
        InDanger
      </h1>
      <nav aria-label="Tree navigation">
        <slot />
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean;
}>();
</script>
