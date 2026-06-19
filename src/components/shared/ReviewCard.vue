<template>
  <div class="review-card glass rounded-2xl p-6 flex flex-col gap-4 h-full">
    <!-- Rating -->
    <div class="flex items-center justify-between gap-2">
      <StarRating :model-value="review.rating" readonly :size="18" />
      <span v-if="review.serviceType" class="service-badge">{{ review.serviceType }}</span>
    </div>

    <!-- Quote (clamped) + trigger; grouped so the author block stays pinned to the bottom -->
    <div class="quote-block flex-1">
      <p ref="quoteEl" class="quote quote--clamped">
        <v-icon size="18" color="rgba(94,234,212,0.4)" class="quote-mark">mdi-format-quote-open</v-icon>
        {{ review.text }}
      </p>
      <button v-if="truncated" class="more-btn" @click="modalOpen = true">
        Read full review
        <v-icon size="14">mdi-arrow-right</v-icon>
      </button>
    </div>

    <!-- Author -->
    <div class="author">
      <p class="author-name">{{ review.name }}</p>
      <p v-if="review.business" class="author-business">{{ review.business }}</p>
    </div>

    <ReviewModal :review="review" :show="modalOpen" @close="modalOpen = false" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import StarRating from '@/components/shared/StarRating.vue'
import ReviewModal from '@/components/shared/ReviewModal.vue'

defineProps({
  review: { type: Object, required: true },
})

const quoteEl = ref(null)
const truncated = ref(false)
const modalOpen = ref(false)

// The "Read full review" trigger only appears when the quote is actually
// clipped, so short reviews read in full right on the card.
function checkTruncation() {
  const el = quoteEl.value
  if (!el) return
  truncated.value = el.scrollHeight > el.clientHeight + 2
}

onMounted(() => {
  requestAnimationFrame(checkTruncation)
  window.addEventListener('resize', checkTruncation)
})
onBeforeUnmount(() => window.removeEventListener('resize', checkTruncation))
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

.quote-block {
  display: flex;
  flex-direction: column;
}
.quote {
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}
.quote--clamped {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.quote-mark {
  vertical-align: -2px;
  margin-right: 0.15rem;
}

.more-btn {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.65rem;
  padding: 0;
  background: none;
  border: none;
  color: var(--color-accent);
  font-weight: 600;
  font-size: 0.82rem;
  cursor: pointer;
  transition: gap 0.2s;
}
.more-btn:hover { gap: 0.55rem; }
.more-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 4px;
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
