import { Resend } from "resend";

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

const resendApiKey = process.env.RESEND_API_KEY;
const resendFromAddress = process.env.RESEND_FROM_EMAIL;
const resendFromName = process.env.RESEND_FROM_NAME ?? "Aural Portal";

if (!resendApiKey) {
  throw new Error("RESEND_API_KEY is not set");
}

if (!resendFromAddress) {
  throw new Error("RESEND_FROM_EMAIL is not set");
}

const resend = new Resend(resendApiKey);
const defaultFrom = `${resendFromName} <${resendFromAddress}>`;

async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  const response = await resend.emails.send({
    from: defaultFrom,
    to,
    subject,
    html,
    text,
  });

  if (response.error) {
    throw new Error(response.error.message ?? "Failed to send email");
  }
}

type OtpEmailContext = {
  email: string;
  otp: string;
  type: "sign-in" | "email-verification" | "forget-password";
};

const otpSubjectMap: Record<OtpEmailContext["type"], string> = {
  "email-verification": "Your verification code",
  "forget-password": "Reset password code",
  "sign-in": "Your sign-in code",
};

export async function sendOtpEmail({ email, otp, type }: OtpEmailContext) {
  const subject = otpSubjectMap[type];
  const description =
    type === "email-verification"
      ? "Use the code below to verify your email address."
      : type === "forget-password"
        ? "Use this code to reset your password."
        : "Use this code to finish signing in.";

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <p>${description}</p>
      <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
      <p>This code expires in 5 minutes.</p>
    </div>
  `;

  const text = `${description}\nCode: ${otp}\nThis code expires in 5 minutes.`;

  await sendEmail({
    to: email,
    subject,
    html,
    text,
  });
}

type PasswordResetEmailContext = {
  email: string;
  url: string;
};

export async function sendPasswordResetEmail({
  email,
  url,
}: PasswordResetEmailContext) {
  const subject = "Reset your Aural Portal password";
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <p>You requested to reset your password.</p>
      <p><a href="${url}">Click here to set a new password</a>. This link expires soon.</p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    </div>
  `;
  const text = `Reset your password: ${url}`;

  await sendEmail({
    to: email,
    subject,
    html,
    text,
  });
}
