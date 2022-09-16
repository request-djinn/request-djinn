import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import getBinKeys from '../services/BinKeyService';

const Bins = () => {
  const [bins, setBins] = useState([])
  
  useEffect(() => {
    const bins = JSON.parse(getBinKeys())
    setBins(bins);
  }, [])
 
  return(
    <div className ="p-4">
      <ul>
        {
          bins.length === 0 ? <h2 className="text-white p-4">No Bins, Yet!</h2> :
            bins.map(bin => {
              return <Bin bin={bin} key={bin.binkey}/>
            })
        }
      </ul>
    </div>
    
  )
}

const Bin = ({bin}) => {  
  return(
    <Link to={`/requests/${bin.binkey}`}>
      <li className="px-4 py-2">
        <p>Bin Key: {bin.binkey} | Created At: {bin.createdAt}</p>
      </li>
    </Link>
  )
}

export default Bins