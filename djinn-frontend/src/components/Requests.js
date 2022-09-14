const Requests = ({requests}) => {
 return(
  <div>
    {requests.map(req => {
      return <Request request={req}/>
    })}
  </div>
 )
}

const Request = ({request}) => {
  return(
    // Should probably see what I get from the api service first, but this will likely resemble the ERD
    <div>
    
    </div>
  )
}

const LineItem = ({key, value}) => {
  return(
    <p><strong>{key}</strong>:{value}</p>
  )
}