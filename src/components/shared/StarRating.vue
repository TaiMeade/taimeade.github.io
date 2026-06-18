<template>
  <div
    class="star-rating"
    :class="{ 'star-rating--interactive': !readonly }"
    role="img"
    :aria-label="`${modelValue} out of ${max} stars`"
    @mouseleave="hovered = 0"
  >
    <component
      :is="readonly ? 'span' : 'button'"
      v-for="star in max"
      :key="star"
      :type="readonly ? undefined : 'button'"
      class="star-btn"
      :tabindex="readonly ? undefined : 0"
      :aria-label="readonly ? undefined : `Rate ${star} ${star === 1 ? 'star' : 'stars'}`"
      @click="!readonly && emit('update:modelValue', star)"
      @mouseenter="!readonly && (hovered = star)"
      @focus="!readonly && (hovered = star)"
    >
      <v-icon :size="size" :color="star <= displayValue ? 'rgb(94,234,212)' : undefined">
        {{ star <= displayValue ? 'mdi-star' : 'mdi-star-outline' }}
      </v-icon>
    </component>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  readonly: { type: Boolean, default: false },
  size: { type: [Number, String], default: 24 },
  max: { type: Number, default: 5 },
})

const emit = defineEmits(['update:modelValue'])

// While hovering an interactive rating, preview that value instead of the set one.
const hovered = ref(0)
const displayValue = computed(() =>
  !props.readonly && hovered.value ? hovered.value : props.modelValue
)
</script>

<style scoped>
.star-rating {
  display: inline-flex;
  align-items: center;
  gap: 0.15rem;
}
.star-btn {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  line-height: 0;
  color: var(--color-text-muted);
}
.star-rating--interactive .star-btn {
  cursor: pointer;
  transition: transform 0.15s;
}
.star-rating--interactive .star-btn:hover {
  transform: scale(1.15);
}
.star-rating--interactive .star-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 4px;
}
</style>
