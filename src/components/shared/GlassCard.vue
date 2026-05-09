<template>
  <div class="glass rounded-2xl p-6 h-full" :class="extraClass">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  extraClass: {
    type: String,
    default: '',
  },
})
</script>
