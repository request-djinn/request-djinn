import {Link} from "react-router-dom"

const Navigation = () => {
  return(
    <nav class="flex font-bold opacity-95 p-2 bg-slate-800 justify-left">
      <Link className="flex text-white text-2xl hover:text-blue-400 px-4" to="/">Request-Djinn</Link>  
      <Link className="text-white justify-left hover:text-blue-400 py-1 px-6"  to="/bins">My Bins</Link> 
        

    </nav>
  )
}


// return (
// <div>
// <Link to="/">Home</Link>
// <Link to="/bins">My Bins</Link>  
// </div>
// )

export default Navigation