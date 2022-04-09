const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const port = 5000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);

const colors = require("colors");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://phuong:phuong@note.stjg5.mongodb.net/redux?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => console.log("> Connected...".bgCyan))
  .catch((err) =>
    console.log(
      `> Error while connecting to mongoDB : ${err.message}`.underline.red
    )
  );

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  availableSizes: [String],
});

const Product = mongoose.model("product", ProductSchema);
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.json(deletedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const CartSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    address: String,
    total: Number,
    cartItems: [
      {
        _id: String,
        title: String,
        price: Number,
        count: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("cart", CartSchema);

app.post("/api/orders", async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.address ||
      !req.body.total ||
      !req.body.cartItems
    ) {
      return res.json({ message: "Data is required." });
    }
    const order = await Order(req.body).save();
    res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.delete("/api/orders/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
