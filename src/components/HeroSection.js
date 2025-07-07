import React from 'react'
import restaurant from '../assets/restauranfood.jpg'
import '../styles/HeroSection.css';
import { Link } from 'react-router-dom';
export default function HeroSection () {
  return (
    <div className='hero-section'>
        <div className='hero-overlay'>
            <div className='hero-text'>
                <h1>Little Lemon</h1>
                <h2>Chicago</h2>
                <p>
A family-owned Mediterranean eatery where time-honored recipes meet modern flavor. We blend generations of culinary tradition with contemporary touches to create a warm, inviting dining experience.                </p>
                <button className='reserve-button'><Link to="/booking">book a table</Link></button>
            </div>
            <div className='hero-image'>
                <img src={restaurant} alt="Restaurant" />
            </div>
        </div>
    </div>
  )
}
