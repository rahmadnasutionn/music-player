import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import AboutView from '../../views/AboutView.vue';

describe('About.vue', () => {
    test('render inner text', () => {
        const wrapper = mount(AboutView, {
            global: {
                mocks: {
                    $t: (message) => message
                }
            }
        });
        expect(wrapper.text()).toContain('about');
    })
});