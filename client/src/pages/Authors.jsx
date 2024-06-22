import React, { useState } from "react";

import Avatar1 from "../images/avatar1.jpg";
import Avatar2 from "../images/avatar2.jpg";
import Avatar3 from "../images/avatar3.jpg";
import Avatar4 from "../images/avatar4.jpg";
import Avatar5 from "../images/avatar5.jpg";
import { Link } from "react-router-dom";

const authorsData = [
  { id: 1, avatar: Avatar1, name: "Sarmad Aslam", products: 3 },
  { id: 2, avatar: Avatar2, name: "Emily Johnson", products: 5 },
  { id: 3, avatar: Avatar3, name: "Michael Smith", products: 2 },
  { id: 4, avatar: Avatar4, name: "Jessica Williams", products: 4 },
  { id: 5, avatar: Avatar5, name: "David Brown", products: 6 },
];

const Authors = () => {
  const [authors, setAuthors] = useState(authorsData);
  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors__container">
          {authors.map(({id, avatar, name, products}) => {
           return <Link key={id} to={`/products/users/${id}`} className="author" >
            <div className="author__avatar">
              <img src={avatar} alt={`Image of ${name}`} />
            </div>
            <div className="author__info">
              <h4>{name}</h4>
              <p>{products }</p>
            </div>
           </Link>
          })
          }
        </div>
      ) : (
        <h2 className="center">No Authors / Users Found</h2>
      )}
    </section>
  );
};

export default Authors;
