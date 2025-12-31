document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const buttons = document.querySelectorAll(".product button");
  const cartCount = document.getElementById("cart-count");
  const checkoutBtn = document.getElementById("checkout");
  const clearBtn = document.getElementById("clear-cart");

  function updateCartCount() {
    cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  updateCartCount();

  // Add to cart buttons
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

  // Clear cart
  clearBtn.addEventListener("click", () => {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    document.getElementById("cart-items").innerHTML = "<p>Your cart is empty!</p>";
    document.getElementById("cart-total").innerText = "";
  });

  // Checkout button now redirects to your Stripe Payment Link
  checkoutBtn.addEventListener("click", () => {
    if(cart.length === 0){
      alert("Your cart is empty!");
      return;
    }
    // Redirect to your Stripe Payment Link
    window.location.href = "https://buy.stripe.com/test_5kQfZhgAh8H76EIeCwbAs00";
  });
});
