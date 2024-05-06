// latest-cupOrder/route.js

import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { TierneysOrder } from "@/models/tierneysOrder";

export async function GET(request) {
  try {
    // MongoDB に接続
    await connectMongoDB();

    // 最新の teaOrder を取得
    const latestTierneysOrder = await TierneysOrder.findOne().sort({
      createdAt: -1,
    });
    if (!latestTierneysOrder) {
      // 最新の teaOrder が見つからない場合はエラーレスポンスを返す
      return NextResponse.json(
        { message: "Latest latestTierneys order not found" },
        { status: 404 }
      );
    }

    // 最新の teaOrder をレスポンスとして返す
    return NextResponse.json({ latestTierneysOrder }, { status: 200 });
  } catch (error) {
    // エラーが発生した場合はエラーレスポンスを返す
    return NextResponse.json(
      {
        message: "Failed to fetch latest latestTierneys order",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
