<template>
  <div v-if="register_submission" :class="register_alert_variant" class="text-center my-4">
    {{ register_alert_message }}
  </div>
    <vee-form
      :validation-schema="schema"
      class="max-w-5xl w-[90vw] mx-auto mt-12"
      @submit="register"
    >
      <div class="mb-3">
        <label class="inline-block mb-2">Name</label>
        <vee-field
          name="name"
          type="text"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Name"
        />
        <ErrorMessage name="name" class="text-red-600" />
      </div>
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <vee-field
          name="email"
          type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email"
        />
        <ErrorMessage name="email" class="text-red-600" />
      </div>
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <vee-field
          type="password"
          name="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
        />
        <ErrorMessage name="password" class="text-red-600" />
      </div>
      <button
        type="submit"
        class="block mb-4 w-full disabled:cursor-not-allowed bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700 border-transparent"
        :disabled="register_submission"
      >
        Submit
      </button>
      <router-link
        to="/signin"
        class="block text-center w-full disabled:cursor-not-allowed bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700 border-transparent"
      >
        Signin
      </router-link>
    </vee-form>
</template>

<script>
import { mapActions } from 'pinia';
import useAuthStore from '../stores/useAuthStore';

export default {
  data() {
    return {
      schema: {
        name: 'required|min:3|max:30',
        email: 'required|min:3|max:30|email',
        password: 'required|min:3|max:30',
      },
      register_submission: false,
      register_show_alert: false,
      register_alert_variant: 'bg-blue-500',
      register_alert_message: 'Please wait!'
    }
  },
  methods: {
    ...mapActions(useAuthStore, {
      createUser: 'register'
    }),
    async register(values) {
      try {
        await this.createUser(values);
        this.register_submission = true;
        this.register_show_alert = true;
        setTimeout(() => {
          this.register_alert_message = 'success';
        }, 2000);
        this.register_alert_variant = 'bg-green-600';
      } catch (error) {
        this.register_submission = true;
        this.register_show_alert = true;
        this.register_alert_message = error.message;
        this.register_alert_variant = 'bg-red-600';
        return;
      }
    }
  }
}
</script>
