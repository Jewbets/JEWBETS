document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const buttons = document.querySelectorAll(".product button");
  const cartCount = document.getElementById("cart-count");

  function updateCartCount() {
    cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  updateCartCount();

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.parentElement;
      const title = product.querySelector("h3").innerText;
      const price = product.querySelector("p").innerText.replace("$","");
      const img = product.querySelector("img").src;

      let existing = cart.find(item => item.title === title);
      if(existing){
        existing.quantity++;
      } else {
        cart.push({ title, price, img, quantity:1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(`${title} added to cart!`);
    });
  });
});
