import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config({ path: "./server/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Samurai Websites backend running 🔥");
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, budget, message } = req.body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "Samurai Websites <onboarding@resend.dev>",
      to: process.env.RECEIVE_EMAIL,
      replyTo: email,
      subject: `New Samurai Websites lead from ${name}`,
      html: `
        <h1>New Samurai Websites Lead ⚔️</h1>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone / WhatsApp:</b> ${phone || "Not provided"}</p>
        <p><b>Budget:</b> ${budget || "Not provided"}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    console.log("EMAIL RESULT:", result);

    res.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.log("CONTACT ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Samurai backend running on http://localhost:${PORT}`);
});