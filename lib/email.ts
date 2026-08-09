import nodemailer from "nodemailer";
import { SITE } from "@/lib/constants";
import type { AdmissionServerValues } from "@/lib/validations/admission";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter;
}

/**
 * Notifies the school's admissions inbox of a new application,
 * and sends the parent a short confirmation email.
 */
export async function sendAdmissionEmails(data: AdmissionServerValues) {
  const mail = getTransporter();
  const from = process.env.MAIL_FROM ?? `"${SITE.name}" <no-reply@aljannatschool.edu.pk>`;
  const notifyTo = process.env.ADMISSIONS_NOTIFY_EMAIL ?? SITE.email;

  const staffHtml = `
    <h2>New Admission Application</h2>
    <p><strong>Student:</strong> ${data.studentName}</p>
    <p><strong>Father's Name:</strong> ${data.fatherName}</p>
    <p><strong>Mother's Name:</strong> ${data.motherName}</p>
    <p><strong>Date of Birth:</strong> ${data.dateOfBirth}</p>
    <p><strong>Gender:</strong> ${data.gender}</p>
    <p><strong>Class Applied For:</strong> ${data.classAppliedFor}</p>
    <p><strong>Parent Phone:</strong> ${data.parentPhone}</p>
    <p><strong>Parent Email:</strong> ${data.parentEmail}</p>
    <p><strong>Address:</strong> ${data.address}</p>
    <p>Review this application in the admin dashboard.</p>
  `;

  const parentHtml = `
    <h2>Thank you for applying to ${SITE.name}</h2>
    <p>Assalam-o-Alaikum,</p>
    <p>We've received the admission application for <strong>${data.studentName}</strong>
    (${data.classAppliedFor}). Our admissions team will review it and contact you at
    ${data.parentPhone} or this email address within 2–3 working days.</p>
    <p>If you have any questions in the meantime, reach us at ${SITE.phones.join(" or ")} or
    ${SITE.email}.</p>
    <p>JazakAllah Khair,<br/>${SITE.name} Admissions Team</p>
  `;

  await Promise.all([
    mail.sendMail({
      from,
      to: notifyTo,
      subject: `New Admission Application — ${data.studentName} (${data.classAppliedFor})`,
      html: staffHtml,
    }),
    mail.sendMail({
      from,
      to: data.parentEmail,
      subject: `We've received your application — ${SITE.name}`,
      html: parentHtml,
    }),
  ]);
}

export async function sendContactNotification(input: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const mail = getTransporter();
  const from = process.env.MAIL_FROM ?? `"${SITE.name}" <no-reply@aljannatschool.edu.pk>`;
  const notifyTo = process.env.ADMISSIONS_NOTIFY_EMAIL ?? SITE.email;

  await mail.sendMail({
    from,
    to: notifyTo,
    replyTo: input.email,
    subject: `New Contact Message — ${input.subject || "Website Inquiry"}`,
    html: `
      <h2>New message from the website contact form</h2>
      <p><strong>Name:</strong> ${input.name}</p>
      <p><strong>Email:</strong> ${input.email}</p>
      <p><strong>Phone:</strong> ${input.phone || "—"}</p>
      <p><strong>Message:</strong></p>
      <p>${input.message.replace(/\n/g, "<br/>")}</p>
    `,
  });
}
