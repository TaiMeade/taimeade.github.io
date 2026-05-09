<template>
  <section class="min-h-[calc(100vh-4rem)] px-4 py-20">
    <div class="max-w-3xl mx-auto">

      <!-- 404-style: post not found -->
      <div v-if="notFound" class="text-center py-24">
        <v-icon size="48" color="rgba(94,234,212,0.4)">mdi-file-question-outline</v-icon>
        <p class="text-[color:var(--color-text-primary)] text-2xl font-bold mt-4 mb-2">Post not found</p>
        <p class="text-[color:var(--color-text-muted)] mb-8">That post doesn't exist or may have moved.</p>
        <button class="back-btn" @click="router.push('/blog')">
          <v-icon size="18">mdi-arrow-left</v-icon> Back to Blog
        </button>
      </div>

      <!-- Loading -->
      <div v-else-if="loading" class="flex justify-center items-center py-40">
        <v-icon size="36" color="rgb(94,234,212)" class="animate-spin">mdi-loading</v-icon>
      </div>

      <!-- Post content -->
      <article v-else class="flex flex-col gap-8">
        <!-- Back link -->
        <button class="back-btn self-start" @click="router.push('/blog')">
          <v-icon size="18">mdi-arrow-left</v-icon> All posts
        </button>

        <!-- Meta -->
        <header class="glass rounded-2xl p-6 flex flex-col gap-3">
          <div class="flex flex-wrap items-center gap-2">
            <span class="date-text">{{ formatDate(post.date) }}</span>
            <span class="dot" />
            <span v-for="tag in post.tags" :key="tag" class="tag-chip">#{{ tag }}</span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-[color:var(--color-text-primary)] leading-tight">
            {{ post.title }}
          </h1>
          <p class="text-[color:var(--color-text-secondary)] text-base leading-relaxed">
            {{ post.description }}
          </p>
        </header>

        <!-- Rendered markdown -->
        <div class="glass rounded-2xl p-6 md:p-10 prose-block" v-html="renderedContent" />
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MarkdownIt from 'markdown-it'
import { posts } from '@/data/blog.js'

const route  = useRoute()
const router = useRouter()
const md     = new MarkdownIt({ linkify: true, typographer: true })

const post           = ref(null)
const renderedContent = ref('')
const loading        = ref(true)
const notFound       = ref(false)

onMounted(async () => {
  // Scroll to top when opening a post
  window.scrollTo({ top: 0, behavior: 'instant' })

  const slug  = route.params.slug
  const found = posts.find((p) => p.slug === slug)

  if (!found) {
    notFound.value = true
    loading.value  = false
    return
  }

  post.value = found

  try {
    const raw = await found.load()
    // Vite ?raw imports expose the string on .default
    renderedContent.value = md.render(typeof raw === 'string' ? raw : raw.default)
  } catch {
    renderedContent.value = '<p>Failed to load post content.</p>'
  }

  loading.value = false
})

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  })
}
</script>

<style scoped>
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.1rem;
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

/* ── Markdown prose styles (applied to v-html output) ──── */
.prose-block :deep(h1),
.prose-block :deep(h2),
.prose-block :deep(h3),
.prose-block :deep(h4) {
  color: var(--color-text-primary);
  font-weight: 700;
  line-height: 1.3;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}
.prose-block :deep(h1) { font-size: 1.9rem; }
.prose-block :deep(h2) { font-size: 1.45rem; border-bottom: 1px solid var(--color-glass-border); padding-bottom: 0.4rem; }
.prose-block :deep(h3) { font-size: 1.2rem; }

.prose-block :deep(p) {
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: 1.1rem;
}

.prose-block :deep(a) {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.prose-block :deep(a:hover) {
  color: var(--color-accent-dim);
  text-decoration: underline;
}

.prose-block :deep(ul),
.prose-block :deep(ol) {
  color: var(--color-text-secondary);
  padding-left: 1.5rem;
  margin-bottom: 1.1rem;
  line-height: 1.8;
}
.prose-block :deep(li) { margin-bottom: 0.35rem; }
.prose-block :deep(ul li) { list-style-type: disc; }
.prose-block :deep(ol li) { list-style-type: decimal; }

.prose-block :deep(code) {
  font-family: 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.88em;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid var(--color-glass-border);
  border-radius: 0.3rem;
  padding: 0.1em 0.45em;
  color: var(--color-accent);
}

.prose-block :deep(pre) {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--color-glass-border);
  border-radius: 0.75rem;
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin-bottom: 1.25rem;
}
.prose-block :deep(pre code) {
  background: none;
  border: none;
  padding: 0;
  color: var(--color-text-primary);
  font-size: 0.88rem;
}

.prose-block :deep(blockquote) {
  border-left: 3px solid var(--color-accent);
  margin: 1.25rem 0;
  padding: 0.75rem 1.25rem;
  background: var(--color-accent-muted);
  border-radius: 0 0.5rem 0.5rem 0;
}
.prose-block :deep(blockquote p) { color: var(--color-text-primary); margin: 0; }

.prose-block :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-glass-border);
  margin: 2rem 0;
}

.prose-block :deep(strong) { color: var(--color-text-primary); font-weight: 600; }
.prose-block :deep(em) { color: var(--color-text-secondary); font-style: italic; }

.prose-block :deep(img) {
  max-width: 100%;
  border-radius: 0.75rem;
  margin: 1rem 0;
}

/* First heading shouldn't have extra top margin */
.prose-block :deep(> *:first-child) { margin-top: 0; }
</style>
