import express from "express";
import cartsRouter from "./routers/carts.router.js";
import productsRouter from "./routers/products.router.js";

const app = express();
app.use(express.json())


app.get("/", (req, res) => {
  try {
    res.send("ok");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

app.listen(8080, () => console.log("Server Up"));
