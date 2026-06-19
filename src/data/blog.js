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
    slug: 'my-new-website',
    title: 'My New Website',
    description:
      'The story behind this new personal website, the technologies I used to build it, and some of the lessons I learned along the way.',
    date: '2026-06-18',
    tags: ['personal', 'web development', 'reflection'],
    load: () => import('../posts/my-new-website.md?raw'),
  },
  {
    slug: 'getting-married-and-honeymoon',
    title: 'Getting Married and Going on My Honeymoon',
    description:
      'A reflection on getting married and heading off on our honeymoon — one of the biggest weeks of my life.',
    date: '2026-05-16',
    tags: ['life', 'personal', 'reflection'],
    load: () => import('../posts/getting-married-and-honeymoon.md?raw'),
  },
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
