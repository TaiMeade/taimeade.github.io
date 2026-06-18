import { reactive, ref } from 'vue'
import emailjs from '@emailjs/browser'
import { services } from '@/data/services.js'

// Reuses the same EmailJS service + template as the contact form (see
// useContactForm.js) — the review is composed into the template's existing
// name / email / message params, so no extra EmailJS setup is required.
const config = {
  publicKey:  import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  serviceId:  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
}

let initialised = false
function init() {
  if (initialised) return
  emailjs.init({
    publicKey: config.publicKey,
    blockHeadless: true,
    limitRate: { id: 'portfolio-review', throttle: 10000 },
  })
  initialised = true
}

// Bots typically submit the instant the form exists; require a small human
// delay before a submission is treated as real.
const MIN_SUBMIT_MS = 1500

const SUCCESS_MESSAGE = 'Thank you! Your review has been submitted.'
const ERROR_MESSAGE   = 'Something went wrong. Please try again.'
const RATING_MESSAGE  = 'Please select a star rating.'
const SUCCESS_CLASS   = 'text-[color:var(--color-accent)]'
const ERROR_CLASS     = 'text-red-400'

// Service-type choices for the dropdown, derived from the services data so they
// stay in sync as services change. "Other" covers anything not listed.
export const serviceOptions = [
  ...services.map((s) => s.reviewLabel ?? s.title),
  'Other',
]

// Shared review-form logic: reactive state, spam guards, and EmailJS send.
// Each call returns a fresh, independent form instance.
export function useReviewForm() {
  init()

  // `website` is a honeypot — hidden from real users, so any value means a bot.
  const form = reactive({
    name: '',
    business: '',
    email: '',
    serviceType: '',
    rating: 0,
    text: '',
    consent: false,
    website: '',
  })
  const sending  = ref(false)
  const submitted = ref(false)
  const feedback = ref('')
  const feedbackClass = ref('')

  let startedAt = Date.now()

  function reset() {
    form.name = form.business = form.email = form.serviceType = form.text = form.website = ''
    form.rating = 0
    form.consent = false
  }

  function clearFeedback() {
    feedback.value = ''
  }

  function startTimer() {
    startedAt = Date.now()
  }

  function showSuccess() {
    feedback.value = SUCCESS_MESSAGE
    feedbackClass.value = SUCCESS_CLASS
    submitted.value = true
  }

  async function submit() {
    feedback.value = ''

    // Honeypot filled, or submitted suspiciously fast → silently drop it but
    // show success so bots get no signal that they were caught.
    if (form.website || Date.now() - startedAt < MIN_SUBMIT_MS) {
      showSuccess()
      reset()
      return
    }

    // Star rating has no native `required`, so guard it here.
    if (form.rating < 1) {
      feedback.value = RATING_MESSAGE
      feedbackClass.value = ERROR_CLASS
      return
    }

    sending.value = true
    try {
      await emailjs.send(config.serviceId, config.templateId, {
        name:  form.name,
        email: form.email || 'not provided',
        message:
          `[Website Review]  ★ ${form.rating}/5 — ${form.serviceType}\n` +
          `Business: ${form.business || '—'}\n` +
          `Consent to publish: ${form.consent ? 'Yes' : 'No'}\n\n` +
          form.text,
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

  return { form, sending, submitted, feedback, feedbackClass, submit, reset, clearFeedback, startTimer }
}
