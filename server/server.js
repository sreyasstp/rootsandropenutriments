const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS FIX
app.use(
  cors({
    origin: [
      "http://localhost:5173",          // local dev
      "https://server-rooots.onrender.com/" // deployed frontend
    ],

    credentials: true,
  })
);

app.use(express.json());

app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/auth", require("./routes/auth.routes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
