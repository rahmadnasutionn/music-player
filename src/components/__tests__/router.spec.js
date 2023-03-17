import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import SongItem from '../Songitem.vue';

describe('router', () => {
    test('render router link', () => {
        const song = {
            docID: 'abc'
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

        expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
            name: 'Song',
            params: { id: song.docID }
        })
    });
});