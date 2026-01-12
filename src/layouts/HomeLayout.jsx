import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Toaster } from "react-hot-toast"

function HomeLayout() {

  return (
    <div className="space-y-5 pt-24 px-[2vw] py-[1vw]">
      <Navbar/>
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  )
}

export default HomeLayout
