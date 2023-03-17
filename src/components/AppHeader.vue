<template>
  <header id="header" class="bg-gray-700">
      <nav class="container mx-auto flex justify-between items-center py-5 px-4">
        <router-link 
          class="text-white font-bold uppercase text-2xl mr-4" 
          to="/"
          exact-active-class="no-active"
          >Music</router-link
        >

        <div class="flex flex-grow items-center">
          <ul class="flex flex-row mt-1">
            <li>
              <router-link class="px-2 text-white" title="Home" to="/">Home</router-link>
            </li>
            <li>
              <router-link class="px-2 text-white" title="About" to="/about">About</router-link>
            </li>
            <li>
              <router-link class="px-2 text-white" title="Manage" to="/manage">Manage</router-link>
            </li>
          </ul>
          <ul class='ml-auto flex'>
            <li @click.prevent="handleLogout">
              <router-link class="px-2 text-white" title="Logout" to="/signin" >Logout</router-link>
            </li>
            <li>
              <a href="#" class="px-2 text-white" :title="currentLocale" @click.prevent="changeLocale">
                {{ currentLocale }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
  </header>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { RouterLink } from 'vue-router';
import useModalStores from '../stores/modal';
import useAuthStore from '../stores/useAuthStore';

export default {
    name: "AppHeader",
    data() {
      return {
      }
    },  
    computed: {
        ...mapStores(useModalStores),
        currentLocale() {
          return this.$i18n.locale === 'en' ? 'English' : 'Indonesia'
        }
    },
    methods: {
       ...mapActions(useAuthStore, ['logout']),
       async handleLogout() {
        this.logout();
       },
        toggleAuth() {
            this.modalStore.isOpen = !this.modalStore.isOpen;
        },
        changeLocale() {
          this.$i18n.locale = this.$i18n.locale === 'en' ? 'id' : 'en'
        }
    },
    components: { RouterLink }
}
</script>