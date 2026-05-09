import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Tai Meade' },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/BlogView.vue'),
    meta: { title: 'Blog — Tai Meade' },
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: () => import('@/views/BlogPostView.vue'),
    meta: { title: 'Blog — Tai Meade' },
  },
  // Catch-all — redirect old routes and any unknown paths to home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // Let the in-page scroll logic handle scrolling; don't force top on navigation
  scrollBehavior: () => null,
})

// Update page title on navigation
router.afterEach((to) => {
  document.title = to.meta.title ?? 'Tai Meade'
})

export default router
