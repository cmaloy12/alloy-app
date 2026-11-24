import { Buffer } from "node:buffer";
import process from "node:process";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

app.post("/api/evaluations", async (req, res) => {
  try {
    const auth = Buffer.from(
      `${process.env.ALLOY_TOKEN}:${process.env.ALLOY_SECRET}`
    ).toString("base64");

    const alloyRes = await fetch("https://sandbox.alloy.co/v1/evaluations/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await alloyRes.json();
    res.status(alloyRes.status).json(data);
  } catch {
    res.status(502).json({ error: "Upstream request failed" });
  }
});

// Serve the built React app
app.use(express.static(path.join(__dirname, "dist")));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));