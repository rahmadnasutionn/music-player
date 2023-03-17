import { defineStore } from "pinia";
import { auth } from "../includes/firebase";
import router from "../router";

export default defineStore('user', {
    state: () => ({
        user: false
    }),
    actions: {
        async register(values) {
            await auth.createUserWithEmailAndPassword(values.email, values.password);
            this.user = true;
        },
        async authenticate(values) {
            await auth.signInWithEmailAndPassword(values.email, values.password);
            this.user = true;
        },
        async logout() {
            await auth.signOut();
            this.user = false;
            router.replace({ name: 'Login' });
        }
    }
});