import React from "react"
import Heading from "../Heading"
import "./featured.css"
import FeaturedCard from "./FeaturedCard"

const Featured = () => {
  return (
    <>
      <section className='featured background'>
        <div className='container'>
          <div className="text-center mt-8 mb-6">
          <h1 className="text-black text-bold text-5xl font-sans">Popular Brands</h1>
          <p className="text-black  text-l mt-4" >These are some most used brands which support Jewish Land</p>
          </div>
          <FeaturedCard />
        </div>
      </section>
    </>
  )
}

export default Featured