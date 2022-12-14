import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';


import binService from '../services/BinService';
import Navigation from '../components/Navigation';
import RequestsList from '../components/RequestsList';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [bin, setBin] = useState([]);
  const location = useLocation();
  const binkey = location.pathname.slice(10);
    
  useEffect(() => {
    const fetchData = async () => {
      const bin = await binService.getBin(binkey)
      const requests = await binService.getRequests(binkey)
      return {requests, bin}
    }

    fetchData()
      .then(data => {
        console.log(data);
        setBin(data.bin.data.rows[0])
        setRequests(data.requests)
      })
      .catch(error => console.log(error));
  }, [binkey])
  

    return(
      <div>
        <Navigation />
        <div>
          <h2 className="p-4">Requests for: {bin.endpoint}</h2>
          <ul className="px-4">
            <li>Created: {bin.createdtime}</li>
            <li>Last: {bin.last}</li>
          </ul>


        </div>
        <div className="px-2">
          {requests.length === 0 ? <h2 className="p-4">No Requests Yet!</h2> :
            <RequestsList requests={requests}/>
          }
        </div>
      </div>
    )
}


export default Requests
