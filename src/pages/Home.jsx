import React from 'react'
import Navbar from "../components/common/Navbar"
import { Link } from "react-router"

function Home() {
  return (
    <>
      <div className="h-40 flex flex-row justify-around items-center">
        <Link to={"/organization"} className='p-8 border rounded-md bg-blue-200'>Organization Record</Link>
        <Link to={"/parcel"} className='p-8 border rounded-md bg-blue-200'>Parcels Record</Link>
        <Link to={"/parcel-report"} className='p-8 border rounded-md bg-blue-200'>Parcels Report</Link>
      </div>
    </>
  )
}

export default Home