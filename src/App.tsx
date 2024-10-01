import React from 'react';
import './App.css';
import {Navbar} from './layouts/navbar-and-footer/Navbar';
import {Footer} from './layouts/navbar-and-footer/Footer';
import {HomePage} from './layouts/home-page/HomePage';
import {SearchBooksPage} from './layouts/search-books-page/SearchBooksPage';
import {Redirect, Route, Switch} from 'react-router-dom';

export const App = () => {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <Navbar/>
            <div className='flex-grow-1'>
                {/*INFO: Switch sprawia, że renderujemy tylko pierwszą
            spełniającą warunek stronę*/}
                <Switch>
                    {/*INFO: 'exact' oznacza, że komponent będzie się renderował tylko
                na dokładnie tym endpoincie. Bez tego przy '/search' warunek '/'
                też jest spełniony, a więc '/' też by się renderowało*/}
                    <Route path="/" exact>
                        <Redirect to="/home"/>
                    </Route>
                    <Route path="/home">
                        <HomePage/>
                    </Route>
                    <Route path="/search">
                        <SearchBooksPage/>
                    </Route>
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}
