import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import HomeView from '../../views/HomeView.vue';
import SongItem from '../SongItem.vue';

describe('Home.vue', () => {
    test('renders list of song', () => {
        const songs = [
            {}, {}, {}
        ]
        const component = shallowMount(HomeView, {
            data() {
                return {
                    songs
                }
            },
            global: {
                mocks: {
                    $t: (message) => message
                }
            }
        });

        const items = component.findAllComponents(SongItem);

        expect(items).toHaveLength(songs.length);

        items.forEach((wrapper, i) => {
            expect(wrapper.props().song).toStrictEqual(songs[i]);
        });
    });
});