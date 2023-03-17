<template>
<div v-if="login_submission" :class="login_alert_variant" class="text-center mt-4 p-4">
  {{ login_show_alert }}
</div>
<vee-form 
  class="w-[600px] max-w-5xl mx-auto mt-12"
  :validate-schema="schema"
  @submit="login"
>
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
      class="block mb-4 w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
       >
        Submit
    </button>
    <router-link
      to="/register"
      class="block w-full text-center bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
       >
        Register
    </router-link>
</vee-form>
</template>

<script>
import { mapActions } from 'pinia';
import router from '../router';
import useAuthStore from '../stores/useAuthStore';

export default {
  data() {
    return {
      schema: {
        email: 'required|min:3|max:30|email',
        password: 'required|min:3|max:30',
      },
      login_submission: false,
      login_show_alert: false,
      login_alert_message: 'Please wait',
      login_alert_variant: 'bg-blue-600'
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['authenticate']),
    async login(values) {
      try {
        this.authenticate(values);
        this.login_submission = true;
        this.login_show_alert = true;
        this.login_alert_message = 'Success';
        this.login_alert_variant = 'bg-blue-600';
        router.replace({ name: 'Home' });
      } catch (error) {
        this.login_submission = true;
        this.login_show_alert = true;
        this.login_alert_message = error.message;
        this.login_alert_variant = 'bg-red-600';
        return;
      }
    }
  }
}

</script>