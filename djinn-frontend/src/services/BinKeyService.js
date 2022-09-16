const getBinKeys = () => {
  const bins = localStorage.getItem('bins')
  if (!bins || bins.length === 0) {
    return JSON.stringify([])
  } else {
    return bins
  }
}

export default getBinKeys