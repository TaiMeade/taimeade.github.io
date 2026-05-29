import { reactive, ref } from 'vue'
import emailjs from '@emailjs/browser'

// Public EmailJS IDs, pulled from env so every site/component shares one source
// of truth instead of hardcoding them in each component.
const config = {
  publicKey:  import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  serviceId:  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
}

// Initialise the SDK exactly once for the whole app, no matter how many forms
// mount.
let initialised = false
function init() {
  if (initialised) return
  emailjs.init({
    publicKey: config.publicKey,
    blockHeadless: true,
    limitRate: { id: 'portfolio-contact', throttle: 10000 },
  })
  initialised = true
}

// Bots typically submit the instant the form exists; require a small human
// delay before a submission is treated as real.
const MIN_SUBMIT_MS = 1500

const SUCCESS_MESSAGE = "Message sent! I'll get back to you soon."
const ERROR_MESSAGE   = 'Something went wrong. Please try again.'
const SUCCESS_CLASS   = 'text-[color:var(--color-accent)]'
const ERROR_CLASS     = 'text-red-400'

// Shared contact-form logic: reactive state, spam guards, and EmailJS send.
// Each call returns a fresh, independent form instance.
export function useContactForm() {
  init()

  // `website` is a honeypot — hidden from real users, so any value means a bot.
  const form = reactive({ name: '', email: '', message: '', website: '' })
  const sending  = ref(false)
  const feedback = ref('')
  const feedbackClass = ref('')

  // Resets on each call; the modal also resets it when reopened (see startTimer).
  let startedAt = Date.now()

  function reset() {
    form.name = form.email = form.message = form.website = ''
  }

  function clearFeedback() {
    feedback.value = ''
  }

  // Restart the human-delay timer — used when a reused form (e.g. a modal) is
  // shown again so the time check stays meaningful.
  function startTimer() {
    startedAt = Date.now()
  }

  function showSuccess() {
    feedback.value = SUCCESS_MESSAGE
    feedbackClass.value = SUCCESS_CLASS
  }

  async function submit() {
    sending.value = true
    feedback.value = ''

    // Honeypot filled, or submitted suspiciously fast → silently drop it but
    // show success so bots get no signal that they were caught.
    if (form.website || Date.now() - startedAt < MIN_SUBMIT_MS) {
      showSuccess()
      reset()
      sending.value = false
      return
    }

    try {
      await emailjs.send(config.serviceId, config.templateId, {
        name:    form.name,
        email:   form.email,
        message: form.message,
      })
      showSuccess()
      reset()
    } catch {
      feedback.value = ERROR_MESSAGE
      feedbackClass.value = ERROR_CLASS
    } finally {
      sending.value = false
    }
  }

  return { form, sending, feedback, feedbackClass, submit, reset, clearFeedback, startTimer }
}
