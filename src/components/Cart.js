import { useState } from "react";
import formatCurrency from "../formatCurrency";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
const Cart = ({ cartItems, removeFromCart, createOrder }) => {
  const initState = {
    name: "",
    email: "",
    address: "",
    showCheckout: false,
  };
  const [user, setUser] = useState(initState);
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
    setUser(initState);
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
          <Fade left cascade>
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
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <Fade right cascade>
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
          </Fade>
        )}
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart }
)(Cart);
