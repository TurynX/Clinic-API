import { Worker } from "bullmq";
import nodemailer from "nodemailer";
import { bullmqConnection } from "../lib/redis";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "victorkatythor@gmail.com",
    pass: "geye ogkv fsni lmeg",
  },
});

export const appointmentWorker = new Worker(
  "appointment",
  async (job) => {
    const { email, name } = job.data;
    await transporter.sendMail({
      from: "Clinic <clinic@example.com>",
      to: email,
      subject: "Appointment Confirmation",
      text: `Hello ${name}, your appointment has been confirmed.`,
    });
  },
  { connection: bullmqConnection },
);
