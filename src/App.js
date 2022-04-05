import { useState } from "react";
import data from "./data.json";
import Products from "./components/Products";
const App = () => {
  const [products, setProducts] = useState(data.products);
  console.log("🚀 ~ file: App.js ~ line 6 ~ App ~ products", products)
  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Products products={products}></Products>
          </div>
          <div className="sidebar">Cart Items</div>
        </div>
      </main>
      <footer>All right is reserved.</footer>
    </div>
  );
};

export default App;
