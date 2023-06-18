import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/NavBar'
import Banner from '../../components/banner/Banner'
import RowPost from '../../components/rowpost/RowPost'
import './Home.css';
import { Action, Comedy, Horror, Originals, Animation, Romance, Trending, Popular, Adventure, Crime, Drama, Family, Science_fiction, Mystery, Thriller } from '../../utilities/categoryUrls' 
import { useContext } from 'react';
import { searchContext } from '../../contexts/searchContext';
import { watchlistContext } from '../../contexts/watchlistContext';
import Footer from '../../components/footer/Footer';

function Home() {
    const [showMore, setShowMore] = useState(false)
    const {setSearchBox} = useContext(searchContext)
    const {setWatchlist} = useContext(watchlistContext)
    useEffect(()=>{
        setSearchBox(false)
        setWatchlist(true)
    },[])
    return (
        <div>
            <NavBar />
            <Banner />
            <RowPost title='Netflix Originals' category={Originals} url='originals' type='tv'/>
            <RowPost title='Trending' category={Trending} url='trending' type='movie'/>
            <RowPost title='Popular' category={Popular} url='popular' type='movie'/>

            {showMore && <div style={{'opacity': '1', 'transition': "all .2s"}}>
            <RowPost title='Action' category={Action} url='Action' type='movie'/>
            <RowPost title='Adventure' category={Adventure} url='Adventure' type='movie'/>
            <RowPost title='Animation' category={Animation} url='Animation' type='movie'/>
            <RowPost title='Crime' category={Crime} url='Crime' type='movie'/>
            <RowPost title='Drama' category={Drama} url='Drama' type='movie'/>
            <RowPost title='Family' category={Family} url='Family' type='movie'/>
            <RowPost title='Science Fiction' category={Science_fiction} url='Science_Fiction' type='movie'/>
            <RowPost title='Mystery' category={Mystery} url='Mystery' type='movie'/>
            <RowPost title='Thriller' category={Thriller} url='Thriller' type='movie'/>
            <RowPost title='Comedy' category={Comedy} url='Comedy' type='movie'/>
            <RowPost title='Horror' category={Horror} url='Horror' type='movie'/>
            <RowPost title='Romance' category={Romance} url='Romance' type='movie'/>
            </div>}

            <div className='mb-5 text-center'>
                <button className='show-more-btn' onClick={()=>setShowMore(!showMore)}>{showMore ? 'Show Less...' : 'Show More...'}</button>
            </div>

            <Footer />
        </div>
    )
}

export default Home
