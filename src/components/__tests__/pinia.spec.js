import { setActivePinia, createPinia } from "pinia";
import { beforeEach, describe, expect, test, vi } from "vitest";
import useAuthStore from '../../stores/useAuthStore';

vi.mock('../../includes/firebase', () => ({
    auth: {
        signInWithEmailAndPassword: () => Promise.resolve()
    }
}))

describe('stores', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    });

    test('authenticate User', async() => {
        const store = useAuthStore();

        expect(store.user).not.toBe(true);
        await store.authenticate({});
        expect(store.user).toBe(true);
    });
});