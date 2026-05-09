<template>
  <div class="gradient-bg min-h-screen flex flex-col" @mousemove="onMouseMove">
    <!-- Mouse-tracking radial spotlight -->
    <div class="mouse-spotlight" :style="spotlightStyle" />

    <AppNav />
    <main class="flex-1 flex flex-col relative z-10">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </main>

    <!-- Contact modal — rendered at root so it overlays everything -->
    <ContactModal />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNav from '@/components/layout/AppNav.vue'
import ContactModal from '@/components/ContactModal.vue'

const route = useRoute()

const mouseX = ref(50)
const mouseY = ref(50)

function onMouseMove(e) {
  mouseX.value = (e.clientX / window.innerWidth) * 100
  mouseY.value = (e.clientY / window.innerHeight) * 100
}

const spotlightStyle = computed(() => ({
  background: `radial-gradient(200px circle at ${mouseX.value}% ${mouseY.value}%, rgba(94, 234, 212, 0.05) 0%, rgba(30, 80, 160, 0.03) 40%, transparent 70%)`,
}))
</script>

<style scoped>
.mouse-spotlight {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  transition: background 0.08s ease;
}
</style>
