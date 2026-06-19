<template>
  <section class="min-h-[calc(100vh-4rem)] px-4 py-16">
    <div class="max-w-5xl mx-auto flex flex-col gap-8">
      <!-- Page heading -->
      <div>
        <p class="text-xs font-semibold tracking-widest uppercase text-[color:var(--color-accent)] mb-1">
          Get to know me
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-[color:var(--color-text-primary)]">
          About Me
        </h2>
      </div>

      <!-- Bio + Education row -->
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Bio -->
        <GlassCard>
          <h3 class="section-title">Bio</h3>
          <p class="body-text">
            Hey, I'm Tai — a software engineer passionate about building software that
            makes a real difference. I graduated from
            <a
              href="https://www.radford.edu"
              target="_blank"
              rel="noopener noreferrer"
              class="accent-link"
            >Radford University</a>
            with a 4.0 GPA and was named the
            <a
              href="https://www.facebook.com/photo?fbid=1263298025796908&set=pcb.1263298399130204"
              target="_blank"
              rel="noopener noreferrer"
              class="accent-link"
            >2025 Dean's Scholar for Computer Science</a>.
          </p>
          <p class="body-text mt-3">
            I currently work at
            <a
              href="https://www.legnasoftware.com"
              target="_blank"
              rel="noopener noreferrer"
              class="accent-link"
            >Legna Software</a>
            as a Software Engineer on
            <a
              href="https://www.legnasoftware.com/angel"
              target="_blank"
              rel="noopener noreferrer"
              class="accent-link"
            >Angel</a>,
            a cloud-based procurement platform for the wood products industry.
            I love solving meaningful problems across the full stack.
          </p>
        </GlassCard>

        <!-- Education -->
        <GlassCard>
          <h3 class="section-title">Education</h3>

          <!-- Radford University -->
          <div class="flex gap-4 items-start mt-1">
            <div class="pt-1">
              <div class="w-10 h-10 rounded-xl bg-[color:var(--color-accent-muted)] flex items-center justify-center">
                <v-icon color="rgb(94,234,212)" size="22">mdi-school-outline</v-icon>
              </div>
            </div>
            <div>
              <p class="text-[color:var(--color-text-primary)] font-semibold">Radford University</p>
              <p class="text-[color:var(--color-text-secondary)] text-sm mt-0.5">
                B.S. Computer Science &bull; 2023 – 2025
              </p>
              <p class="text-[color:var(--color-accent)] text-sm font-medium mt-1">GPA: 4.0</p>
              <p class="text-[color:var(--color-text-secondary)] text-sm mt-1">
                Dean's Scholar Award — Computer Science
              </p>
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t border-[color:var(--color-glass-border)] my-4"></div>

          <!-- NRCC -->
          <div class="flex gap-4 items-start">
            <div class="pt-1">
              <div class="w-10 h-10 rounded-xl bg-[color:var(--color-accent-muted)] flex items-center justify-center">
                <v-icon color="rgb(94,234,212)" size="22">mdi-school-outline</v-icon>
              </div>
            </div>
            <div>
              <p class="text-[color:var(--color-text-primary)] font-semibold">New River Community College</p>
              <p class="text-[color:var(--color-text-secondary)] text-sm mt-0.5">
                A.S. Engineering — Computer Science Specialization &bull; 2021 – 2023
              </p>
              <p class="text-[color:var(--color-accent)] text-sm font-medium mt-1">GPA: 4.0</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <!-- Certifications (only rendered when at least one exists) -->
      <GlassCard v-if="certifications.length">
        <h3 class="section-title">Certifications</h3>
        <div class="flex flex-wrap gap-4 mt-2">
          <div
            v-for="cert in certifications"
            :key="cert.name"
            class="flex items-center gap-3"
          >
            <div class="w-10 h-10 rounded-xl bg-[color:var(--color-accent-muted)] flex items-center justify-center shrink-0">
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
        <h3 class="section-title">Skills &amp; Tech Stack</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div v-for="group in skillGroups" :key="group.label" class="skill-group">
            <div class="flex items-center gap-2 mb-2">
              <v-icon size="18" color="rgb(94,234,212)">{{ group.icon }}</v-icon>
              <span class="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-text-secondary)]">{{ group.label }}</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in group.items"
                :key="item"
                class="skill-chip"
              >{{ item }}</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  </section>
</template>

<script setup>
import GlassCard from '@/components/shared/GlassCard.vue'

const skillGroups = [
  { label: 'Languages',    icon: 'mdi-code-tags',       items: ['Python', 'Java', 'HTML', 'JavaScript', 'TypeScript', 'C#', 'Rust', 'C'] },
  { label: 'Frontend',     icon: 'mdi-monitor-shimmer', items: ['Vue 3', 'Vuetify', 'Tailwind CSS'] },
  { label: 'Backend',      icon: 'mdi-server-outline',  items: ['.NET'] },
  { label: 'Databases',    icon: 'mdi-database-outline',items: ['SQL Server', 'SQLite', 'Prisma', 'IndexedDB'] },
  { label: 'Tools & Cloud',icon: 'mdi-tools',           items: ['Azure', 'Git/GitHub', 'Scripting/Automation'] },
  { label: 'Other',        icon: 'mdi-layers-outline',  items: ['Electron', 'Streamlit', 'Agile / Scrum'] },
]

// Add entries here when new certifications are earned:
// { name: 'Cert Name', issuer: 'Issuer', icon: 'mdi-icon', expires: 'Month YYYY' }
const certifications = []
</script>

<style scoped>
.section-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  letter-spacing: 0.01em;
}

.body-text {
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.accent-link {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s, text-decoration 0.2s;
}

.accent-link:hover {
  color: var(--color-accent-dim);
  text-decoration: underline;
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
</style>
