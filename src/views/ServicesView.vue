<template>
  <section class="min-h-[calc(100vh-4rem)] px-4 py-20">
    <div class="max-w-5xl mx-auto flex flex-col gap-10">
      <!-- Header -->
      <div>
        <p class="section-label">What I offer</p>
        <h1 class="section-heading">Services</h1>
        <p class="section-intro">
          Need something built or automated? Here's how I can help. Every project is a
          little different, so prices below are starting points — reach out and we'll
          scope out exactly what you need.
        </p>
      </div>

      <!-- Service cards -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="service in services"
          :key="service.id"
          class="service-card glass rounded-2xl p-6 flex flex-col gap-4"
        >
          <!-- Icon tile -->
          <div class="icon-tile">
            <v-icon size="28" color="rgb(94,234,212)">{{ service.icon }}</v-icon>
          </div>

          <!-- Title + description -->
          <div>
            <h2 class="service-title">{{ service.title }}</h2>
            <p class="service-desc">{{ service.description }}</p>
          </div>

          <!-- Feature checklist -->
          <ul class="feature-list">
            <li v-for="feature in service.features" :key="feature">
              <v-icon size="16" color="rgb(94,234,212)">mdi-check</v-icon>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <!-- Tech chips -->
          <div class="flex flex-wrap gap-2">
            <TechChip v-for="chip in service.chips" :key="chip" :label="chip" />
          </div>

          <!-- Footer: price + CTA -->
          <div class="card-footer mt-auto">
            <span v-if="service.startingPrice" class="price-text">{{ service.startingPrice }}</span>
            <span v-else class="price-text price-text--quote">Want a Quote?</span>
            <button class="cta-btn" @click="openContact">
              Get in touch
              <v-icon size="16">mdi-arrow-right</v-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- What clients say (only shown once reviews exist) -->
      <div v-if="reviews.length" class="flex flex-col gap-6 mt-4">
        <div class="reviews-header">
          <div>
            <p class="section-label">Kind words</p>
            <h2 class="section-heading">What clients say</h2>
          </div>
          <div class="rating-tally" role="img" :aria-label="`Average rating ${averageRating.toFixed(1)} out of 5 from ${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'}`">
            <StarRating :model-value="Math.round(averageRating)" readonly :size="18" />
            <span class="tally-score">{{ averageRating.toFixed(1) }}</span>
            <span class="tally-count">{{ reviews.length }} {{ reviews.length === 1 ? 'review' : 'reviews' }}</span>
          </div>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
        </div>
      </div>

      <!-- Back link -->
      <div>
        <button class="back-btn" @click="router.push('/')">
          <v-icon size="18">mdi-arrow-left</v-icon>
          Back to Home
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { services } from '@/data/services.js'
import { reviews } from '@/data/reviews.js'
import { useContactModal } from '@/composables/useContactModal'
import TechChip from '@/components/shared/TechChip.vue'
import ReviewCard from '@/components/shared/ReviewCard.vue'
import StarRating from '@/components/shared/StarRating.vue'

const router = useRouter()
const { open: openContact } = useContactModal()

// Aggregate tally shown beside the "What clients say" heading.
const averageRating = computed(() =>
  reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0
)
</script>

<style scoped>
.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.25rem;
}
.section-heading {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--color-text-primary);
}
.section-intro {
  margin-top: 0.75rem;
  max-width: 42rem;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

/* Reviews header: heading on the left, aggregate tally on the right */
.reviews-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}
.rating-tally {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.9rem;
  border-radius: 9999px;
  background: var(--color-surface-glass);
  border: 1px solid var(--color-glass-border);
  backdrop-filter: blur(var(--blur-glass));
  -webkit-backdrop-filter: blur(var(--blur-glass));
}
.tally-score {
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--color-text-primary);
  line-height: 1;
}
.tally-count {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  padding-left: 0.6rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.service-card {
  transition: transform 0.22s, box-shadow 0.22s;
}
.service-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
}

.icon-tile {
  width: 3rem;
  height: 3rem;
  border-radius: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-muted);
  border: 1px solid rgba(94, 234, 212, 0.2);
}

.service-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.4rem;
  line-height: 1.35;
}
.service-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}
.feature-list li :deep(.v-icon) {
  margin-top: 0.1rem;
  flex-shrink: 0;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.price-text {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text-primary);
}
.price-text--quote {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 1rem;
  border-radius: 0.6rem;
  background: var(--color-accent-muted);
  border: 1px solid rgba(94, 234, 212, 0.25);
  color: var(--color-accent);
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: gap 0.2s, background 0.2s;
}
.cta-btn:hover {
  background: rgba(94, 234, 212, 0.2);
  gap: 0.6rem;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 0.6rem;
  background: var(--color-accent-muted);
  border: 1px solid rgba(94, 234, 212, 0.25);
  color: var(--color-accent);
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  transition: background 0.2s;
}
.back-btn:hover { background: rgba(94, 234, 212, 0.2); }
</style>
