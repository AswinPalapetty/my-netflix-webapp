import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Footer.css'

function Footer() {
    const navigate = useNavigate()

    const redirectToGmail = ()=>{
      console.log("mailto:aswinpalapetty@gmail.com");
      window.location.href = "mailto:aswinpalapetty@gmail.com";
    }
  return (
    <div className='footer'>
        <small className='options' onClick={()=>navigate('/')}>Home</small>
        <small className='options' onClick={()=>navigate('/viewAll/originals')}>Originals</small>
        <small className='options' onClick={()=>navigate('/viewAll/trending')}>Trending</small>
        <small className='options' onClick={()=>navigate('/viewAll/popular')}>Popular</small>
        <small className='options' onClick={()=>redirectToGmail()}>Contact us</small><br/>
        <small className='copyright'>© 2022 Copyright: </small><small>All rights reserved. Designed by </small>
        <a href='https://aswin-p-infoprism.github.io/My-Webpage/index.html'><small className='developer'>ASWIN</small></a>
    </div>
  )
}

export default Footer
