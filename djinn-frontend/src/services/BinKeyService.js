const getBinKeys = () => {
  const bins = localStorage.getItem('bins')
  if (!bins || bins.length === 0) {
    return "no bins??"
  } else {
    return bins
  }
}

export default getBinKeys