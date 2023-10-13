import express from "express";
import Stripe from "stripe";
import { config } from "dotenv";
import db from "../database.js";

config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

// api from PayButton.jsx
router.post("/create-checkout-session", async (req, res) => {
  const cartSummary = req.body.cartItems.map((item) => {
    return {
      product_id: item.product_id,
      title: item.title,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    };
  });

  const DateAndTime = new Date();

  const formattedGMTtoUTC = DateAndTime.toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  });

  const ProductId = cartSummary.map((item) => item.product_id);
  const ProductTitle = cartSummary.map((item) => item.title);
  const ProductQuantity = cartSummary.map((item) => item.quantity);
  const ProductTotal = cartSummary.map((item) => item.subtotal);

  const customer = await stripe.customers.create({
    metadata: {
      // cart: JSON.stringify(cartSummary),
      id: req.body.id,
      Title: JSON.stringify(ProductTitle),
      productid: JSON.stringify(ProductId),
      Quantity: JSON.stringify(ProductQuantity),
      order_time: formattedGMTtoUTC.toString(),
    },
  });

  // console.log("Customer: ", customer);

  // console.log("DATA: ", cartItemsMetadata);

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "thb",
        product_data: {
          name: item.title,
          images: [item.img],
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["TH"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "thb",
          },
          display_name: "Free shipping",
          // Delivers between 3-5 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 3,
            },
            maximum: {
              unit: "business_day",
              value: 5,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 20000,
            currency: "thb",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/failed`,
  });

  res.send({ url: session.url });
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    // const body = JSON.stringify(req.body, null, 2);
    // console.log("body: ", body);

    let data;
    let eventType;

    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("Webhook verified: ", event);
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // console.log("Webhook Data: ", data);

    // Handle the event
    if (eventType === "checkout.session.completed") {
      const customerData = data.customer;

      const CSDATE = new Date();

      const FormattedUTC = CSDATE.toLocaleString("en-US", {
        timeZone: "Asia/Bangkok",
      });

      if (customerData) {
        stripe.customers
          .retrieve(customerData)
          .then(async (customer) => {
            const customerId = customer.id || "errID";
            const customerEmail = customer.email || "errEmail";
            const name = data.customer_details.name || "name";
            const ProductTitle = customer.metadata.Title;
            const Quantity = customer.metadata.Quantity;
            const shipping =
              data.shipping_cost.amount_total === 20000
                ? "Next day air"
                : "Free";
            const totalprice = data.amount_total / 100; // Convert to the appropriate currency
            const address1 = data.customer_details.address.line1;
            const address2 = data.customer_details.address.line2;
            const city = data.customer_details.address.city;
            const postalCode = data.customer_details.address.postal_code;
            const phoneNumber = data.customer_details.phone;
            const ordertime = FormattedUTC;

            const productId = customer.metadata.productid;

            // console.log("Product: ", product);
            // console.log("Address: ", address);

            try {
              const connection = await db.promise();
              await connection.execute(
                "INSERT INTO orders (`CustomerId`, `CustomerEmail`, `Name`, `Product`, `ProductId`, `Quantity`, `Shipping`, `TotalPrice`, `Address1`, `Address2`, `City`, `Postal_code`, `Phone`, `Ordertime`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                  customerId,
                  customerEmail,
                  name,
                  ProductTitle,
                  productId,
                  Quantity,
                  shipping,
                  totalprice,
                  address1,
                  address2,
                  city,
                  postalCode,
                  phoneNumber,
                  ordertime,
                ]
              );

              // console.log("Inserted data into the database:", rows);
            } catch (error) {
              console.error("Error inserting data into the database:", error);
            }
            // console.log("Customer: ", customer);
            // console.log("data: ", data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        console.log("Customer ID: undefined.");
      }
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  }
);

export default router;
