import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import SongItem from '../SongItem.vue';

describe('Snapshot songitem.vue', () => {
    test('render correctly', () => {
        const song = {
            docID: '123',
            modified_name: 'abc',
            display_name: 'test',
            comment_count: 5,
        };

        const wrapper = shallowMount(SongItem, {
            propsData: { song },
            global: {
                components: {
                    'router-link': RouterLinkStub
                }
            }
        });

        expect(wrapper.element).toMatchSnapshot()
    });
});