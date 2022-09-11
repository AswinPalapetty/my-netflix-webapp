import React, { useState } from 'react'
import NavBar from '../../components/navbar/NavBar'
import Banner from '../../components/banner/Banner'
import RowPost from '../../components/rowpost/RowPost'
import './Home.css';
import { Action, Comedy, Horror, Originals, Animation, Romance, Trending, Popular, Adventure, Crime, Drama, Family, Science_fiction, Mystery, Thriller } from '../../utilities/categoryUrls' 
import { useContext } from 'react';
import { searchContext } from '../../contexts/searchContext';
import Footer from '../../components/footer/Footer';

function Home() {
    const [showMore, setShowMore] = useState(false)
    const {setSearchBox} = useContext(searchContext)
    setSearchBox(false)
    return (
        <div>
            <NavBar />
            <Banner />
            <RowPost title='Netflix Originals' category={Originals} url='originals' />
            <RowPost title='Trending' category={Trending} url='trending' />
            <RowPost title='Popular' category={Popular} url='popular' />

            {showMore && <div style={{'opacity': '1', 'transition': "all .2s"}}>
            <RowPost title='Action' category={Action} url='Action' />
            <RowPost title='Adventure' category={Adventure} url='Adventure' />
            <RowPost title='Animation' category={Animation} url='Animation' />
            <RowPost title='Crime' category={Crime} url='Crime' />
            <RowPost title='Drama' category={Drama} url='Drama' />
            <RowPost title='Family' category={Family} url='Family' />
            <RowPost title='Science Fiction' category={Science_fiction} url='Science_Fiction' />
            <RowPost title='Mystery' category={Mystery} url='Mystery' />
            <RowPost title='Thriller' category={Thriller} url='Thriller' />
            <RowPost title='Comedy' category={Comedy} url='Comedy' />
            <RowPost title='Horror' category={Horror} url='Horror' />
            <RowPost title='Romance' category={Romance} url='Romance' />
            </div>}

            <div className='mb-5 text-center'>
                <button className='show-more-btn' onClick={()=>setShowMore(!showMore)}>{showMore ? 'Show Less...' : 'Show More...'}</button>
            </div>

            <Footer />
        </div>
    )
}

export default Home
