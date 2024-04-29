// teaOrder/route.js
import { connectMongoDB } from "@/lib/mongodb";
import { TeaOrder } from "@/models/teaOrder";
import { NextResponse } from "next/server";

export async function POST(request) {
  // リクエストからJSONデータを抽出します
  const data = await request.json();
  const { orderDate, orderDetails } = data;
  console.log("orderDate, orderDetails ", orderDate, orderDetails);

  if (!orderDate || !orderDetails || !Array.isArray(orderDetails)) {
    return NextResponse.json(
      { message: "Invalid data provided" },
      { status: 400 } // Bad Request
    );
  }

  // MongoDBへの接続を確立
  await connectMongoDB();

  // 新しいTeaOrderを作成し、データベースに保存
  try {
    const newTeaOrder = await TeaOrder.create({
      orderDate,
      orderDetails,
    });
    // 成功した場合は201ステータスとともにメッセージを返す
    return NextResponse.json(
      { message: "Tea order saved successfully", newTeaOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving tea order:", error); // より詳細なエラーログ
    return NextResponse.json(
      { message: "Failed to save tea order", error: error.message },
      { status: 500 }
    );
  }
}
