import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Button from '../components/Button';

const Home = () => {

  const createBin = () => {
    // PLACEHOLDER CODE
    alert('COMING SOON!')
  }

  return(
    <>
    <div>
    <Navigation />
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