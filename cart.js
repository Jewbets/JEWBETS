document.addEventListener("DOMContentLoaded", () => {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const clearBtn = document.getElementById("clear-cart");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;

    if(cart.length === 0) {
      cartItemsDiv.innerHTML = "<p>Your cart is empty!</p>";
      cartTotal.innerText = "";
      return;
    }

    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("product");
      div.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.price}</p>
        <button class="remove-item" data-index="${index}">Remove</button>
      `;
      cartItemsDiv.appendChild(div);
      total += parseFloat(item.price.replace("$",""));
    });

    cartTotal.innerText = "Total: $" + total.toFixed(2);

    document.querySelectorAll(".remove-item").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.dataset.index;
        cart.splice(idx, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });
  }

  clearBtn.addEventListener("click", () => {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });

  renderCart();
});
