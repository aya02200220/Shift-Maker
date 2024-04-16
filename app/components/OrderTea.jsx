"use client";
// OrderTea.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderTea = () => {
  // フォーム入力値の状態を管理するためのステート
  const [teaOrder, setTeaOrder] = useState({
    name: "",
    unopened: 0,
    opened: 0,
    tin: 0,
    order: 0,
  });

  // データを取得して表示するためのステート
  const [previousOrder, setPreviousOrder] = useState(null);

  // コンポーネントがマウントされたときに前回のオーダーを取得
  useEffect(() => {
    async function fetchPreviousOrder() {
      try {
        const response = await axios.get("/api/latest-teaOrder");
        setPreviousOrder(response.data);
      } catch (error) {
        console.error("Error fetching previous order:", error);
      }
    }

    fetchPreviousOrder();
  }, []);

  // フォームの入力値が変更されたときのハンドラー
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeaOrder({ ...teaOrder, [name]: value });
  };

  // オーダーボタンがクリックされたときのハンドラー
  const handleOrderButtonClick = async () => {
    try {
      // APIを呼び出してデータを保存
      await axios.post("/api/teaOrder", teaOrder);
      // 保存後にフォームをクリア
      setTeaOrder({
        name: "",
        unopened: 0,
        opened: 0,
        tin: 0,
        order: 0,
      });
      // 保存後に最新のオーダーを再取得して更新
      const response = await axios.get("/api/latest-teaOrder");
      setPreviousOrder(response.data);
    } catch (error) {
      console.error("Error ordering tea:", error);
    }
  };

  return (
    <div>
      <h2>Tea Order</h2>
      {previousOrder && (
        <div>
          <h3>Previous Order</h3>
          <p>Name: {previousOrder.name}</p>
          <p>Unopened: {previousOrder.unopened}</p>
          <p>Opened: {previousOrder.opened}</p>
          <p>Tin: {previousOrder.tin}</p>
          <p>Order: {previousOrder.order}</p>
        </div>
      )}
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={teaOrder.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Unopened:
          <input
            type="number"
            name="unopened"
            value={teaOrder.unopened}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Opened:
          <input
            type="number"
            name="opened"
            value={teaOrder.opened}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Tin:
          <input
            type="number"
            name="tin"
            value={teaOrder.tin}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Order:
          <input
            type="number"
            name="order"
            value={teaOrder.order}
            onChange={handleInputChange}
          />
        </label>
        <button
          className="bg-blue-400 rounded-sm p-4"
          type="button"
          onClick={handleOrderButtonClick}
        >
          Order
        </button>
      </form>
    </div>
  );
};

export default OrderTea;
