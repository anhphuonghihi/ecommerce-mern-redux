import { useState } from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

const App = () => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  //Xóa sản phẩm
  const removeFromCart = (product) => {
    setCartItems(cartItems.filter((x) => x._id !== product._id));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );
  };
  //hàm thêm sản phẩm nếu ko có thì thêm mới,nếu có thì cộng số lượng
  const addToCart = (product) => {
    const cart = cartItems.slice();
    let alreadyInCart = false;
    cart.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cart.push({ ...product, count: 1 });
    }

    setCartItems(cart);

    localStorage.setItem("cartItems", JSON.stringify(cart));
  };
  const createOrder = (order) => {
    alert("Need to save order for " + order.name);
  };
  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter></Filter>
            <Products addToCart={addToCart}></Products>
          </div>
          <div className="sidebar">
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              createOrder={createOrder}
            />
          </div>
        </div>
      </main>
      <footer>All right is reserved.</footer>
    </div>
  );
};

export default App;
