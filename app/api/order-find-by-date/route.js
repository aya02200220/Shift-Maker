import { connectMongoDB } from "@/lib/mongodb";
import { TeaOrder } from "@/models/teaOrder";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderDateStr = searchParams.get("date");
    console.log("orderDateStr", orderDateStr);

    if (!orderDateStr) {
      return NextResponse.json(
        { message: "Date parameter is missing" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // 指定された日付の開始と終了を計算

    const date = new Date(orderDateStr);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const orders = await TeaOrder.find({
      orderDate: { $gte: startOfDay, $lt: endOfDay },
    });

    if (!orders || orders.length === 0) {
      return NextResponse.json(
        { message: "No orders found for the specified date" },
        { status: 404 }
      );
    }

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch orders by date", error: error.message },
      { status: 500 }
    );
  }
}
