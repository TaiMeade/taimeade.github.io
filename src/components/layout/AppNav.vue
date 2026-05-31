<template>
  <header class="glass sticky top-0 z-50 w-full">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Brand — always scrolls to top -->
      <button class="brand-link text-xl font-semibold tracking-wide" @click="goToSection('home')">
        <span class="text-[color:var(--color-text-primary)]">Tai Meade</span>
        <span class="text-[color:var(--color-accent)]">.</span>
      </button>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-1">
        <!-- Section scroll links -->
        <button
          v-for="link in sectionLinks"
          :key="link.id"
          class="nav-link"
          :class="{ 'nav-link--active': route.name === 'home' && activeSection === link.id }"
          @click="goToSection(link.id)"
        >
          {{ link.label }}
        </button>

        <!-- Services — true router link -->
        <RouterLink
          to="/services"
          class="nav-link"
          :class="{ 'nav-link--active': route.name === 'services' }"
        >
          Services
        </RouterLink>

        <!-- Blog — true router link -->
        <RouterLink
          to="/blog"
          class="nav-link"
          :class="{ 'nav-link--active': route.name === 'blog' }"
        >
          Blog
        </RouterLink>

        <!-- Contact opens modal — styled as a CTA, pinned to the end -->
        <button class="nav-cta" @click="openContact">
          <v-icon size="16">mdi-email-outline</v-icon>
          Contact
        </button>
      </nav>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden text-[color:var(--color-text-secondary)] p-2 rounded-lg hover:bg-white/10 transition"
        @click="menuOpen = !menuOpen"
        aria-label="Toggle menu"
      >
        <v-icon>{{ menuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
      </button>
    </div>

    <!-- Mobile drawer -->
    <Transition name="slide-down">
      <div v-if="menuOpen" class="md:hidden border-t border-white/10 px-4 py-3 flex flex-col gap-1">
        <button
          v-for="link in sectionLinks"
          :key="link.id"
          class="nav-link w-full text-left"
          :class="{ 'nav-link--active': route.name === 'home' && activeSection === link.id }"
          @click="goToSection(link.id)"
        >
          {{ link.label }}
        </button>

        <RouterLink
          to="/services"
          class="nav-link w-full"
          :class="{ 'nav-link--active': route.name === 'services' }"
          @click="menuOpen = false"
        >
          Services
        </RouterLink>

        <RouterLink
          to="/blog"
          class="nav-link w-full"
          :class="{ 'nav-link--active': route.name === 'blog' }"
          @click="menuOpen = false"
        >
          Blog
        </RouterLink>

        <button class="nav-cta w-full justify-center mt-1" @click="openContact">
          <v-icon size="16">mdi-email-outline</v-icon>
          Contact
        </button>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContactModal } from '@/composables/useContactModal'

const route   = useRoute()
const router  = useRouter()
const { open: openContactModal } = useContactModal()

const menuOpen    = ref(false)
const activeSection = ref('home')

const sectionLinks = [
  { label: 'Home',       id: 'home' },
  { label: 'About',      id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects' },
]

// ── Active section tracking (scroll-based) ────────────────────
const sectionIds = sectionLinks.map((l) => l.id)

function updateActive() {
  if (route.name !== 'home') return
  const offset = 90 // px below nav where we consider a section "active"
  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const el = document.getElementById(sectionIds[i])
    if (el && el.getBoundingClientRect().top <= offset) {
      activeSection.value = sectionIds[i]
      return
    }
  }
  activeSection.value = 'home'
}

onMounted(() => window.addEventListener('scroll', updateActive, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', updateActive))

// ── Navigation ────────────────────────────────────────────────
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

async function goToSection(id) {
  menuOpen.value = false
  if (route.name === 'home') {
    activeSection.value = id
    scrollToSection(id)
  } else {
    await router.push({ name: 'home' })
    await nextTick()
    scrollToSection(id)
  }
}

function openContact() {
  menuOpen.value = false
  openContactModal()
}
</script>

<style scoped>
.brand-link {
  background: none;
  border: none;
  cursor: pointer;
  letter-spacing: 0.02em;
  padding: 0;
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.85rem;
  border-radius: 0.5rem;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}
.nav-link:hover {
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.07);
}
.nav-link--active {
  color: var(--color-accent);
  background: var(--color-accent-muted);
}

/* Contact CTA — visually distinct from the plain nav links */
.nav-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-left: 0.5rem;
  padding: 0.45rem 1.1rem;
  border-radius: 0.6rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: #0a0e1a;
  background: var(--color-accent);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.nav-cta:hover {
  background: var(--color-accent-dim);
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(94, 234, 212, 0.25);
}

.nav-badge {
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.1rem 0.4rem;
  border-radius: 9999px;
  background: var(--color-accent-muted);
  border: 1px solid rgba(94, 234, 212, 0.3);
  color: var(--color-accent);
  letter-spacing: 0.03em;
}

/* Mobile slide transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
