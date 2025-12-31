const express = require("express");
const app = express();
const stripe = require("stripe")("sk_test_YOUR_SECRET_KEY"); // <-- Replace with your Stripe secret key
app.use(express.json());

// CORS for local testing
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.post("/create-checkout-session", async (req, res) => {
  const cartItems = req.body.items;

  const line_items = cartItems.map(item => ({
    price: item.priceId,
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "https://yourwebsite.com/success.html",
      cancel_url: "https://yourwebsite.com/cancel.html",
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4242, () => console.log("Server running on port 4242"));
