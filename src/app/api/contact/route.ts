import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (
      !name?.trim() ||
      !email?.trim() ||
      !message?.trim() ||
      !email.includes("@")
    ) {
      return NextResponse.json(
        { error: "All fields are required and email must be valid." },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      console.error("[contact/route] Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars");
      return NextResponse.json(
        { error: "Server misconfiguration. Please contact me directly via email." },
        { status: 500 }
      );
    }

    // Use explicit host/port instead of service:"gmail" for Vercel compatibility
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: gmailUser,
        pass: gmailPass.replace(/\s+/g, ""), // strip any spaces from app password
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email.trim(),
      subject: `[Portfolio] New message from ${name.trim()}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="margin: 0 0 8px; font-size: 20px;">New Contact Message</h2>
          <p style="color: #6b7280; font-size: 13px; margin: 0 0 24px;">Received via your portfolio contact form</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; width: 90px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; font-weight: 600;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px;"><a href="mailto:${email.trim()}" style="color: #6366f1;">${email.trim()}</a></td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <p style="font-size: 13px; color: #6b7280; margin: 0 0 8px;">Message</p>
            <div style="background: #f9fafb; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message.trim()}</div>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">Hit Reply to respond directly to ${name.trim()}.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact/route] sendMail error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
