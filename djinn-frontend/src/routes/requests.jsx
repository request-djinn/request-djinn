import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';


import binService from '../services/BinService';
import Navigation from '../components/Navigation';
import Request from '../components/Request';

const Requests = () => {
  const [requests, setRequests] = useState([])
  const location = useLocation();
  const binkey = location.pathname.slice(10);
    
  useEffect(() => {
    // api service would get requests here
    const fetchData = async () => {
      return await binService.getRequests(binkey)
    }
    fetchData()
      .then(data => setRequests(data))
      .catch(error => console.log(error));
  }, [binkey])

    return(
      <div>
        <Navigation />
        <h1>Requests for: PLACE SUBDOMAIN HERE</h1>
        {requests.length === 0 ? <h2>No Requests Yet!</h2> :
          requests.map(req => {
            return <Request request={req}/>
          })
        }
      </div>
    )
}


export default Requests