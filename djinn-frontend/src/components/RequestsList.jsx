import Request from './Request'

const RequestsList = ({requests}) => {
 return(
  <div>
    {requests.map(req => {
      return <Request key={req.requestId} request={req}/>
    })}
  </div>
 )
}

export default RequestsList