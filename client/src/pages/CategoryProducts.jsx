import React, { useState } from 'react'
import { DUMMY_PRODUCTS } from '../data'
import ProductItem from '../components/ProductItem'

const CategoryProducts = () => {
  const [products, setproducts] = useState(DUMMY_PRODUCTS)
  return (
    <section>
      {products.length > 0 ? <div className="container products__container">
        {products.map(({ id, thumbnail, category, title, desc, authorID }) => (
          <ProductItem
            key={id}
            productID={id}
            thumbnail={thumbnail}
            category={category}
            title={title}
            description={desc}
            authorID={authorID}
          />
        ))}
      </div> : <h2 className="center">No products Found</h2>}
    </section>
  )
}

export default CategoryProducts