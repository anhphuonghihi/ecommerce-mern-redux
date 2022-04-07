import { useState } from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
const App = () => {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
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
  //sắp xếp sản phẩm
  const filterProducts = (event) => {
    const sort = event.target.value;
    console.log(event.target.value);
    setSort(sort);
    setProducts(
      data.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        )
    );
  };
  //lọc kích thước
  const sortProducts = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      setSize(event.target.value);
      setProducts(data.products);
    } else {
      setSize(event.target.value);
      setProducts(
        data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        )
      );
    }
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
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            ></Filter>
            <Products products={products} addToCart={addToCart}></Products>
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
