import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import SongItem from '../Songitem.vue';

describe('Songitem.vue', () => {
    test('render song display_name', () => {
        const song = {
            display_name: 'test'
        };

        const wrapper = shallowMount(SongItem, {
            propsData: {
                song
            },
            global: {
                components: {
                    'router-link': RouterLinkStub
                }
            }
        });

        const compositionAuthor = wrapper.find('.text-gray-500');

        expect(compositionAuthor.text()).toBe(song.display_name);
    });
});