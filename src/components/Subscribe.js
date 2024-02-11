import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubscriptionCard from "./smallComponents/SubscriptionCard";
import axios from "axios";
import Qrimage from "../images/qr.jpeg";

function Subscribe() {
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [utrNumber, setUtrNumber] = useState("");

  const handleUpgradeButtonClick = () => {
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setUtrNumber("");
  };

  const handlePaymentSubmit = async () => {
    try {
      const userId = localStorage.getItem("UserId");
      const token = localStorage.getItem("token");
      console.log("UTR Number:", utrNumber);
      const data = {
        userId,
        UtrNumber: utrNumber,
      };

      const res = await axios.post("http://localhost:3000/api/request", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        alert("Payment Successful , wait for confirmation ");
      }
      console.log(res.data.data);

      handleCloseModal();
    } catch (error) {
      console.error("Error submitting payment:", error.message);
    }
  };

  const validateSub = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("UserId");
      if (!token) {
        navigate("/");
      }
      const res = await axios.get(
        `http://localhost:3000/api/auth/sub/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        navigate("/homepage");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    validateSub();
  }, []);

  return (
    <div className="flex min-h-screen pt-[30px] px-[40px]">
      <div className="min-w-full">
        <p className="text-[#00153B] text-[20px] leading-[40px] font-semibold">
          Your Subscription
        </p>

        <SubscriptionCard
          type="Premium"
          name="Access our content"
          price="₹100"
          credits="Access amazing News"
          users="Unlimited"
          isCurrentPlan={false}
          onButtonClick={handleUpgradeButtonClick}
        />

        {showPaymentModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg w-96">
              <img src={Qrimage} alt="QR Code" className="w-32 mx-auto" />
              <p className="text-center mt-4 mb-2">
                Pay ₹100 on this QR code to activate subscription
              </p>
              <input
                type="text"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                placeholder="Enter UTR number"
                className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
              />
              <div className="flex justify-center">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePaymentSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Subscribe;
