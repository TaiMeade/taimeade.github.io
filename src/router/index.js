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
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: { title: 'Services — Tai Meade' },
  },
  {
    // Shareable private link sent to clients after a project — intentionally
    // not linked from the nav.
    path: '/review',
    name: 'review',
    component: () => import('@/views/ReviewView.vue'),
    meta: { title: 'Leave a Review — Tai Meade' },
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
  scrollBehavior: () => ({ top: 0 }),
})

// Update page title on navigation
router.afterEach((to) => {
  document.title = to.meta.title ?? 'Tai Meade'
})

export default router
