<template>
  <section class="min-h-[calc(100vh-4rem)] px-4 py-16">
    <div class="max-w-5xl mx-auto flex flex-col gap-8">
      <!-- Heading -->
      <div>
        <p class="text-xs font-semibold tracking-widest uppercase text-[color:var(--color-accent)] mb-1">
          Where I've worked
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-[color:var(--color-text-primary)]">
          Experience
        </h2>
      </div>

      <!-- Timeline -->
      <div class="relative pl-6 border-l border-[color:var(--color-glass-border)]">
        <div
          v-for="entry in experience"
          :key="entry.id"
          class="relative mb-10 last:mb-0"
        >
          <!-- Timeline dot -->
          <span class="timeline-dot"></span>

          <GlassCard>
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
              <div>
                <h3 class="text-xl font-bold text-[color:var(--color-text-primary)]">
                  {{ entry.role }}
                </h3>
                <a
                  :href="entry.companyUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="accent-link font-medium"
                >
                  {{ entry.company }}
                </a>
              </div>
              <div class="flex flex-col items-start md:items-end gap-1 shrink-0">
                <span class="date-badge">
                  {{ entry.startDate }} — {{ entry.endDate ?? 'Present' }}
                </span>
                <span class="text-sm text-[color:var(--color-text-muted)]">
                  <v-icon size="14" class="mr-1">mdi-map-marker-outline</v-icon>{{ entry.location }}
                </span>
              </div>
            </div>

            <p class="body-text mb-4">{{ entry.description }}</p>

            <!-- Product highlight (Legna/Angel only) -->
            <div v-if="entry.product" class="product-highlight rounded-xl p-4 mb-4">
              <p class="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-accent)] mb-1">
                Primary Product
              </p>
              <a
                :href="entry.productUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="accent-link text-lg font-semibold"
              >
                {{ entry.product }}
              </a>
              <p class="body-text text-sm mt-1">{{ entry.productDescription }}</p>
            </div>

            <!-- Skills -->
            <div class="flex flex-wrap gap-2">
              <TechChip
                v-for="skill in entry.skills"
                :key="skill"
                :label="skill"
              />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { experience } from '@/data/experience.js'
import GlassCard from '@/components/shared/GlassCard.vue'
import TechChip from '@/components/shared/TechChip.vue'
</script>

<style scoped>
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

.accent-link {
  color: var(--color-accent);
  text-decoration: none;
  transition: color 0.2s;
}

.accent-link:hover {
  color: var(--color-accent-dim);
  text-decoration: underline;
}

.body-text {
  color: var(--color-text-secondary);
  line-height: 1.7;
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
</style>
