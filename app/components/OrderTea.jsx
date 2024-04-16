import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderTea = () => {
  const [teaOrder, setTeaOrder] = useState({
    orderDetails: [],
  });

  const [previousOrder, setPreviousOrder] = useState(null);

  useEffect(() => {
    async function fetchPreviousOrder() {
      try {
        const response = await axios.get("/api/latest-teaOrder");
        setPreviousOrder(response.data);
        console.log("Previous order:", response.data); // ここでコンソールに出力
      } catch (error) {
        console.error("Error fetching previous order:", error);
      }
    }

    fetchPreviousOrder();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeaOrder({ ...teaOrder, [name]: value });
  };

  const handleOrderButtonClick = async () => {
    try {
      await axios.post("/api/teaOrder", teaOrder);
      setTeaOrder({
        orderDetails: [],
      });
      const response = await axios.get("/api/latest-teaOrder");
      setPreviousOrder(response.data);
    } catch (error) {
      console.error("Error ordering tea:", error);
    }
  };

  return (
    <div>
      <h2>Tea Order</h2>
      {previousOrder && previousOrder.latestTeaOrder.orderDetails && (
        <div>
          <h3>Previous Order</h3>
          <ul>
            {previousOrder.latestTeaOrder.orderDetails.map((detail, index) => (
              <li key={index}>
                <p>Name: {detail.teaName}</p>
                <p>Unopened: {detail.unopened}</p>
                <p>Opened: {detail.opened}</p>
                <p>Tin: {detail.tin}</p>
                <p>Order: {detail.order}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <form>
        <label>
          Tea Name:
          <input
            type="text"
            name="teaName"
            value={teaOrder.teaName || ""}
            onChange={handleInputChange}
          />
        </label>
        {/* Additional inputs for 'unopened', 'opened', 'tin', 'order' */}
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
