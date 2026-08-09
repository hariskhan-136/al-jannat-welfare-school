import { NextResponse } from "next/server";
import { getSession, type AdminSessionPayload } from "@/lib/auth";
import type { ApiResponse } from "@/types";

/**
 * Verifies the caller is a logged-in admin. Returns the session payload on
 * success, or a ready-to-return 401 NextResponse on failure — callers should
 * check `"session" in result` to discriminate.
 */
export async function requireAdmin(): Promise<
  { session: AdminSessionPayload } | { response: NextResponse<ApiResponse> }
> {
  const session = await getSession();
  if (!session) {
    return {
      response: NextResponse.json<ApiResponse>(
        { success: false, message: "Unauthorized. Please log in again." },
        { status: 401 }
      ),
    };
  }
  return { session };
}
