// order-cup/route.js
import { connectMongoDB } from "@/lib/mongodb";
// import { CupOrder } from "@/models/tierneys";
import { NextResponse } from "next/server";
import { TierneysOrder } from "@/models/tierneysOrder";

export async function POST(request) {
  // リクエストからJSONデータを抽出します
  const data = await request.json();
  const { orderDate, orderDetails } = data;
  // console.log("orderDate, orderDetails ", orderDate, orderDetails);

  if (!orderDate || !orderDetails || !Array.isArray(orderDetails)) {
    return NextResponse.json(
      { message: "Invalid data provided" },
      { status: 400 } // Bad Request
    );
  }

  // MongoDBへの接続を確立
  await connectMongoDB();

  // 新しいCupOrderを作成し、データベースに保存
  try {
    const newTierneysOrder = await TierneysOrder.create({
      orderDate,
      orderDetails,
    });
    // 成功した場合は201ステータスとともにメッセージを返す
    return NextResponse.json(
      { message: "Tierneys order saved successfully", newTierneysOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving cup order:", error); // より詳細なエラーログ
    return NextResponse.json(
      { message: "Failed to save cup order", error: error.message },
      { status: 500 }
    );
  }
}
