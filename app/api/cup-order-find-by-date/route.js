import { connectMongoDB } from "@/lib/mongodb";
// import { TeaOrder } from "@/models/teaOrder";
import { NextResponse } from "next/server";
import { TierneysOrder } from "@/models/tierneysOrder";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderDateStr = searchParams.get("date");
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    // console.log("searchParams", searchParams);
    // console.log("orderDateStr", orderDateStr);

    await connectMongoDB();

    if (orderDateStr) {
      // 日付が提供された場合
      const date = new Date(orderDateStr);
      const startOfDay = new Date(
        Date.UTC(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate(),
          0,
          0,
          0
        )
      );
      const endOfDay = new Date(
        Date.UTC(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate(),
          23,
          59,
          59,
          999
        )
      );

      const orders = await TierneysOrder.find({
        orderDate: { $gte: startOfDay, $lt: endOfDay },
      }).lean();

      if (!orders || orders.length === 0) {
        return NextResponse.json(
          { message: "No orders found for the specified date" },
          { status: 404 }
        );
      }

      // orderDate フィールドを UTC に変換
      orders.forEach((order) => {
        order.orderDate = new Date(order.orderDate).toISOString();
      });

      return NextResponse.json({ orders }, { status: 200 });
    } else if (year && month) {
      // 年と月が提供された場合
      const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
      const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

      const orders = await TierneysOrder.find({
        orderDate: { $gte: startDate, $lte: endDate },
      }).lean();

      if (!orders) {
        // オーダーデータが存在しない場合、空の配列を返す
        return NextResponse.json({ orders: [] }, { status: 200 });
      }

      // orderDate フィールドを UTC に変換
      orders.forEach((order) => {
        order.orderDate = new Date(order.orderDate).toISOString();
      });

      return NextResponse.json({ orders }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Date parameter or year/month parameter is missing" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch orders", error: error.message },
      { status: 500 }
    );
  }
}
