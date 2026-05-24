const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Samurai Websites backend is working 🔥");
});

app.post("/register", (req, res) => {
  const { name, email, message } = req.body;

  console.log("New registration:", { name, email, message });

  res.status(200).json({
    success: true,
    message: "Registration successful!",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});