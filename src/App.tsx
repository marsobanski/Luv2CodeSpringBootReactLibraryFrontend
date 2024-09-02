import React from 'react';
import './App.css';
import {Navbar} from "./layouts/navbar-and-footer/Navbar";
import {ExploreTopBooks} from "./layouts/home-page/components/ExploreTopBooks";
import {Carousel} from "./layouts/home-page/components/Carousel";
import {Heroes} from "./layouts/home-page/components/Heroes";
import {LibraryServices} from "./layouts/home-page/components/LibraryServices";
import {Footer} from "./layouts/navbar-and-footer/Footer";
import {HomePage} from "./layouts/home-page/HomePage";

export const App = () => {
    return (
        <div>
            <Navbar/>
            <HomePage/>
            <Footer/>
        </div>
    );
}
