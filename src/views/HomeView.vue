<script>
import { songsCollection } from '../includes/firebase';
import useAuthStore from '../stores/useAuthStore';
import SongItem from '../components/SongItem.vue';

export default {
  components: {
    SongItem
  },
  data() {
    return {
      songs: [],
      maxPerPage: 3,
      pending: false,
    }
  },
  async created() {
    this.getSongs();
   
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeMount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomWindow) {
        this.getSongs();
      }
    },
    async getSongs() {
      if (this.pending) {
        return;
      }

      this.pending = true;

      let snapshot;
     if (this.songs.length) {
      const lastSong = await songsCollection.doc(this.songs[this.songs.length - 1].docID).get()
       snapshot = await songsCollection
        .orderBy('modified_name')
        .startAfter(lastSong)
        .limit(this.maxPerPage)
        .get();
     } else {
         snapshot = await songsCollection
        .orderBy('modified_name')
        .limit(this.maxPerPage)
        .get();
     }

     snapshot.forEach((document) => {
      this.songs.push({
      docID: document.id,
      ...document.data(),
    });
   });

   this.pending = false;
    }
  },
  beforeRouteEnter(to, from , next) {
    const store = useAuthStore();

    if (store.user) {
      next();
    } else {
      next({ name: 'Login' });
    }
  }
}
</script>
<template>
  <main>
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white text-center main-header-content">
          <h1 class="font-bold text-5xl mb-5">{{ $t('home.listen') }}</h1>
          <p class="w-full md:w-8/12 mx-auto">
            {{ $t('home.heading') }}
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <section class="container mx-auto">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200" v-icon="'headphones-alt'">
          <span class="card-title">{{ $t('home.song') }}</span>
          
        </div>
        <ol id="playlist">
          <song-item 
            v-for="song in songs" 
            :key="song.docID" 
            :song="song"
          />
        </ol>
      </div>
    </section>
  </main>
</template>