const API_URL = `${window.env.REACT_APP_API_GATEWAY_URL}/products`;
const CART_API_URL = `${window.env.REACT_APP_API_GATEWAY_URL}/cart`;

export async function getProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return await res.json();
}

export async function addNewProduct(product, image) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...product, image }),
  });

  if (!res.ok) {
    throw new Error('Failed to add new product');
  }
  return await res.json();
}

export async function addOrUpdateCart(userId, product) {
  const item = {
    userId,
    productId: product.id,
    quantity: product.quantity || 1,
    snapshot: {
      id: product.id,
      title: product.title,
      price: Number(product.price),
      image: product.image,
      option: product.option,
    },
  };

  const res = await fetch(CART_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });

  if (!res.ok) throw new Error('Failed to update cart');
  return await res.json();
}

export async function getCart(userId) {
  const res = await fetch(`${CART_API_URL}?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch cart');
  return await res.json();
}

export async function removeFromCart(userId, productId) {
  const res = await fetch(CART_API_URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, productId }),
  });

  if (!res.ok) throw new Error('Failed to remove from cart');
  return await res.json();
}
