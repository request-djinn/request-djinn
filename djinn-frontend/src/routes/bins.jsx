import Bins from "../components/Bins"
import Navigation from "../components/Navigation"

const BinsPage = () => {
  return(
    <div>
      <Navigation />
      <h2 className="p-7 text-2xl font-bold">My Bins</h2>
      <Bins />
    </div>
  )
}

export default BinsPage