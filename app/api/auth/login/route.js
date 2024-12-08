import { db } from "@/database/database";
import { users } from "@/database/schema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    // Parse the incoming request body
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if the user exists in the database
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 400 }
      );
    }

    // Compare passwords
    const user = existingUser[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 400 }
      );
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set the cookie with the token
    const response = NextResponse.json({
      message: "Login successful",
      user: { id: user.id, email: user.email },
      token: token,
    });

    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; Secure`
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);

    // Ensure we return a response in the catch block
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
