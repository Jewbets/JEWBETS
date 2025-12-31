document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItems.innerHTML = "<p>Your cart is empty</p>";
      cartTotal.textContent = "";
      return;
    }

    cart.forEach((item, i) => {
      total += item.price * item.quantity;

      cartItems.innerHTML += `
        <div class="product">
          <img src="${item.img}">
          <h3>${item.title}</h3>
          <p>$${item.price}</p>
          <div class="quantity">
            <button class="minus" data-i="${i}">−</button>
            <span>${item.quantity}</span>
            <button class="plus" data-i="${i}">+</button>
          </div>
          <button class="remove-item" data-i="${i}">Remove</button>
        </div>
      `;
    });

    cartTotal.textContent = `Total: $${total}`;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  cartItems.addEventListener("click", e => {
    const i = e.target.dataset.i;
    if (e.target.classList.contains("plus")) cart[i].quantity++;
    if (e.target.classList.contains("minus")) {
      cart[i].quantity > 1 ? cart[i].quantity-- : cart.splice(i, 1);
    }
    if (e.target.classList.contains("remove-item")) cart.splice(i, 1);
    renderCart();
  });

  document.getElementById("clear-cart").onclick = () => {
    cart = [];
    renderCart();
  };

  renderCart();
});
