const Request = ({req}) => {
  return(
    <div className="request">
      <div className="request-headers">
        <ul>
          {
            req.headers.map((key, value) => {
              return <HTTPHeader key={key} value={value} />
            })
          }
        </ul>
      </div>
      <div className="request-body">
          <p>{req.body}</p>
      </div>
    </div>
  )
}

const HTTPHeader = ({key, value}) => {
  return(
    <li><strong>{key}</strong>: {value}</li>
  )
}

export default Request
