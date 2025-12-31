document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count");

  function updateCartCount() {
    cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
  }

  updateCartCount();

  document.querySelectorAll(".product button").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product");
      const title = product.querySelector("h3").textContent;
      const price = 60;
      const img = product.querySelector("img").src;

      const existing = cart.find(i => i.title === title);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ title, price, img, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    });
  });
});
