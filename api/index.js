import express from "express";
import db from "./database.js";
import bodyParser from "body-parser";
import cors from "cors";
import stripe from "./routes/stripe.js";
import { config } from "dotenv";

config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/stripe", stripe);

if (db) {
  console.log("MySQL is started");
} else {
  console.log("can't connecting database");
}

app.get("/api/categories", (req, res) => {
  const q = "SELECT * FROM category";
  db.query(q, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/categories/:category_id", (req, res) => {
  const categoryId = req.params.category_id;
  const q = "SELECT * FROM category WHERE category_id = ?";
  db.query(q, [categoryId], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/products", (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/products/:category_id", (req, res) => {
  const categoryId = req.params.category_id;
  const q = "SELECT * FROM products WHERE category_id = ?";
  db.query(q, [categoryId], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/product/:product_id", (req, res) => {
  const productId = req.params.product_id;
  const q = "SELECT * FROM products WHERE product_id = ?";
  db.query(q, [productId], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/products/isFeatured/:isFeatured", (req, res) => {
  const featuredId = req.params.isFeatured;
  const q = "SELECT * FROM products WHERE isFeatured = ?";
  db.query(q, [featuredId], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/products/isTrending/:isTrending", (req, res) => {
  const TrendingId = req.params.isTrending;
  const q = "SELECT * FROM products WHERE isTrending = ?";
  db.query(q, [TrendingId], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
