const Notification = ({message}) => {
  if (message === null) {
    return null
  } else { 
    return (
      <h3 className="px-32 bg-slate-500 text-green-300">{message}</h3>
    )
  }
}

export default Notification