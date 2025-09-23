import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Desativa o bodyParser padrão do Next.js -> Usar formidable
  },
};

function getOptions() {
  return {
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    host: "smtp.gmail.com",
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable();

  form.parse(req, async(err,fields,files) => {
    if (err) return res.status(500).json({ error: "File upload error" });

    try {
      const transporter = nodemailer.createTransport(getOptions());

      const attachments = files.file.map((file) => ({
        filename: file.originalFilename,
        content: fs.readFileSync(file.filepath),
      }));

      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: fields.subject[0],
        text: fields.body[0],
        attachments: attachments,
      });

      res.status(200).json({ success: true, messageId: info.messageId });
    } catch (error) {
      console.error("Email send error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
}
