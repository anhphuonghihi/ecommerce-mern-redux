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
  .connect("mongodb://localhost:27017/redux", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
