const Header = ({h1Text, aboutText}) => {
  return(
    <div className="justify-center p-16">
      <h1 className="text-white font-bold text-4xl px-12">{h1Text}</h1>
      <p className="text-white font-bold text-3xl py-4 px-12">{aboutText}</p>
    </div>
  )
}

export default Header