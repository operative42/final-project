import React from 'react'
import  marioAndadrianA from "../assets/Mario and Adrian A.webp"
import  marioAndadrianB from "../assets/Mario and Adrian B.webp"
import "../styles/About.css"

export default function About() {
  return (
    <div className="container">
        <div className="text-content">
            <h2>Little Lemon</h2>
            <h4>Chicago</h4>
            <p>
                A family-owned Mediterranean eatery where time-honored recipes meet modern flavor. We blend generations of culinary tradition with contemporary touches to create a warm, inviting dining experience.
            </p>
        </div>
        <div className='images'>
            <img src={marioAndadrianA} alt='' className='img1'/>
            <img src={marioAndadrianB} alt='' className='img2'/>
        </div>
    </div>
  )
}
