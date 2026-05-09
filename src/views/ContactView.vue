<template>
  <section class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
    <div class="max-w-2xl w-full mx-auto flex flex-col gap-8">
      <!-- Heading -->
      <div>
        <p class="text-xs font-semibold tracking-widest uppercase text-[color:var(--color-accent)] mb-1">
          Reach out
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-[color:var(--color-text-primary)]">
          Contact Me
        </h2>
        <p class="text-[color:var(--color-text-secondary)] mt-2">
          Have a question, opportunity, or just want to say hello? Drop me a message.
        </p>
      </div>

      <!-- Form card -->
      <GlassCard>
        <form @submit.prevent="submit" class="flex flex-col gap-5">
          <!-- Name -->
          <div class="form-group">
            <label for="name" class="form-label">Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="Jane Smith"
              class="form-input"
            />
          </div>

          <!-- Email -->
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              placeholder="jane@example.com"
              class="form-input"
            />
          </div>

          <!-- Message -->
          <div class="form-group">
            <label for="message" class="form-label">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="5"
              placeholder="Your message..."
              class="form-input resize-none"
            ></textarea>
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
            {{ sending ? 'Sending…' : 'Send Message' }}
          </button>
        </form>
      </GlassCard>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import emailjs from '@emailjs/browser'
import GlassCard from '@/components/shared/GlassCard.vue'

emailjs.init({
  publicKey: '1AkByoDhGNFhkKR8P',
  blockHeadless: true,
  limitRate: { id: 'portfolio-contact', throttle: 10000 },
})

const form = reactive({ name: '', email: '', message: '' })
const sending = ref(false)
const feedback = ref('')
const feedbackClass = ref('')

async function submit() {
  sending.value = true
  feedback.value = ''

  try {
    await emailjs.send('service_o1nb8bf', 'template_7x07rj7', {
      name:    form.name,
      email:   form.email,
      message: form.message,
    })
    feedback.value = 'Message sent! I\'ll get back to you soon.'
    feedbackClass.value = 'text-[color:var(--color-accent)]'
    form.name = ''
    form.email = ''
    form.message = ''
  } catch {
    feedback.value = 'Something went wrong. Please try again.'
    feedbackClass.value = 'text-red-400'
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
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

.form-input::placeholder {
  color: var(--color-text-muted);
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

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
