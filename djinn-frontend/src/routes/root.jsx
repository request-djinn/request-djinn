import { useState } from 'react';

import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Button from '../components/Button';
import Notification from '../components/Notification';

import binService from '../services/BinService'

const Home = () => {
  const [notification, setNotification] = useState(null);
  
  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }
  const createBin = async () => {
    const res = await binService.createBin()
    showNotification(`Bin created for subdomain: ${res.data.endPoint}. Click 'My Bins' to view`)
    console.log(res.data)
    const oldBin = JSON.parse(localStorage.getItem('bins'));

    if (!oldBin) {
      localStorage.setItem('bins', JSON.stringify([
        {
          binkey: res.data.binKey,
          createdAt: res.data.createdAt,
        }])
      )
    } else {
      oldBin.push({
        binkey: res.data.binKey,
        createdAt: res.data.createdAt,
      })
      localStorage.setItem('bins', JSON.stringify(oldBin))
    }
  }

  return(
    <>
    <div>
      <Navigation />
      <Notification message={notification}/>
      <Header 
        h1Text={'The Next-Djinneration of Request Inspectors'}
        aboutText={'A subdomain is provided to you that will collect requests made to it and let you inspect them in a human-friendly way'}
      />
      <div className="mx-28 -my-8">
        <Button onClick={createBin} buttonText="+ Create Bin"/>
      </div>
    </div>
    </>
  )
}

export default Home
