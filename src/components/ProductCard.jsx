import React from 'react';

export default function ProductCard({
  product: { id, image, title, category, price },
}) {
  return (
    <li>
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{`US $${price}.00`}</p>
      </div>
      <p>{category}</p>
    </li>
  );
}
