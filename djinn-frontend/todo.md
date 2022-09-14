Request-Djinn Front Page

1. Landing page should have some welcome text at the top that describes what Request-Djinn does
  TODO:
    1. Determine if we want to store this text in like a yaml/json file
    2. Figure out what the exact text we want here is
2. "Create a RequestBin button"
  TODO:
    1. Create an api service using fetch/axios that can hit an endpoint on localhost:3001
      - Need a "create bin" function
        POST to '/bin'
      - Need a "get bin" function
        GET to '/bin/:binId'
      - Need a "get requests for a given binId" function
        GET to '/bin/:binId/requests'
3. List of a given users bins
  TODO:
  1. Use a react effect to do the following on first page load:
    - Inspect the user's local storage for any binkeys
    - If any are found, we use the api service to make a request for those bins
  2. Pass the returned array of bin objects to the Bins component.
  



For Page Routing (later):
- App.js file could useState to track if a user is in 'binMode' 'requestMode' or 'frontPageMode' and render a corresponding component
  - i.e. our 'App' function has a conditional that returns an imported function
    - e.g. We start off in default 'frontPageMode' so our App function returns the 'frontPage' component (frontPage is currently our App component 9/13)
  

- Use React Router in our index.js file to navigate between the different pages and render the component listed above accordingly.