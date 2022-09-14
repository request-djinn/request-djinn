const Bins = ({bins}) => {
  const handleBinClick = (subdomain) =>{
    //PLACEHOLDER CODE
    alert(`I'm gonna show you the bin for subdomain: ${subdomain} `)
  }

  return(
    <div>
      {bins.map(bin => {
        return <Bin bin={bin} handleClick={handleBinClick}/>
      })}
    </div>
  )
}

const Bin = ({bin, handleClick}) => {
  const onClick = () => {
    handleClick(bin.subdomain)
  }
  
  return(
    <div>
      <ul onClick={onClick}>
        <li>{bin.binKey}</li>
        <li>{bin.createdTime}</li>
      </ul>
    </div>
  )
}

export default Bins