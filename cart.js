document.addEventListener("DOMContentLoaded", () => {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const clearBtn = document.getElementById("clear-cart");
  const checkoutBtn = document.getElementById("checkout");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;

    if(cart.length === 0){
      cartItemsDiv.innerHTML = "<p>Your cart is empty!</p>";
      cartTotal.innerText = "";
      return;
    }

    cart.forEach((item,index)=>{
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

    cartTotal.innerText = "Total: $" + total.toFixed(2);

    document.querySelectorAll(".increase").forEach(btn=>{
      btn.addEventListener("click",(e)=>{
        const idx = e.target.dataset.index;
        cart[idx].quantity++;
        localStorage.setItem("cart",JSON.stringify(cart));
        renderCart();
      });
    });

    document.querySelectorAll(".decrease").forEach(btn=>{
      btn.addEventListener("click",(e)=>{
        const idx = e.target.dataset.index;
        if(cart[idx].quantity>1){ cart[idx].quantity--; } else { cart.splice(idx,1); }
        localStorage.setItem("cart",JSON.stringify(cart));
        renderCart();
      });
    });

    document.querySelectorAll(".remove-item").forEach(btn=>{
      btn.addEventListener("click",(e)=>{
        const idx = e.target.dataset.index;
        cart.splice(idx,1);
        localStorage.setItem("cart",JSON.stringify(cart));
        renderCart();
      });
    });
  }

  clearBtn.addEventListener("click",()=>{
    cart = [];
    localStorage.setItem("cart",JSON.stringify(cart));
    renderCart();
  });

  checkoutBtn.addEventListener("click",()=>{
    if(cart.length===0){ alert("Your cart is empty!"); return; }
    alert("Thank you for your order!");
    cart = [];
    localStorage.setItem("cart",JSON.stringify(cart));
    renderCart();
  });

  renderCart();
});
