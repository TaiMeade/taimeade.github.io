<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-backdrop" @click.self="close">
        <div class="modal-panel rounded-2xl">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <div>
              <p class="text-xs font-semibold tracking-widest uppercase text-[color:var(--color-accent)] mb-1">
                Reach out
              </p>
              <h2 class="text-2xl font-bold text-[color:var(--color-text-primary)]">Contact Me</h2>
            </div>
            <button class="close-btn" @click="close" aria-label="Close">
              <v-icon>mdi-close</v-icon>
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="submit" class="flex flex-col gap-4">
            <div>
              <label for="modal-name" class="form-label">Name</label>
              <input
                id="modal-name"
                v-model="form.name"
                type="text"
                required
                placeholder="Jane Smith"
                class="form-input"
              />
            </div>

            <div>
              <label for="modal-email" class="form-label">Email</label>
              <input
                id="modal-email"
                v-model="form.email"
                type="email"
                required
                placeholder="jane@example.com"
                class="form-input"
              />
            </div>

            <div>
              <label for="modal-message" class="form-label">Message</label>
              <textarea
                id="modal-message"
                v-model="form.message"
                required
                rows="4"
                placeholder="Your message..."
                class="form-input resize-none"
              ></textarea>
            </div>

            <!-- Honeypot: hidden from real users; bots fill it and get dropped -->
            <div class="honeypot" aria-hidden="true">
              <label for="modal-website">Website</label>
              <input
                id="modal-website"
                v-model="form.website"
                type="text"
                tabindex="-1"
                autocomplete="off"
              />
            </div>

            <Transition name="fade">
              <p v-if="feedback" :class="feedbackClass" class="text-sm font-medium">
                {{ feedback }}
              </p>
            </Transition>

            <button type="submit" class="submit-btn" :disabled="sending">
              <v-icon v-if="sending" size="18" class="animate-spin">mdi-loading</v-icon>
              <v-icon v-else size="18">mdi-send-outline</v-icon>
              {{ sending ? 'Sending…' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from 'vue'
import { useContactModal } from '@/composables/useContactModal'
import { useContactForm } from '@/composables/useContactForm'

const { show, close } = useContactModal()
const { form, sending, feedback, feedbackClass, submit, clearFeedback, startTimer } = useContactForm()

// Reset feedback and restart the human-delay timer each time the modal opens.
watch(show, (val) => {
  if (val) {
    clearFeedback()
    startTimer()
  }
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-panel {
  width: 100%;
  max-width: 540px;
  padding: 2rem;
  max-height: 90vh;
  overflow-y: auto;
  background: #0d1624;
  border: 1px solid var(--color-glass-border);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.7);
}

.close-btn {
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

.form-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 0.4rem;
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

/* Honeypot: kept in the DOM (so bots find it) but off-screen for humans */
.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.form-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-muted);
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

/* Modal transition */
.modal-enter-active { transition: opacity 0.25s ease; }
.modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
