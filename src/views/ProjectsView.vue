<template>
  <section class="min-h-[calc(100vh-4rem)] px-4 py-16">
    <div class="max-w-7xl mx-auto flex flex-col gap-8">
      <!-- Heading -->
      <div>
        <p class="text-xs font-semibold tracking-widest uppercase text-[color:var(--color-accent)] mb-1">
          Things I've built
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-[color:var(--color-text-primary)]">
          Projects
        </h2>
      </div>

      <!-- Category filter -->
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

      <!-- Projects grid -->
      <TransitionGroup
        name="project"
        tag="div"
        class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card glass rounded-2xl overflow-hidden flex flex-col"
        >
              <!-- Image -->
              <div class="project-img-wrap">
                <img
                  v-if="project.image"
                  :src="project.image"
                  :alt="project.title"
                  class="project-img"
                  loading="lazy"
                />
                <div v-else class="project-img-placeholder">
                  <v-icon size="48" color="rgba(94,234,212,0.3)">mdi-web</v-icon>
                </div>
                <div class="project-overlay">
                  <a
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="overlay-btn"
                    title="Visit Site"
                  >
                    <v-icon>mdi-open-in-new</v-icon>
                    Visit Site
                  </a>
                  <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="overlay-btn"
                    title="View on GitHub"
                  >
                    <v-icon>mdi-github</v-icon>
                    View on GitHub
                  </a>
                </div>
              </div>

              <!-- Content -->
              <div class="flex flex-col gap-3 p-5 flex-1">
                <div class="flex items-start justify-between gap-2">
                  <h3 class="text-[color:var(--color-text-primary)] font-semibold text-lg leading-tight">
                    {{ project.title }}
                  </h3>
                  <span class="category-badge">{{ project.category }}</span>
                </div>
                <p class="text-[color:var(--color-text-secondary)] text-sm leading-relaxed flex-1">
                  {{ project.description }}
                </p>
                <div class="flex flex-wrap gap-2 mt-auto pt-2">
                  <TechChip
                    v-for="chip in project.chips"
                    :key="chip"
                    :label="chip"
                  />
                </div>
              </div>
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { projects, categories } from '@/data/projects.js'
import TechChip from '@/components/shared/TechChip.vue'

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

.filter-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-text-primary);
}

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

.project-enter-active,
.project-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.project-enter-from,
.project-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(8px);
}
.project-move {
  transition: transform 0.35s ease;
}

.project-card {
  transition: transform 0.25s, box-shadow 0.25s;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
}

.project-img-wrap {
  position: relative;
  overflow: hidden;
  height: 400px;
  background: var(--color-surface-elevated);
}
.project-img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-elevated);
}
.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s, filter 0.4s;
}

.project-card:hover .project-img {
  transform: scale(1.05);
  filter: brightness(0.5);
}

.project-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

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

.overlay-btn:hover {
  background: var(--color-accent-dim);
}

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
