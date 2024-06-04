import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectMongoDB();

  try {
    const users = await User.find(); // 全ユーザーを取得
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const { name, email, key, openTill, closeTill, openBar, closeBar, timeOff } =
    await request.json();

  // Ensure the required fields are provided
  if (
    !name ||
    !email ||
    key === undefined ||
    openTill === undefined ||
    closeTill === undefined ||
    openBar === undefined ||
    closeBar === undefined
  ) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  await connectMongoDB();

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 } // 409 Conflict
      );
    }

    const newUser = await User.create({
      name,
      email,
      key,
      openTill,
      closeTill,
      openBar,
      closeBar,
      timeOff,
    });

    return NextResponse.json(
      { message: "User saved successfully", newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { message: "Failed to save user", error: error.message },
      { status: 500 }
    );
  }
}
