// latest-teaOrder/route.js
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { CupOrder } from "@/models/tierneys";

export async function GET(request) {
  try {
    // MongoDB に接続
    await connectMongoDB();

    // 最新の teaOrder を取得
    const latestCupOrder = await CupOrder.findOne().sort({ createdAt: -1 });
    if (!latestCupOrder) {
      // 最新の teaOrder が見つからない場合はエラーレスポンスを返す
      return NextResponse.json(
        { message: "Latest cup order not found" },
        { status: 404 }
      );
    }

    // 最新の teaOrder をレスポンスとして返す
    return NextResponse.json({ latestCupOrder }, { status: 200 });
  } catch (error) {
    // エラーが発生した場合はエラーレスポンスを返す
    return NextResponse.json(
      { message: "Failed to fetch latest cup order", error: error.message },
      { status: 500 }
    );
  }
}
