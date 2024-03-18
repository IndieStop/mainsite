"use client";
import React, { useState, useEffect } from "react";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      try {
        setCartItems(JSON.parse(storedItems));
      } catch (error) {
        console.error("Error parsing cart items from localStorage", error);
      }
    }
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter((item) => item.id !== itemId));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const calculateSubtotal = (item) => item.price * item.quantity;

  const calculateTotal = () => {
    let total = cartItems.reduce(
      (acc, item) => acc + calculateSubtotal(item),
      0
    );

    return total.toFixed(2);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center p-4 h-[90vh]">
        <section className="bg-[#231F20] text-gray-300 p-12 rounded-xl shadow-2xl">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-gray-200 border-b border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl "
            >
              <img
                className="object-cover  rounded-t-lg h-48 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={item.image}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-xl font-bold tracking-tight">
                  {item.name}
                </h5>
                <p className="mb-3 font-normal text-gray-400">₹{item.price}</p>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="1"
                  className="bg-transparent text-center ml-4 border-2 max-w-24 mx-8 p-4 border-white"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                />
              </div>
              <div> ₹{calculateSubtotal(item)}</div>
            </div>
          ))}
          <div className="text-center m-4">
            <p className="text-xl">
              <span className="font-bold text-2xl m-4 text-orange-400">
                Total:
              </span>{" "}
              ₹{calculateTotal()}
            </p>
            <button className="bg-orange-400 px-4 rounded text-black text-2xl mt-4">
              Checkout
            </button>
          </div>
        </section>
        <a href="/" className="text-lg mt-4">
          {"<  Back to shopping"}
        </a>
      </div>
    </>
  );
};

export default Checkout;
