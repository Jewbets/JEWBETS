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

  // Checkout with Stripe
  checkoutBtn.addEventListener("click", async () => {
    if(cart.length === 0){
      alert("Your cart is empty!");
      return;
    }

    // Add Stripe priceId to each cart item
    const cartWithPriceId = cart.map(item => ({
      ...item,
      priceId: "price_XXXXXXXXXXXX" // <-- Replace with your Stripe Price ID for each product
    }));

    try {
      const response = await fetch("https://yourserver.com/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartWithPriceId })
      });
      const data = await response.json();
      window.location.href = data.url; // Redirect to Stripe Checkout
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  });
});
