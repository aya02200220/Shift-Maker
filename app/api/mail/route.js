import { connectMongoDB } from "@/lib/mongodb";
import Mail from "@/models/mail";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email } = await request.json();
  await connectMongoDB();
  await Mail.create({ name, email });
  return NextResponse.json(
    { message: "User Registered--------" },
    { status: 201 }
  );
}
