import React from "react";

function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600">Oops! Page not found.</p>
        <p className="text-gray-600">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
