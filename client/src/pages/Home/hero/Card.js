import React from 'react'
import {Link} from 'react-router-dom'

const Card = ({
  productID,
  thumbnail,
  category,
  title,
  description,
  status,
  reasons,
  countries,
  alternatives,
}) => {
  console.log(
    category,
    title,
    description,
    status,
    reasons,
    countries,
    alternatives
  );

  const shortDescription =
    description.length > 200 ? description.substr(0, 200) + "..." : description;

  const productTitle =
    title.length > 30 ? title.substr(0, 30) + "..." : title;
  return (
    <Link to={`/products/${productID}`} className=" ">
    <div className='mt-24  '>
      <div class="max-w-md max-h-[190px] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <div class="md:flex">
        <div class="md:shrink-0">
            <img class="h-48 w-full object-cover md:h-full md:w-48" src={thumbnail}/>
        </div>
        <div class="p-8">
            <div class={`uppercase tracking-wide text-sm text-indigo-500 font-semibold ml-2 ${status === 'boycott' || status==='avoid' ? 'text-red-500' : 'text-green-500'}`}>
            {status === 'avoid' || status === 'boycott' ? 'Boycott' : 'Available'}
            </div>
            <p class="block mt-1 text-lg leading-tight font-medium text-gray hover:underline">{productTitle}
            </p>
            <p class="mt-2 text-slate-500">{shortDescription}
            </p>
        </div>
    </div>
</div>
    </div></Link>
  )
}

export default Card
