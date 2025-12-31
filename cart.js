document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const buttons = document.querySelectorAll(".product button");
  const cartCount = document.getElementById("cart-count");
  const checkoutBtn = document.getElementById("checkout");
  const clearBtn = document.getElementById("clear-cart");
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalDiv = document.getElementById("cart-total");

  function updateCartCount() {
    cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  function renderCart() {
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

  clearBtn.addEventListener("click", () => {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  });

  checkoutBtn.addEventListener("click", async () => {
    if(cart.length === 0){
      alert("Your cart is empty!");
      return;
    }

    // Add Stripe priceId for each item (replace with your actual Stripe price ID)
    const cartWithPriceId = cart.map(item => ({
      ...item,
      priceId: "price_XXXXXXXXXXXX"
    }));

    try {
      const response = await fetch("https://yourserver.com/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartWithPriceId })
      });
      const data = await response.json();
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  });

  renderCart();
  updateCartCount();
});
