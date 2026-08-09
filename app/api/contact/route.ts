import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/email";
import { contactFormSchema } from "@/lib/validations/contact";
import type { ApiResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message ?? "Invalid form data.";
      return NextResponse.json<ApiResponse>({ success: false, message }, { status: 400 });
    }

    const { name, email, phone, subject, message } = parsed.data;

    const saved = await prisma.message.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
      },
    });

    try {
      await sendContactNotification({ name, email, phone, subject, message });
    } catch (emailError) {
      console.error("Contact email notification failed:", emailError);
    }

    return NextResponse.json<ApiResponse<{ id: string }>>(
      { success: true, message: "Message sent successfully.", data: { id: saved.id } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact submission failed:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
