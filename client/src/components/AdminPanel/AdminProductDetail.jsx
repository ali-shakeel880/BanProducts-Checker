import React from 'react'
import { Link } from 'react-router-dom'
import Thumbnail from '../../images/blog101.jpg'

const ProductDetail = () => {
  return (
    <section className="product-detail">
      <div className="container product-detail__container">
        <div className="product-detail__header">
          <div className="product-detail__buttons">
            <Link to={`/admin/products/werwer/edit`} className='btn sm primary'>Edit</Link>
            <Link to={'/admin/products/werwer/delete'} className='btn sm danger'>Delete</Link>
          </div>
        </div>
        <h1>This is the product title</h1>
        <div className="product-detail__thumbnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ad esse tempore. Dolorem ea iusto optio ab recusandae expedita, esse facere nostrum ipsa ratione ducimus enim consequatur distinctio vitae, deserunt, odit perferendis sapiente quam mollitia. Error quas inventore obcaecati perspiciatis?
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam explicabo sapiente atspernatur, magnam molestiae quaerat nisi provident, unde, cupiditate cumque pariatur obcaecati.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam blanditiis itaque, maxime reprehenderit modi accusamus quia praesentium amet inventore dolores, quas velit distinctio dolor eum est labore reiciendis officia nihil?Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam itaque rem quidem necessitatibus, explicabo non exercitationem hic id officiis quas laborum sed animi assumenda, nemo, suscipit a unde neque! Nam in maxime est numquam facere vero recusandae tempora blanditiis praesentium.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis unde eveniet, nulla vitae molestiae culpa, adipisci rerum inventore voluptate voluptates rem nesciunt mollitia repellat quidem quae aliquam facere enim veritatis.
        </p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente est excepturi, veritatis nam alias praesentium sequi deleniti sed error sit labore consequatur tenetur repellendus. Alias ipsum, tempore rem natus adipisci magni, vitae, sunt illum dolores aspernatur nemo beatae dolorem ex nam. Perspiciatis quibusdam expedita consequuntur sequi quisquam sed! Aliquam fugit magnam deserunt sequi fuga, laudantium, voluptatum at vel atque dolorem quia reiciendis excepturi recusandae corporis temporibus quod animi sed aut, minus assumenda. Nesciunt natus laboriosam officia laudantium cumque corrupti et repellat tempora voluptate, expedita incidunt debitis impedit doloremque, ratione est ipsa veniam cupiditate vel eligendi voluptas explicabo! Expedita ex cumque eum aliquid ipsum inventore consequatur cupiditate aliquam reprehenderit. Ea ipsa nesciunt ratione accusantium minima qui eum. Perspiciatis nemo quam ullam non quas facilis quia aperiam adipisci laborum reiciendis cumque dolor corporis, accusantium facere aliquam sunt iure natus debitis vitae eveniet voluptatibus similique? Laudantium possimus voluptatum at neque unde aliquid omnis blanditiis nihil officia, sapiente facere quas voluptatem rerum architecto ipsum illo deleniti vero ex praesentium hic et aspernatur. Officia, inventore exercitationem. Possimus ipsa nobis expedita eaque voluptate? Dolorem eum autem numquam eos, dignissimos minima laboriosam aut qui illo esse? Unde reprehenderit nulla, commodi eveniet deleniti quidem officiis! Eum, magnam incidunt!</p>
      </div>
    </section>
  )
}

export default ProductDetail