Request-Djinn Front Page
Todo: 
  1. Create an api service using fetch/axios that can hit an endpoint on localhost:3001
    - Need a "create bin" function
      POST to '/bin'
    - Need a "get bin" function
      GET to '/bin/:binId'
    - Need a "get requests for a given binId" function
      GET to '/bin/:binId/requests'

  2. Requests Page:
    1. Each "bin" component should actually contain a <Link> component that forwards to requests/binkey
    2. That page should asynchronously make a request to the api service to request all requests for a given binkey

React Router Structure:
- root
  - Navigation component
  - Home Page component (child)

- Bins
  - List of bins

- Requests
 - List of Requests

