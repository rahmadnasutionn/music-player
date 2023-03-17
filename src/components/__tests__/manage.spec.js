import { shallowMount } from "@vue/test-utils";
import { describe, it } from "vitest";
import ManageView from '../../views/ManageView.vue';

describe('Manage.vue', () => {
    it('should be an upload component', () => {
        const wrapper = shallowMount(ManageView, {
            global: {
                mocks: {
                    $t: (message) => message
                }
            }
        });

        wrapper.findComponent('[data-test="upload"]')
    })
});