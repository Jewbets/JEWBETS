document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const buttons = document.querySelectorAll(".product button");
  const cartCount = document.getElementById("cart-count");

  cartCount.innerText = cart.length;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.parentElement;
      const title = product.querySelector("h3").innerText;
      const price = product.querySelector("p").innerText;

      cart.push({ title, price });
      localStorage.setItem("cart", JSON.stringify(cart));

      cartCount.innerText = cart.length;
      alert(`${title} added to cart!`);
    });
  });
});
