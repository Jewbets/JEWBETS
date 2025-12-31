document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const buttons = document.querySelectorAll(".product button");
  const cartCount = document.getElementById("cart-count");
  const checkoutBtn = document.getElementById("checkout");
  const clearBtn = document.getElementById("clear-cart");
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalDiv = document.getElementById("cart-total");

  // Update cart counter
  function updateCartCount() {
    if(cartCount) {
      cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    }
  }

  // Render cart items
  function renderCart() {
    if(!cartItemsDiv) return;
    cartItemsDiv.innerHTML = "";
    if(cart.length === 0){
      cartItemsDiv.innerHTML = "<p>Your cart is empty!</p>";
      cartTotalDiv.innerText = "";
      return;
    }
    let total = 0;
    cart.forEach((item, index)=>{
      const div = document.createElement("div");
      div.classList.add("product");
      div.innerHTML = `
        <img src="${item.img}" alt="${item.title}" class="cart-img">
        <h3>${item.title}</h3>
        <p>$${item.price}</p>
        <div class="quantity">
          <button class="decrease" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="increase" data-index="${index}">+</button>
        </div>
        <button class="remove-item" data-index="${index}">Remove</button>
      `;
      cartItemsDiv.appendChild(div);
      total += parseFloat(item.price) * item.quantity;
    });
    cartTotalDiv.innerText = "Total: $" + total.toFixed(2);

    // Quantity buttons
    document.querySelectorAll(".increase").forEach(btn=>{
      btn.addEventListener("click",(e)=>{
        const idx = e.target.dataset.index;
        cart[idx].quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
      });
    });

    document.querySelectorAll(".decrease").forEach(btn=>{
      btn.addEventListener("click",(e)=>{
        const idx = e.target.dataset.index;
        if(cart[idx].quantity>1){ cart[idx].quantity--; } else { cart.splice(idx,1); }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
      });
    });

    document.querySelectorAll(".remove-item").forEach(btn=>{
      btn.addEventListener("click",(e)=>{
        const idx = e.target.dataset.index;
        cart.splice(idx,1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
      });
    });
  }

  // Add to Cart buttons
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
      renderCart();
      updateCartCount();
      alert(`${title} added to cart!`);
    });
  });

  // Clear cart
  if(clearBtn){
    clearBtn.addEventListener("click", () => {
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCount();
    });
  }

  // Stripe Payment Link
  const stripePaymentLink = "https://buy.stripe.com/test_5kQfZhgAh8H76EIeCwbAs00";
  if(checkoutBtn){
    checkoutBtn.addEventListener("click", () => {
      if(cart.length === 0){
        alert("Your cart is empty!");
        return;
      }
      window.location.href = stripePaymentLink;
    });
  }

  // Initial render & counter
  renderCart();
  updateCartCount();
});
