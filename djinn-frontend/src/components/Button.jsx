const Button = ({buttonText, onClick}) => {
  return(
  <div>
    <button class="h-7 px-3 m-2 text-sm text-gray-800 transition-colors duration-150 bg-white rounded-lg focus:shadow-outline hover:bg-indigo-400" onClick={onClick}>
      {buttonText}
    </button>
  </div>
  )
}

export default Button;