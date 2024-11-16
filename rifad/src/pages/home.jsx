import React from 'react'
import { ScrollRestoration } from 'react-router-dom'
import Hero from '../components/sections/hero'
import Portfolio from '../components/sections/portfolio'
import CallToAction from '../components/sections/callToAction'
import Partners from '../components/sections/partners'
import HeroShowReel from '../components/sections/hero2'
import Portfolio2 from '../components/sections/portfolio2'
import About from './about'
import Resume from '../components/sections/resume'

const Home = () => {
  return (
    <> 
    <div id='top'>
 {/* <Hero/> */}
        <HeroShowReel/>
        <About/>
        <Partners/>
        <Portfolio2/>
        <Resume />
        <CallToAction/>
        <ScrollRestoration/>
       
    </div>
       
    </>
  )
}

export default Home