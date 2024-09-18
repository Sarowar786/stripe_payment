import React, { useState, useEffect } from "react";
import "./App.css";
import image from './assets/pixel7.png'

const ProductDisplay = () => (
  <section className="product_page">
    <div className=".product_cart{
">
      <img
        src={image}
        alt="google pixel 7"
      />
      <div className="description">
      <h3>Google pixel 7</h3>
      <h5>$1500.00</h5>
      </div>
    </div>
    <form action="http://localhost:8000/create-checkout-session" method="POST">
      <button type="submit" className="btn">
        Checkout
      </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}