const setLocalStorage = () => {
  localStorage.setItem('bins', JSON.stringify([
    {
      binkey: 1234501923412,
      createdAt: Date.now()
    },
    {
      binkey: 2348232302599,
      createdAt: Date.now()
    },
  ]))

  console.log('Local Storage updated with dev data!')
}

export default setLocalStorage