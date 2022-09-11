import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Col, Container, Form, Row } from 'react-bootstrap'
import { authContext } from '../../contexts/FirebaseContext'
import { getAuth, signOut } from 'firebase/auth'
import './NavBar.css'
import { searchContext } from '../../contexts/searchContext';
import { useEffect } from 'react';

function NavBar() {

    const navigate = useNavigate()
    const { user, setUser } = useContext(authContext)
    const { searchBox, query, setQuery,setNotFound } = useContext(searchContext)
    const [backColor, setBackColor] = useState(false);
    const [searchBar, setSearchBar] = useState(false)

    useEffect(() => {
        setQuery('')
    }, [])

    const signInBtn = () => {
        if (user) {
            const auth = getAuth();
            signOut(auth).then(() => setUser(null))
        }
        else {
            navigate('/signin')
        }
    }

    const changeBackColor = () => {
        if (window.scrollY >= 20) {
            setBackColor(true);
        }
        else {
            setBackColor(false);
        }
    }

    window.addEventListener('scroll', changeBackColor);

    return (
        <div>
            <header className={backColor ? 'headerClassActive' : 'headerClass'}>
                <div className="header-menu">
                    <img onClick={() => navigate('/')} className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix logo" />
                    {searchBox && <Form.Control
                        type="search"
                        placeholder="Search Here..."
                        className="me-2 search-box"
                        aria-label="Search"
                        onChange={(e) =>{console.log('target value ==='+e.target.value); setQuery(e.target.value) }}
                        style={{ 'right': '150px' }}
                    />}

                    {searchBox && <i class="search-button fa-solid fa-magnifying-glass" onClick={() => { setSearchBar(!searchBar) }}></i>}

                    <button className='signIn' onClick={signInBtn}>{user ? 'Sign Out' : 'Sign In'}</button>
                </div>
            </header>

            {
                searchBar ? 
                <Container fluid><Row className='search-through-button'>
                    <Col xs={12}><Form.Control
                        type="search"
                        placeholder="Search Here..."
                        className="me-2 search-box"
                        aria-label="Search"
                        onChange={(e) => setQuery(e.target.value)} /></Col>
                </Row></Container> 
                : setQuery('')
            }

        </div>

        // <div className='navbar'>
        //     <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix logo" />
        //     <button className='signIn'>Sign In</button>
        // </div>
    )
}

export default NavBar
