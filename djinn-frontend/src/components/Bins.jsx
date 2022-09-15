import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import getBinKeys from '../services/BinKeyService';

const Bins = () => {
  const [bins, setBins] = useState([])
  
  useEffect(() => {
    setBins(JSON.parse(getBinKeys()));
  }, [])

  const handleBinClick = (subdomain) =>{
    //PLACEHOLDER CODE
    alert(`I'm gonna show you the bin for subdomain: ${subdomain} `)
  }
  console.log(bins)
  return(
    <div>
      <ul>
        {bins.map(bin => {
          return <Bin bin={bin} handleClick={handleBinClick} key={bin.binkey}/>
        })}
      </ul>
    </div>
  )
}

const Bin = ({bin, handleClick}) => {  
  return(
    <Link to={`/requests/${bin.binkey}`}>
      <li>
        <p>Bin Key: {bin.binkey} | Created At: {bin.createdAt}</p>
      </li>
    </Link>
  )
}

export default Bins