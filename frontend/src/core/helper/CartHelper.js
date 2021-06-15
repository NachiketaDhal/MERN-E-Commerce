export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("tCart")) {
      cart = JSON.parse(localStorage.getItem("tCart"));
    }
    cart.push({
      ...item,
    });
    localStorage.setItem("tCart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== "undefined")
    if (localStorage.getItem("tCart")) {
      return JSON.parse(localStorage.getItem("tCart"));
    }
};

export const removeItemFromCart = (productId) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("tCart")) {
      cart = JSON.parse(localStorage.getItem("tCart"));
    }
    const tempCart = cart.filter((item) => item._id !== productId);
    localStorage.setItem("tCart", JSON.stringify(tempCart));
  }
  return cart;
};

export const cartEmpty = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("tCart");
    next();
  }
};
