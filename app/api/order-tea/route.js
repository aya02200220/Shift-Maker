// teaOrder/route.js
import { connectMongoDB } from "@/lib/mongodb";
import { TeaOrder } from "@/models/teaOrder";
import { NextResponse } from "next/server";

export async function POST(request) {
  // リクエストからJSONデータを抽出します
  const data = await request.json();
  const {
    orderDate, // オーダーの日付
    orderDetails, // 紅茶の配列（各紅茶はname, unopened, opened, tin, orderのプロパティを持っています）
  } = data;

  // MongoDBへの接続を確立
  await connectMongoDB();

  // 前回のオーダーを取得
  let previousOrder = null;
  try {
    previousOrder = await TeaOrder.findOne().sort({ orderDate: -1 });
  } catch (error) {
    console.error("Error fetching previous order:", error);
  }

  // 新しいTeaOrderを作成し、データベースに保存
  try {
    const newTeaOrder = await TeaOrder.create({
      orderDate,
      orderDetails,
    });
    // 成功した場合は201ステータスとともにメッセージを返す
    return NextResponse.json(
      { message: "Tea order saved successfully", newTeaOrder, previousOrder },
      { status: 201 }
    );
  } catch (error) {
    // エラーが発生した場合は500ステータスを返す
    return NextResponse.json(
      { message: "Failed to save tea order", error: error.message },
      { status: 500 }
    );
  }
}
