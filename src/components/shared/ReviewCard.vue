<template>
  <div class="review-card glass rounded-2xl p-6 flex flex-col gap-4 h-full">
    <!-- Rating -->
    <div class="flex items-center justify-between gap-2">
      <StarRating :model-value="review.rating" readonly :size="18" />
      <span v-if="review.serviceType" class="service-badge">{{ review.serviceType }}</span>
    </div>

    <!-- Quote -->
    <p class="quote flex-1">
      <v-icon size="18" color="rgba(94,234,212,0.4)" class="quote-mark">mdi-format-quote-open</v-icon>
      {{ review.text }}
    </p>

    <!-- Author -->
    <div class="author">
      <p class="author-name">{{ review.name }}</p>
      <p v-if="review.business" class="author-business">{{ review.business }}</p>
    </div>
  </div>
</template>

<script setup>
import StarRating from '@/components/shared/StarRating.vue'

defineProps({
  review: { type: Object, required: true },
})
</script>

<style scoped>
.review-card {
  transition: transform 0.22s, box-shadow 0.22s;
}
.review-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
}

.service-badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.6rem;
  border-radius: 9999px;
  background: var(--color-accent-muted);
  border: 1px solid rgba(94, 234, 212, 0.25);
  color: var(--color-accent);
  white-space: nowrap;
}

.quote {
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}
.quote-mark {
  vertical-align: -2px;
  margin-right: 0.15rem;
}

.author {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 0.85rem;
}
.author-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--color-text-primary);
}
.author-business {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  margin-top: 0.1rem;
}
</style>
