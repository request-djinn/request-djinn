import { Outlet } from "react-router-dom";
import {useEffect, useState} from 'react'

import getBinKeys from '../services/BinKeyService'

import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Button from '../components/Button';
import Bins from '../components/Bins';

const Home = () => {
  const createRequest = () => {
    // PLACEHOLDER CODE
    alert('COMING SOON!')
  }

  const showBins = () => {
    // PLACEHOLDER CODE
    alert('COMING SOON!')
  }

  return(
    <>
    <div>
    <Navigation />
     <Header 
        h1Text={'The Next-Djinneration of Request Inspectors'}
        aboutText={'Here is some text in a smaller font, perhaps, that describes what our lil app does'}
      />
      <Button onClick={createRequest} buttonText="Create Bin"/>
      <Button onClick={showBins} buttonText="My Bins"/>
      <Bins />
      <div id="requests">
        <Outlet />
      </div>
    </div>
    </>
  )
}

export default Home