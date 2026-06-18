<template>
  <section class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
    <div class="max-w-2xl w-full mx-auto flex flex-col gap-8">
      <!-- Heading -->
      <div>
        <p class="text-xs font-semibold tracking-widest uppercase text-[color:var(--color-accent)] mb-1">
          Your feedback
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-[color:var(--color-text-primary)]">
          Leave a Review
        </h2>
        <p class="text-[color:var(--color-text-secondary)] mt-2">
          Thanks for working with me! If you have a minute, I'd love to hear how it went.
        </p>
      </div>

      <!-- Form card -->
      <GlassCard>
        <!-- Success state -->
        <div v-if="submitted" class="flex flex-col items-center text-center gap-3 py-8">
          <div class="success-badge">
            <v-icon size="34" color="rgb(94,234,212)">mdi-check</v-icon>
          </div>
          <h3 class="text-xl font-bold text-[color:var(--color-text-primary)]">Review submitted</h3>
          <p class="text-[color:var(--color-text-secondary)] max-w-sm">
            Thank you for the kind words — I really appreciate you taking the time.
          </p>
          <router-link to="/" class="mt-2 back-link">
            <v-icon size="18">mdi-arrow-left</v-icon>
            Back to Home
          </router-link>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="submit" class="flex flex-col gap-5">
          <!-- Name -->
          <div class="form-group">
            <label for="rv-name" class="form-label">Name</label>
            <input
              id="rv-name"
              v-model="form.name"
              type="text"
              required
              placeholder="Jane Smith"
              class="form-input"
            />
          </div>

          <!-- Business -->
          <div class="form-group">
            <label for="rv-business" class="form-label">Business <span class="optional">(optional)</span></label>
            <input
              id="rv-business"
              v-model="form.business"
              type="text"
              placeholder="Acme Co."
              class="form-input"
            />
          </div>

          <!-- Email -->
          <div class="form-group">
            <label for="rv-email" class="form-label">Email <span class="optional">(optional)</span></label>
            <input
              id="rv-email"
              v-model="form.email"
              type="email"
              placeholder="jane@example.com"
              class="form-input"
            />
          </div>

          <!-- Service type -->
          <div class="form-group">
            <label for="rv-service" class="form-label">What did I help with?</label>
            <select id="rv-service" v-model="form.serviceType" required class="form-input">
              <option value="" disabled>Select a service…</option>
              <option v-for="opt in serviceOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>

          <!-- Rating -->
          <div class="form-group">
            <label class="form-label">Rating</label>
            <StarRating v-model="form.rating" :size="30" />
          </div>

          <!-- Review text -->
          <div class="form-group">
            <label for="rv-text" class="form-label">Your review</label>
            <textarea
              id="rv-text"
              v-model="form.text"
              required
              rows="5"
              placeholder="What was it like working together? How did the result turn out?"
              class="form-input resize-none"
            ></textarea>
          </div>

          <!-- Consent -->
          <label class="consent">
            <input v-model="form.consent" type="checkbox" class="consent-box" />
            <span>You may publish this review (with my name and business) on taimeade.github.io</span>
          </label>

          <!-- Honeypot: hidden from real users; bots fill it and get dropped -->
          <div class="honeypot" aria-hidden="true">
            <label for="rv-website">Website</label>
            <input
              id="rv-website"
              v-model="form.website"
              type="text"
              tabindex="-1"
              autocomplete="off"
            />
          </div>

          <!-- Feedback -->
          <Transition name="fade">
            <p v-if="feedback" :class="feedbackClass" class="text-sm font-medium">
              {{ feedback }}
            </p>
          </Transition>

          <button type="submit" class="submit-btn" :disabled="sending">
            <v-icon v-if="sending" size="18" class="animate-spin">mdi-loading</v-icon>
            <v-icon v-else size="18">mdi-send-outline</v-icon>
            {{ sending ? 'Submitting…' : 'Submit Review' }}
          </button>
        </form>
      </GlassCard>
    </div>
  </section>
</template>

<script setup>
import GlassCard from '@/components/shared/GlassCard.vue'
import StarRating from '@/components/shared/StarRating.vue'
import { useReviewForm, serviceOptions } from '@/composables/useReviewForm'

const { form, sending, submitted, feedback, feedbackClass, submit } = useReviewForm()
</script>

<style scoped>
.form-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 0.4rem;
}
.optional {
  color: var(--color-text-muted);
  font-weight: 400;
}

.form-input {
  width: 100%;
  padding: 0.65rem 0.9rem;
  border-radius: 0.6rem;
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-glass-border);
  color: var(--color-text-primary);
  font-size: 0.92rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-input::placeholder { color: var(--color-text-muted); }
.form-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-muted);
}

/* Native select arrow + dark option list */
select.form-input {
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235eead4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  padding-right: 2.4rem;
  cursor: pointer;
}
select.form-input option { background: #0d1624; color: var(--color-text-primary); }

/* Consent checkbox */
.consent {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--color-text-secondary);
  cursor: pointer;
}
.consent-box {
  margin-top: 0.15rem;
  width: 1.05rem;
  height: 1.05rem;
  flex-shrink: 0;
  accent-color: var(--color-accent);
  cursor: pointer;
}

/* Honeypot: kept in the DOM (so bots find it) but off-screen for humans */
.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.6rem;
  background: var(--color-accent);
  color: #0a0e1a;
  font-weight: 600;
  font-size: 0.92rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.submit-btn:hover:not(:disabled) {
  background: var(--color-accent-dim);
  transform: translateY(-1px);
}
.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

/* Success state */
.success-badge {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-muted);
  border: 1px solid rgba(94, 234, 212, 0.25);
}
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-accent);
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: gap 0.2s;
}
.back-link:hover { gap: 0.65rem; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
