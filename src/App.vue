<script>
import AppHeader from '@/components/AppHeader.vue';
import { mapWritableState } from 'pinia';
import { auth } from './includes/firebase';
import useAuthStore from './stores/useAuthStore';
import Player from './components/Player.vue';

export default {
  components: {
    AppHeader,
    Player,
  },
  computed: {
    ...mapWritableState(useAuthStore, ['user'])
  },
  created() {
    if (auth.currentUser) {
      this.user = true;
    }
  }
}
</script>

<template>
  <AppHeader />

  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component">
      </component>
    </Transition>
  </router-view>

  <player/>
</template>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  opacity: 0;
  transition: all 0.5s linear;
}
</style>