<template>
  <!-- ─── HERO ──────────────────────────────────────────────── -->
  <section id="home" class="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-20">
    <!-- Nebula radiance pooled behind the hero -->
    <div class="hero-glow" aria-hidden="true" />
    <div class="max-w-5xl w-full mx-auto relative z-10">
      <GlassCard>
        <div class="flex flex-col md:flex-row items-center gap-10 p-4 md:p-8">
          <div class="flex-shrink-0">
            <img
              src="/images/profilePic.jpg"
              alt="Tai Meade"
              class="profile-photo w-44 h-44 md:w-56 md:h-56 object-cover rounded-2xl"
            />
          </div>
          <div class="flex flex-col gap-4 text-center md:text-left">
            <div>
              <p class="text-sm font-medium tracking-widest uppercase text-[color:var(--color-accent)] mb-1">
                Software Engineer
              </p>
              <h1 class="text-4xl md:text-6xl font-bold text-[color:var(--color-text-primary)] leading-tight">
                Tai Meade<span class="text-[color:var(--color-accent)]">.</span>
              </h1>
              <p class="mt-3 text-[color:var(--color-text-secondary)] text-lg">
                Building
                <a href="https://www.legnasoftware.com/angel" target="_blank" rel="noopener noreferrer" class="accent-link">Angel</a>
                at
                <a href="https://www.legnasoftware.com" target="_blank" rel="noopener noreferrer" class="accent-link">Legna Software</a>
              </p>
            </div>
            <div class="flex items-center gap-4 justify-center md:justify-start mt-2">
              <a href="https://www.linkedin.com/in/tai-meade" target="_blank" rel="noopener noreferrer" class="social-btn" title="LinkedIn">
                <v-icon size="22">mdi-linkedin</v-icon>
              </a>
              <a href="https://www.github.com/TaiMeade" target="_blank" rel="noopener noreferrer" class="social-btn" title="GitHub">
                <v-icon size="22">mdi-github</v-icon>
              </a>
              <a href="/docs/TaiMeade-Resume.pdf" target="_blank" rel="noopener noreferrer" class="social-btn" title="Resume">
                <v-icon size="22">mdi-file-document-outline</v-icon>
              </a>
              <a href="/docs/Tai_Meade_Web_Design_Flyer_V3.pdf" target="_blank" rel="noopener noreferrer" class="social-btn" title="Web Design Flyer">
                <v-icon size="22">mdi-application-outline</v-icon>
              </a>
            </div>
            <div class="flex flex-wrap gap-3 justify-center md:justify-start mt-2">
              <button class="cta-primary" @click="scrollTo('about')">About Me</button>
              <button class="cta-secondary" @click="scrollTo('projects')">View Projects</button>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  </section>

  <div class="section-sep" />

  <!-- ─── ABOUT ─────────────────────────────────────────────── -->
  <section id="about" class="px-4 py-24">
    <div class="max-w-5xl mx-auto flex flex-col gap-8">
      <div>
        <p class="section-label">Get to know me</p>
        <h2 class="section-heading">About Me</h2>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- Bio -->
        <GlassCard>
          <h3 class="card-title">Bio</h3>
          <p class="body-text">
            Hey, I'm Tai — a software engineer passionate about building software that
            makes a real difference. I graduated from
            <a href="https://www.radford.edu" target="_blank" rel="noopener noreferrer" class="accent-link">Radford University</a>
            with a 4.0 GPA and was named the
            <a href="https://www.facebook.com/photo?fbid=1263298025796908&set=pcb.1263298399130204" target="_blank" rel="noopener noreferrer" class="accent-link">2025 Dean's Scholar for Computer Science</a>.
          </p>
          <p class="body-text mt-3">
            I currently work at
            <a href="https://www.legnasoftware.com" target="_blank" rel="noopener noreferrer" class="accent-link">Legna Software</a>
            as a Software Engineer on
            <a href="https://www.legnasoftware.com/angel" target="_blank" rel="noopener noreferrer" class="accent-link">Angel</a>,
            a cloud-based procurement platform for the wood products industry.
            I love solving meaningful problems across the full stack.
          </p>
        </GlassCard>

        <!-- Education -->
        <GlassCard>
          <h3 class="card-title">Education</h3>
          <div class="flex gap-4 items-start mt-1">
            <div class="icon-badge shrink-0 mt-0.5">
              <v-icon color="rgb(94,234,212)" size="22">mdi-school-outline</v-icon>
            </div>
            <div>
              <p class="text-[color:var(--color-text-primary)] font-semibold">Radford University</p>
              <p class="text-[color:var(--color-text-secondary)] text-sm mt-0.5">B.S. Computer Science · 2023 – 2025</p>
              <p class="text-[color:var(--color-accent)] text-sm font-medium mt-1">GPA: 4.0</p>
              <p class="text-[color:var(--color-text-secondary)] text-sm mt-1">Dean's Scholar Award — Computer Science</p>
              
            </div>
          </div>
          <div class="border-t border-[color:var(--color-glass-border)] my-4" />
          <div class="flex gap-4 items-start">
            <div class="icon-badge shrink-0 mt-0.5">
              <v-icon color="rgb(94,234,212)" size="22">mdi-school-outline</v-icon>
            </div>
            <div>
              <p class="text-[color:var(--color-text-primary)] font-semibold">New River Community College</p>
              <p class="text-[color:var(--color-text-secondary)] text-sm mt-0.5">A.S. Engineering — Computer Science Specialization · 2021 – 2023</p>
              <p class="text-[color:var(--color-accent)] text-sm font-medium mt-1">GPA: 4.0</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <!-- Certifications (only shown when populated) -->
      <GlassCard v-if="certifications.length">
        <h3 class="card-title">Certifications</h3>
        <div class="flex flex-wrap gap-4 mt-2">
          <div v-for="cert in certifications" :key="cert.name" class="flex items-center gap-3">
            <div class="icon-badge shrink-0">
              <v-icon color="rgb(94,234,212)" size="22">{{ cert.icon }}</v-icon>
            </div>
            <div>
              <p class="text-[color:var(--color-text-primary)] font-semibold text-sm">{{ cert.name }}</p>
              <p class="text-[color:var(--color-text-muted)] text-xs mt-0.5">{{ cert.issuer }}</p>
              <p v-if="cert.expires" class="text-[color:var(--color-text-muted)] text-xs">Expires: {{ cert.expires }}</p>
            </div>
          </div>
        </div>
      </GlassCard>

      <!-- Skills -->
      <GlassCard>
        <h3 class="card-title">Skills &amp; Tech Stack</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div v-for="group in skillGroups" :key="group.label" class="skill-group">
            <div class="flex items-center gap-2 mb-2">
              <v-icon size="18" color="rgb(94,234,212)">{{ group.icon }}</v-icon>
              <span class="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-text-secondary)]">{{ group.label }}</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="item in group.items" :key="item" class="skill-chip">{{ item }}</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  </section>

  <div class="section-sep" />

  <!-- ─── EXPERIENCE ─────────────────────────────────────────── -->
  <section id="experience" class="px-4 py-24">
    <div class="max-w-5xl mx-auto flex flex-col gap-8">
      <div>
        <p class="section-label">Where I've worked</p>
        <h2 class="section-heading">Experience</h2>
      </div>

      <div class="relative pl-6 border-l border-[color:var(--color-glass-border)]">
        <div v-for="entry in experience" :key="entry.id" class="relative mb-10 last:mb-0">
          <span class="timeline-dot" />
          <GlassCard>
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
              <div>
                <h3 class="text-xl font-bold text-[color:var(--color-text-primary)]">{{ entry.role }}</h3>
                <a :href="entry.companyUrl" target="_blank" rel="noopener noreferrer" class="accent-link font-medium">{{ entry.company }}</a>
              </div>
              <div class="flex flex-col items-start md:items-end gap-1 shrink-0">
                <span class="date-badge">{{ entry.startDate }} — {{ entry.endDate ?? 'Present' }}</span>
                <span class="text-sm text-[color:var(--color-text-muted)]">
                  <v-icon size="14" class="mr-1">mdi-map-marker-outline</v-icon>{{ entry.location }}
                </span>
              </div>
            </div>
            <p class="body-text mb-4">{{ entry.description }}</p>
            <div v-if="entry.product" class="product-highlight rounded-xl p-4 mb-4">
              <p class="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-accent)] mb-1">Primary Product</p>
              <a :href="entry.productUrl" target="_blank" rel="noopener noreferrer" class="accent-link text-lg font-semibold">{{ entry.product }}</a>
              <p class="body-text text-sm mt-1">{{ entry.productDescription }}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <TechChip v-for="skill in entry.skills" :key="skill" :label="skill" />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  </section>

  <div class="section-sep" />

  <!-- ─── PROJECTS ───────────────────────────────────────────── -->
  <section id="projects" class="px-4 py-24 pb-32">
    <div class="max-w-7xl mx-auto flex flex-col gap-8">
      <div>
        <p class="section-label">Things I've built</p>
        <h2 class="section-heading">Projects</h2>
      </div>

      <!-- Filter -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in categories"
          :key="cat.value"
          class="filter-btn"
          :class="{ 'filter-btn--active': activeCategory === cat.value }"
          @click="activeCategory = cat.value"
        >
          {{ cat.label }}
          <span class="filter-count">{{ countForCategory(cat.value) }}</span>
        </button>
      </div>

      <!-- Grid -->
      <TransitionGroup name="project" tag="div" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card glass rounded-2xl overflow-hidden flex flex-col"
        >
          <div class="project-img-wrap">
            <img v-if="project.image" :src="project.image" :alt="project.title" class="project-img" loading="lazy" />
            <div v-else class="project-img-placeholder">
              <v-icon size="48" color="rgba(94,234,212,0.3)">mdi-web</v-icon>
            </div>
            <div class="project-overlay">
              <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="overlay-btn">
                <v-icon>mdi-open-in-new</v-icon> Visit Site
              </a>
              <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="overlay-btn">
                <v-icon>mdi-github</v-icon> View on GitHub
              </a>
            </div>
          </div>
          <div class="flex flex-col gap-3 p-5 flex-1">
            <div class="flex items-start justify-between gap-2">
              <h3 class="text-[color:var(--color-text-primary)] font-semibold text-lg leading-tight">{{ project.title }}</h3>
              <span class="category-badge">{{ project.category }}</span>
            </div>
            <p class="text-[color:var(--color-text-secondary)] text-sm leading-relaxed flex-1">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mt-auto pt-2">
              <TechChip v-for="chip in project.chips" :key="chip" :label="chip" />
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import GlassCard from '@/components/shared/GlassCard.vue'
import TechChip from '@/components/shared/TechChip.vue'
import { experience } from '@/data/experience.js'
import { projects, categories } from '@/data/projects.js'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// ─── About ─────────────────────────────────────────────────
// Add entries here when new certifications are earned:
// { name: 'Cert Name', issuer: 'Issuer', icon: 'mdi-icon', expires: 'Month YYYY' }
const certifications = []

