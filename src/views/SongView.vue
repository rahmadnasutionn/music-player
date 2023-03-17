<template>
  <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <button
          @click.prevent="playSong(song)"
          title="play song"
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
        >
          <i class="fas fa-play"></i>
        </button>
        <div class="z-50 text-left ml-8">
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre }}</div>
        </div>
      </div>
    </section>

    <section class="container mx-auto mt-6" id="comments">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">Comments ({{ comments.length }})</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <vee-form :validate-schema="schema" @submit="handleComment" v-if="user">
            <vee-field
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            ></vee-field>
            <ErrorMessage name="comment" class="text-red-600" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
            >
              Submit
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <ul class="container mx-auto">
      <li class="p-6 bg-gray-50 border border-gray-200" v-for="comment in sortComment" :key="comment.docID">
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.date }}</time>
        </div>

        <p>
          {{comment.content}}
        </p>
      </li>
    </ul>
</template>

<script>
import { songsCollection, commentCollection, auth } from '../includes/firebase';
import { mapActions, mapState } from 'pinia';
import useAuthStore from '../stores/useAuthStore';
import usePlayerStore from '../stores/player';

export default {
  name: 'SongView',
  data() {
    return {
        song: {},
        schema: {
            comment: 'required|min:3|max:100'
        },
        comments: [],
        sort: '1',
    }
  },
  computed: {
    ...mapState(useAuthStore, ['user']),
    sortComment() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === '1') {
            return new Date(b.date) - new Date(a.date);
        }

        return new Date(a.date) - new Date(b.date);
      });
    }
  },
  methods: {
    ...mapActions(usePlayerStore, ['playSong']),
    async handleComment(values, { resetForm }) {
      const comment = {
        content: values.comment,
        date: new Date().toString(),
        id: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid
      };

      await commentCollection.add(comment);

      resetForm();
      this.getComments();
    },
    async getComments() {
       const snapshot = await commentCollection.where(
        'id', '==', this.$route.params.id
       ).get();

       snapshot.forEach((document) => {
        this.comments.push({
          docID: document.id,
          ...document.data()
        })
       })
    }
  },
  async created() {
    const docSnapshot = await songsCollection.doc(this.$route.params.id).get();

    if (!docSnapshot.exists) {
        this.$router.push({ name: 'Home' });
        return;
    }

    this.song = docSnapshot.data();
  }
}
</script>