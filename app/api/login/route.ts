import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations/login";
import { signSession, verifyPassword, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/lib/auth";
import type { ApiResponse } from "@/types";

// Generic message for both "no such user" and "wrong password" — never confirm
// which part of the credentials was incorrect.
const INVALID_CREDENTIALS_MESSAGE = "Invalid email or password.";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message ?? "Invalid form data.";
      return NextResponse.json<ApiResponse>({ success: false, message }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: INVALID_CREDENTIALS_MESSAGE },
        { status: 401 }
      );
    }

    const passwordValid = await verifyPassword(password, admin.passwordHash);
    if (!passwordValid) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: INVALID_CREDENTIALS_MESSAGE },
        { status: 401 }
      );
    }

    const token = await signSession({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    const response = NextResponse.json<ApiResponse>({
      success: true,
      message: "Logged in successfully.",
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
