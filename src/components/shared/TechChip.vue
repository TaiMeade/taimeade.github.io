<template>
  <a
    v-if="href"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="tech-chip"
  >{{ label }}</a>
  <span v-else class="tech-chip">{{ label }}</span>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  href:  { type: String, default: null },
})
</script>

<style scoped>
.tech-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
  background: var(--color-accent-muted);
  border: 1px solid rgba(94, 234, 212, 0.25);
  color: var(--color-accent);
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s;
  white-space: nowrap;
}

.tech-chip:hover {
  background: rgba(94, 234, 212, 0.25);
  border-color: var(--color-accent);
}
</style>