const skillGroups = [
  { label: 'Languages',    icon: 'mdi-code-tags',       items: ['Python', 'Java', 'HTML', 'JavaScript', 'TypeScript', 'C#', 'Rust', 'C'] },
  { label: 'Frontend',     icon: 'mdi-monitor-shimmer', items: ['Vue 3', 'Vuetify', 'Tailwind CSS'] },
  { label: 'Backend',      icon: 'mdi-server-outline',  items: ['.NET'] },
  { label: 'Databases',    icon: 'mdi-database-outline',items: ['SQL Server', 'SQLite', 'Prisma', 'IndexedDB'] },
  { label: 'Tools & Cloud',icon: 'mdi-tools',           items: ['Azure', 'Git/GitHub'] },
  { label: 'Other',        icon: 'mdi-layers-outline',  items: ['Electron', 'Streamlit', 'Agile / Scrum'] },
]

// ─── Projects ──────────────────────────────────────────────
const activeCategory = ref('all')

const filteredProjects = computed(() =>
  activeCategory.value === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory.value)
)

function countForCategory(value) {
  return value === 'all' ? projects.length : projects.filter((p) => p.category === value).length
}
</script>

<style scoped>
/* Ensure sections don't hide behind sticky nav when scrolled to */
section[id] { scroll-margin-top: 4.5rem; }

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
.card-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
}
.body-text {
  color: var(--color-text-secondary);
  line-height: 1.7;
}
.accent-link {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.accent-link:hover {
  color: var(--color-accent-dim);
  text-decoration: underline;
}
.section-sep {
  height: 1px;
  background: linear-gradient(to right, transparent, var(--color-glass-border), transparent);
  margin: 0 3rem;
}
.icon-badge {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: var(--color-accent-muted);
  display: flex;
  align-items: center;
  justify-content: center;
}
.skill-chip {
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-glass-border);
  color: var(--color-text-secondary);
}

