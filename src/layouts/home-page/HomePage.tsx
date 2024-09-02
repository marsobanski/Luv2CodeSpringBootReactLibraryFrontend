import {ExploreTopBooks} from "./components/ExploreTopBooks";
import {Carousel} from "./components/Carousel";
import {Heroes} from "./components/Heroes";
import {LibraryServices} from "./components/LibraryServices";
import React from "react";

export const HomePage = () => {
    return (
        <> {/*Komponent reacta może zwracać JEDEN element, ale kiedy nie chcemy,
            żeby to był np. <div>, możemy tą konstrukcją sprawić,
            że to co zwracamy nie będzie opakowane w nic konkretnego*/}
            <ExploreTopBooks/>
            <Carousel/>
            <Heroes/>
            <LibraryServices/>
        </>
    );
}