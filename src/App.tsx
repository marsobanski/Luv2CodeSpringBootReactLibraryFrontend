import React from 'react';
import './App.css';
import {Navbar} from "./layouts/navbar-and-footer/Navbar";
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
