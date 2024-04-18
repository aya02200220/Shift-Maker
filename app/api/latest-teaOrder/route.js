// latest-teaOrder/route.js
import { connectMongoDB } from "@/lib/mongodb";
import { TeaOrder } from "@/models/teaOrder"; // 具名のエクスポートをインポートする
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // MongoDB に接続
    await connectMongoDB();

    // 最新の teaOrder を取得
    const latestTeaOrder = await TeaOrder.findOne().sort({ createdAt: -1 });
    if (!latestTeaOrder) {
      // 最新の teaOrder が見つからない場合はエラーレスポンスを返す
      return NextResponse.json(
        { message: "Latest tea order not found" },
        { status: 404 }
      );
    }

    // 最新の teaOrder をレスポンスとして返す
    return NextResponse.json({ latestTeaOrder }, { status: 200 });
  } catch (error) {
    // エラーが発生した場合はエラーレスポンスを返す
    return NextResponse.json(
      { message: "Failed to fetch latest tea order", error: error.message },
      { status: 500 }
    );
  }
}
