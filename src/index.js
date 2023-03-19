import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { firebaseContext } from './contexts/FirebaseContext';
import { firebase } from './firebase/Config';
import Context from './contexts/FirebaseContext';
import Search from './contexts/searchContext';
import Wishlist from './contexts/wishlistContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <firebaseContext.Provider value={{ firebase }}>
        <Context>
            <Search>
                <Wishlist>
                    <Router>
                        <App />
                    </Router>
                </Wishlist>
            </Search>
        </Context>
    </firebaseContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
