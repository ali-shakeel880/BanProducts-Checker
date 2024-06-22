import React from "react"
import { featured } from "../Data"

const FeaturedCard = () => {
  return (
    <>


    {/* <div className="grid grid-cols-3">

<div className="grid-col-span-1">card1</div>
<div className="grid-col-span-1">card 2</div>
<div className="grid-col-span-1"> card 3</div>
<div className="grid-col-span-1"> card 4</div>
<div className="grid-col-span-1"> card 5</div>
<div className="grid-col-span-1"> card 6</div>
    </div> */}
      <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-4 space-y-4'>
        {featured.map((items, index) => (
          <div className='box grid-col-span-1' key={index}>
            <img src={items.cover} alt='Item logo' />
            <h4>{items.title}</h4>
            <label>{items.country}</label>
          </div>
        ))}
      </div>
    </>
  )
}

export default FeaturedCard