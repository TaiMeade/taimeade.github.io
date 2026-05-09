<template>
  <section class="min-h-[calc(100vh-4rem)] px-4 py-20">
    <div class="max-w-3xl mx-auto flex flex-col gap-10">
      <!-- Header -->
      <div>
        <p class="section-label">Thoughts &amp; writing</p>
        <h1 class="section-heading">Blog</h1>
      </div>

      <!-- Post list -->
      <div v-if="posts.length" class="flex flex-col gap-6">
        <RouterLink
          v-for="post in posts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="post-card glass rounded-2xl p-6 block no-underline"
        >
          <div class="flex flex-wrap items-center gap-2 mb-3">
            <span class="date-text">{{ formatDate(post.date) }}</span>
            <span class="dot" />
            <span v-for="tag in post.tags" :key="tag" class="tag-chip">{{ toTitleCase(tag) }}</span>
          </div>
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-desc">{{ post.description }}</p>
          <div class="read-more mt-4">
            Read post <v-icon size="16">mdi-arrow-right</v-icon>
          </div>
        </RouterLink>
      </div>

      <!-- Empty state (no posts yet) -->
      <div v-else class="text-center py-20">
        <div class="w-20 h-20 rounded-2xl bg-[color:var(--color-accent-muted)] flex items-center justify-center mx-auto mb-6">
          <v-icon size="40" color="rgb(94,234,212)">mdi-pencil-outline</v-icon>
        </div>
        <p class="text-[color:var(--color-text-secondary)] text-lg mb-2">No posts yet</p>
        <p class="text-[color:var(--color-text-muted)] text-sm max-w-md mx-auto">
          Check back soon — I'm working on it.
        </p>
      </div>

      <!-- Back link -->
      <div>
        <button class="back-btn" @click="router.push('/')">
          <v-icon size="18">mdi-arrow-left</v-icon>
          Back to Home
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { posts } from '@/data/blog.js'
import { toTitleCase } from '@/utils/string'

const router = useRouter()

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
</script>

<style scoped>
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

.post-card {
  cursor: pointer;
  transition: transform 0.22s, box-shadow 0.22s;
}
.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
}

.date-text {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-weight: 500;
}
.dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--color-text-muted);
}
.tag-chip {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-accent);
  padding: 0.1rem 0.55rem;
  border-radius: 9999px;
  background: var(--color-accent-muted);
  border: 1px solid rgba(94, 234, 212, 0.2);
}

.post-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.35;
}
.post-desc {
  font-size: 0.93rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-accent);
  transition: gap 0.2s;
}
.post-card:hover .read-more { gap: 0.55rem; }

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 0.6rem;
  background: var(--color-accent-muted);
  border: 1px solid rgba(94, 234, 212, 0.25);
  color: var(--color-accent);
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  transition: background 0.2s;
}
.back-btn:hover { background: rgba(94, 234, 212, 0.2); }
</style>
