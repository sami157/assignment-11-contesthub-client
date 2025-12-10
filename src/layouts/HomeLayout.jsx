import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function HomeLayout() {

  return (
    <div className="flex flex-col gap-5 px-[2vw] py-[1vw]">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default HomeLayout
