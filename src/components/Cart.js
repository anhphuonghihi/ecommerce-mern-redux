import { useState } from "react";
import formatCurrency from "../formatCurrency";
const Cart = ({ cartItems, removeFromCart, createOrder }) => {
  const initState = {
    name: "",
    email: "",
    address: "",
    showCheckout: false,
  };
  const [user, setUser] = useState(initState);
  console.log("🚀 ~ file: Cart.js ~ line 11 ~ Cart ~ user", user);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const onSubmitOrder = (e) => {
    e.preventDefault();
    const order = {
      name: user.name,
      email: user.email,
      address: user.address,
      cartItems: user.cartItems,
    };
    createOrder(order);
  };
  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">Cart is empty</div>
      ) : (
        <div className="cart cart-header">
          You have {cartItems.length} in the cart
        </div>
      )}
      <div>
        <div className="cart">
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title}></img>
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} x {item.count}
                    <button
                      className="button"
                      onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {cartItems.length !== 0 && (
          <div className="cart">
            <div className="total">
              <div>
                Total:
                {formatCurrency(
                  cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <button
                onClick={() => {
                  setUser({ ...user, showCheckout: true });
                }}
                className="button primary"
              >
                Proceed
              </button>
            </div>
            {user.showCheckout && (
              <div className="cart">
                <form onSubmit={onSubmitOrder}>
                  <ul className="form-container">
                    <li>
                      <label>Email</label>
                      <input
                        name="email"
                        type="email"
                        required
                        onChange={handleInput}
                      ></input>
                    </li>
                    <li>
                      <label>Name</label>
                      <input
                        name="name"
                        type="text"
                        required
                        onChange={handleInput}
                      ></input>
                    </li>
                    <li>
                      <label>Address</label>
                      <input
                        name="address"
                        type="text"
                        required
                        onChange={handleInput}
                      ></input>
                    </li>
                    <li>
                      <button className="button primary" type="submit">
                        Checkout
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