/* Hero */
/* Soft cyan/violet nebula glow concentrated behind the hero card.
   Static (no animation) and feathered with transparent stops, so it
   costs nothing at runtime. */
.hero-glow {
  position: absolute;
  left: 50%;
  top: 46%;
  width: min(900px, 115%);
  height: min(640px, 80%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  background:
    radial-gradient(42% 46% at 50% 50%, rgba(94, 234, 212, 0.10), transparent 70%),
    radial-gradient(58% 62% at 62% 58%, rgba(124, 58, 237, 0.10), transparent 72%),
    radial-gradient(40% 44% at 36% 64%, rgba(56, 120, 220, 0.07), transparent 72%);
}
.profile-photo {
  box-shadow: 0 0 0 3px var(--color-accent-muted), 0 8px 32px rgba(0, 0, 0, 0.5);
}
.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 0.75rem;
  background: var(--color-accent-muted);
  border: 1px solid rgba(94, 234, 212, 0.2);
  color: var(--color-accent);
  text-decoration: none;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.social-btn:hover {
  background: rgba(94, 234, 212, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(94, 234, 212, 0.2);
}
.cta-primary {
  padding: 0.6rem 1.4rem;
  border-radius: 0.6rem;
  background: var(--color-accent);
  color: #0a0e1a;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.cta-primary:hover { background: var(--color-accent-dim); transform: translateY(-1px); }
.cta-secondary {
  padding: 0.6rem 1.4rem;
  border-radius: 0.6rem;
  background: transparent;
  color: var(--color-accent);
  font-weight: 600;
  font-size: 0.9rem;
  border: 1px solid rgba(94, 234, 212, 0.4);
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.cta-secondary:hover { background: var(--color-accent-muted); transform: translateY(-1px); }

/* Experience */
.timeline-dot {
  position: absolute;
  left: -1.55rem;
  top: 1.5rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-muted);
}
.date-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.2rem 0.75rem;
  border-radius: 9999px;
  background: var(--color-accent-muted);
  border: 1px solid rgba(94, 234, 212, 0.25);
  color: var(--color-accent);
}
.product-highlight {
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-glass-border);
}

/* Projects */
.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-glass-border);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}
.filter-btn:hover { border-color: var(--color-accent); color: var(--color-text-primary); }
.filter-btn--active {
  background: var(--color-accent-muted);
  border-color: rgba(94, 234, 212, 0.4);
  color: var(--color-accent);
}
.filter-count {
  font-size: 0.75rem;
  padding: 0.05rem 0.45rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.08);
}
.project-enter-active, .project-leave-active { transition: opacity 0.35s ease, transform 0.35s ease; }
.project-enter-from, .project-leave-to { opacity: 0; transform: scale(0.95) translateY(8px); }
.project-move { transition: transform 0.35s ease; }
.project-card { transition: transform 0.25s, box-shadow 0.25s; }
.project-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5); }
.project-img-wrap {
  position: relative;
  overflow: hidden;
  height: 220px;
  background: var(--color-surface-elevated);
}
.project-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s, filter 0.4s; }
.project-card:hover .project-img { transform: scale(1.05); filter: brightness(0.5); }
.project-img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.project-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  opacity: 0;
  transition: opacity 0.3s;
}
.project-card:hover .project-overlay { opacity: 1; }
.overlay-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 0.6rem;
  background: var(--color-accent);
  color: #0a0e1a;
  font-weight: 600;
  font-size: 0.88rem;
  text-decoration: none;
  transition: background 0.2s;
}
.overlay-btn:hover { background: var(--color-accent-dim); }
.category-badge {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: capitalize;
  padding: 0.15rem 0.55rem;
  border-radius: 9999px;
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-glass-border);
  color: var(--color-text-muted);
  white-space: nowrap;
}
</style>
