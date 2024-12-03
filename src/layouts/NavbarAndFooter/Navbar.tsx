import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {useOktaAuth} from '@okta/okta-react';
import {SpinnerLoading} from '../Utils/SpinnerLoading';

export const Navbar = () => {

    const {oktaAuth, authState} = useOktaAuth();

    if (!authState) {
        return <SpinnerLoading/>
    }

    const handleLogout = async () => oktaAuth.signOut();

    console.log(authState)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
            <div className="container-fluid">
            <span>
                <Link to='/home' className="navbar-brand">Library</Link>
            </span>
                <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle Navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/search">Search books</NavLink>
                        </li>
                        {authState.isAuthenticated &&
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/shelf">Shelf</NavLink>
                            </li>
                        }
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {!authState.isAuthenticated ?
                            <li className="nav-item m-1">
                                <Link className="btn btn-outline-light" type="button" to="login">Sign in</Link>
                            </li>
                            :
                            <li>
                                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}