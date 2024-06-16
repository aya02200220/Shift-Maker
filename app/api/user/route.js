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
  const {
    name,
    email,
    key,
    openTill,
    closeTill,
    openBar,
    closeBar,
    note,
    timeOff,
  } = await request.json();

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
        { status: 409 }
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
      note,
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

export async function DELETE(request) {
  let id;
  try {
    const body = await request.json();
    id = body.id;
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { message: "Invalid request body", error: error.message },
      { status: 400 }
    );
  }

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  await connectMongoDB();

  try {
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await User.deleteOne({ _id: id });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Failed to delete user", error: error.message },
      { status: 500 }
    );
  }
}
