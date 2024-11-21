import React, { createContext, useContext, useState } from 'react';
import './App.css';

const CartContext = createContext();

function App() {
  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Smartphone', price: 699 },
    { id: 3, name: 'Headphone', price: 199 },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find((item) => item.id === product.id);
      if (productInCart) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      <div className="App">
        <h1>Shopping Cart</h1>
        <ProductList products={products} />
        <Cart />
      </div>
    </CartContext.Provider>
  );
}

function ProductList({ products }) {
  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductItem({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div style={{ marginBottom: '10px' }}>
      <p>
        {product.name} - ${product.price}
      </p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>The cart is empty</p>
      ) : (
        <>
          <ul style={{ padding: 0, listStyleType: 'none' }}>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}


function CartItem({ item }) {
  const { removeFromCart } = useContext(CartContext);

  return (
    <li style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ marginBottom: '10px' }}>
          {item.name} - ${item.price} x {item.quantity}
        </span>
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </li>
  );
}



export default App;
