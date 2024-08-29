import React, { useState, useEffect } from "react";
import axios from "axios";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("UserId");
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/auth/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        {userData && (
          <div>
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {userData.name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Number:</span> {userData.number}
            </p>
            {/* {userData?.hasSubscribe ? (
              <p className="mb-2">
                <span className="font-semibold">Subscription Type:</span>
                Premium
              </p>
            ) : (
              <p className="mb-2">
                <span className="font-semibold">Subscription Type:</span> Free
              </p>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
