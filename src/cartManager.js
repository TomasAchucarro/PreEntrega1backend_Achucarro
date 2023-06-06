import fs from "fs";

class CartManager {
  #path;
  constructor(path) {
    this.#path = path;
    this.carts = [];
  }

  getCarts = async () => {
    try {
      const data = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log("Error: file doesnot exist");
      return [];
    }
  };

  getCartById = async (id) => {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === id);
      return cart || null;
    } catch (error) {
      console.error("Error retrieving cart", error);
      return null;
    }
  };

  addCart = async (products = []) => {
    const carts = await this.getCarts();
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const newCart = {
      id: id,
      products: products,
    };
    carts.push(newCart);
    await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, "\t"));
    this.carts = carts;
    return newCart;
  };

  addProductsToCart = async (cartId, productId) => {
    let carts = await this.getCarts();
    const cart = await this.getCartById(cartId);
    if (!cart) {
      return null;
    }
    const Product = cart.products.find((item) => item.product === productId);
    if (Product) {
      Product.quantity++;
    } else {
      const product = {
        product: productId,
        quantity: 1,
      };
      cart.products.push(product);
    }
    const cartIndex = carts.findIndex((item) => item.id === cartId);
    if (cartIndex !== -1) {
      carts[cartIndex] = cart;
    }
    await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, "\t"));
    return cart;
  };
}

const cartManager = new CartManager("./src/json/cart.json");
export default cartManager;
