/**
 * Blog post registry.
 *
 * To add a new post:
 *   1. Create  src/posts/<slug>.md
 *   2. Add an entry below with the matching load() import.
 *
 * Fields:
 *   slug        — URL segment (/blog/<slug>)
 *   title       — Display title
 *   description — One-sentence summary shown on the list card
 *   date        — ISO date string (YYYY-MM-DD)
 *   tags        — Array of tag strings
 *   load        — Dynamic import returning the raw markdown string
 */
export const posts = [
  {
    slug: 'starting-at-legna-software',
    title: 'Starting as a Software Engineer at Legna Software',
    description:
      'Reflections on my first weeks building Angel — a cloud-based procurement platform for the wood products industry — and what I\'ve learned jumping into a real production codebase.',
    date: '2026-05-01',
    tags: ['career', 'vue', 'dotnet', 'reflection'],
    load: () => import('../posts/starting-at-legna-software.md?raw'),
  },
]
