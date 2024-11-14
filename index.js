const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
    console.log("Payment Request Recieved for this amount >>> ", total);
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
      // res.send(total);
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(400).json({
      message: " total must be greater than 0",
    });
  }
});

//     // OK - Created
//     res.status(201).send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } else {
//     res.status(400).send({ message: "no amaunt provided" });
//   }
// });





    app.listen(5000, (err) => {
      if (err) throw err;
      console.log("Amazon Server Running on PORT: 5000, http://localhost:5000");
    });