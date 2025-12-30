// Initialize cart
let cart = [];

// Select all product buttons
const buttons = document.querySelectorAll(".product button");

// Cart count element
const cartCount = document.getElementById("cart-count");

// Add click event for each button
buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Get product info
    const product = button.parentElement;
    const title = product.querySelector("h3").innerText;
    const price = product.querySelector("p").innerText;

    // Add product to cart array
    cart.push({ title, price });

    // Update cart count
    cartCount.innerText = cart.length;

    // Optional: show alert
    alert(`${title} added to cart!`);
  });
});

// Show cart items on clicking the Cart link
const cartLink = document.querySelector(".cart");
cartLink.addEventListener("click", (e) => {
  e.preventDefault();
  if(cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    let message = "Your cart:\n\n";
    cart.forEach((item, i) => {
      message += `${i+1}. ${item.title} - ${item.price}\n`;
    });
    alert(message);
  }
});
