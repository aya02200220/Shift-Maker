// latest-teaOrder/route.js
import { connectMongoDB } from "@/lib/mongodb";
import { TeaOrder } from "@/models/teaOrder";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // MongoDB に接続
    await connectMongoDB();

    // 最新の teaOrder を UTC タイムゾーンで取得
    const latestTeaOrder = await TeaOrder.findOne()
      .sort({ createdAt: -1 })
      .lean();
    if (!latestTeaOrder) {
      // 最新の teaOrder が見つからない場合はエラーレスポンスを返す
      return NextResponse.json(
        { message: "Latest tea order not found" },
        { status: 404 }
      );
    }

    // デバッグ用に日付をログに出力
    console.log("Retrieved order date:", latestTeaOrder.createdAt);

    // createdAt フィールドを UTC に変換
    latestTeaOrder.createdAt = new Date(latestTeaOrder.createdAt).toISOString();

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
