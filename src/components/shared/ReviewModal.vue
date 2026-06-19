<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-backdrop" @click.self="emit('close')">
        <div
          class="review-modal glass rounded-2xl"
          role="dialog"
          aria-modal="true"
          :aria-label="`Review from ${review.name}`"
        >
          <button ref="closeEl" class="close-btn" aria-label="Close review" @click="emit('close')">
            <v-icon>mdi-close</v-icon>
          </button>

          <!-- Oversized accent quote glyph — the modal's signature flourish -->
          <v-icon class="modal-quote-mark" color="rgba(94,234,212,0.16)">mdi-format-quote-open</v-icon>

          <div class="flex items-center gap-3 mb-5">
            <StarRating :model-value="review.rating" readonly :size="20" />
            <span v-if="review.serviceType" class="service-badge">{{ review.serviceType }}</span>
          </div>

          <p class="modal-quote">{{ review.text }}</p>

          <div class="modal-author">
            <span class="avatar" aria-hidden="true">{{ initials }}</span>
            <div>
              <p class="author-name">{{ review.name }}</p>
              <p v-if="review.business" class="author-business">{{ review.business }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import StarRating from '@/components/shared/StarRating.vue'

const props = defineProps({
  review: { type: Object, required: true },
  show: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

const closeEl = ref(null)

// Monogram from the reviewer's first + last initial, for the avatar.
const initials = computed(() => {
  const parts = props.review.name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
})

function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
}

// Wire up Escape-to-close, lock background scroll, and focus the close
// button while the modal is open; tear it all down when it closes.
watch(
  () => props.show,
  (open) => {
    if (open) {
      document.addEventListener('keydown', onKeydown)
      document.body.style.overflow = 'hidden'
      nextTick(() => closeEl.value?.focus())
    } else {
      document.removeEventListener('keydown', onKeydown)
      document.body.style.overflow = ''
    }
  }
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(3, 6, 14, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

/* Frosted-glass panel — same .glass token the cards use, just sized up a touch */
.review-modal {
  position: relative;
  width: 100%;
  max-width: 440px;
  padding: 1.75rem;
  max-height: 85vh;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-glass-border);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text-primary);
}
.close-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.modal-quote-mark {
  font-size: 2.5rem !important;
  height: auto !important;
  width: auto !important;
  line-height: 0.6;
  margin-bottom: 0.6rem;
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

.modal-quote {
  font-size: 0.96rem;
  line-height: 1.7;
  color: var(--color-text-primary);
  white-space: pre-line;
}

.modal-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.4rem;
  padding-top: 1.1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 9999px;
  background: var(--color-accent-muted);
  border: 1px solid rgba(94, 234, 212, 0.3);
  color: var(--color-accent);
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.02em;
}
.author-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--color-text-primary);
}
.author-business {
  font-size: 0.84rem;
  color: var(--color-text-muted);
  margin-top: 0.1rem;
}

/* Modal transition — opacity only, so reduced-motion needs no special case */
.modal-enter-active { transition: opacity 0.25s ease; }
.modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from,
.modal-leave-to { opacity: 0; }
</style>
