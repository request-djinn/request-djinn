import Request from './Request'

const Requests = ({requests}) => {
 return(
  <div>
    {requests.map(req => {
      return <Request request={req}/>
    })}
  </div>
 )
}

export default Requests