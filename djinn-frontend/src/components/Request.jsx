const Request = ({request}) => {
  const headers = Object.entries(JSON.parse(request.headers))
  console.log(Object.entries(headers));
  return(
    <div>
      <div className="bg-slate-400 border-4 border-blue-200 border-solid py-6 px-4 mx-4">
        <ul>
          {headers.map((h) => {
              return <HTTPHeader key={`${h[0]}${h[1]}`} header={h[0]} value={h[1]} />
            })
          }
        </ul>
        <div className="request-body">
         <p className='text-black'>Body: {request.body}</p>
        </div>
      </div>
    </div>
  )
}

const HTTPHeader = ({header, value}) => {
  return(
    <li><strong>{header}</strong>: {value}</li>
  )
}

export default Request
