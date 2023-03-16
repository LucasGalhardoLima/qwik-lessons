import {
    component$,
    useSignal,
    useStore,
    useVisibleTask$,
    $,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from '@builder.io/qwik-city';

import { api } from "~/plugins/api";

interface Planet {
    id?: string;
    name?: string;
    climate?: string;
    terrain?: string;
    diameter?: string;
    population?: string;
    gravity?: string;
    rotation_period?: string;
    orbital_period?: string;
}

export default component$(() => {
    const search = useSignal("");
    const state = useStore({
        planets: [] as Planet[],
    });

    const listPlanets = $(async (search?: string) => {
        try {
            state.planets = [];
            //@ts-ignore
            const { results } = await api.get(
                `planets/${search ? `?search=${search}` : ""}`
            );
            console.log(results);
            state.planets = results.map((item: { url: string }) => ({
                ...item,
                id: item.url.substring(
                    item.url.length - 2,
                    item.url.length - 1
                ),
            }));
        } catch (error) {
            console.log(error);
        }
    });

    useVisibleTask$(async ({ track }) => {
        track(() => search.value);
        await listPlanets(search.value);
    });
    return (
        <div>
            <h1>
                Welcome to Star Wars <span class="lightning">⚡️</span>
            </h1>

            <button onClick$={() => listPlanets()}>List Planets</button>

            <input
                type="text"
                placeholder="Search for a planet"
                onInput$={(e: any) => (search.value = e?.target?.value)}
            />

            <div style="display: flex; justify-content: center; padding 20px">
                {state.planets.map((planet) => (
                    <div style="margin: 5px; border: 1px solid #bdbdbd; padding: 5px;">
                        <p>Name: {planet.name}</p>
                        <p> Climate: {planet.climate}</p>
                        <Link class="mindblow" href={`/planet/${planet.id}`}>
                          Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Planets Page",
    meta: [
        {
            name: "description",
            content: "Planets index page",
        },
    ],
};
