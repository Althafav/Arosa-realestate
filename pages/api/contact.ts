import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { firstName, lastName, email, phone, inquiryType, leadType, message } = req.body;

  try {
    // Configure Postmark SMTP Transport
    const transporter = nodemailer.createTransport({
      host: "smtp.postmarkapp.com",
      port: 587,
      auth: {
        user: process.env.POSTMARK_API_TOKEN, // Your Postmark API Key
        pass: process.env.POSTMARK_API_TOKEN, // Same API Key in 'user' & 'pass'
      },
    });

    // Email options
    const mailOptions = {
      from: "althaf.umer@strategic.ae", // Use a verified sender from Postmark
      to: "althaf.umer@strategic.ae", // Your email
      subject: "New Contact Form Submission",
      text: `
        You have a new contact form submission from your website:

        First Name: ${firstName}
        Last Name: ${lastName}
        Email: ${email}
        Phone: ${phone}
        Inquiry Type: ${inquiryType}
        Lead Type: ${leadType}
        Message: ${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Failed to send email", error });
  }
}
