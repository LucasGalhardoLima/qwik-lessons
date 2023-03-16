import { component$, useVisibleTask$, $, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";

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
    const loc = useLocation();

    const state = useStore({
        planet: {} as Planet,
    });

    const listPlanet = $(async (id: string) => {
        try {
            const response: object = await api.get(`/planets/${id}/`);
            state.planet = { ...response };
        } catch (error) {
            console.log(error);
        }
    });

    useVisibleTask$(async () => {
        await listPlanet(loc.params.id);
    });

    return (
        <div style="display: flex; justify-content: center; padding 20px">
            <div style="margin: 5px; border: 1px solid #bdbdbd; padding: 5px;">
                <p> Name: {state.planet?.name}</p>
                <p> Climate: {state.planet?.climate}</p>
                <p> Terrain: {state.planet?.terrain}</p>
                <p> Diameter: {state.planet?.diameter}</p>
                <p> Population: {state.planet?.population}</p>
                <p> Gravity: {state.planet?.gravity}</p>
                <p>
                    {" "}
                    *Rotation Period: {state.planet?.rotation_period} <br />
                    <span style="font-size: 10px">
                        *The number of standard hours it takes for this planet
                        to complete a single rotation on its axis
                    </span>
                </p>
                <p>
                    {" "}
                    *Orbital Period: {state.planet?.orbital_period} <br />
                    <span style="font-size: 10px">
                        *The number of standard days it takes for this planet to
                        complete a single orbit of its local star.
                    </span>
                </p>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Planet Details",
    meta: [
        {
            name: "description",
            content: "Planets details page",
        },
    ],
};
