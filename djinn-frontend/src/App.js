import testData from './dev/testData';

import {useEffect, useState} from 'react'

import getBinKeys from './services/BinKeyService'

import Header from './components/Header';
import Button from './components/Button';
import Bins from './components/Bins';

const App = () => {
  const createRequest = () => {
    // PLACEHOLDER CODE
    alert('COMING SOON!')
  }

  const showBins = () => {
    // PLACEHOLDER CODE
    alert('COMING SOON!')
  }

  // const getBins = () => {
    // This should check the contents of binkeys and then make 0
    // or more requests using the apiservice.getbin function
    // Once we've made our requests, we set bins using setBins to an array
    // of the data received from our api call 
  // }

  const [bins, setBins] = useState(testData)
  const [binKeys, setBinKeys] = useState(null)

  useEffect(() => {
    setBins(testData)
    setBinKeys(getBinKeys())
  }, [])

  return(
    <div>
     <Header 
        h1Text={'The Next-Djinneration of Request Inspectors'}
        aboutText={'Here is some text in a smaller font, perhaps, that describes what our lil app does'}
      />
      <Button onClick={createRequest} buttonText="I will eventually learn to create bins!"/>
      <Button onClick={showBins} buttonText="I will show you your bins!"/>
      <Bins bins={bins}/>
      <div>
        {binKeys}
      </div>
    </div>
  )
}

export default App