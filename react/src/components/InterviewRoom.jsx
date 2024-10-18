import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

// const socket = io("http://localhost:8000");

const InterviewRoom = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get("roomId");
  const email = queryParams.get("email");

  return (
    <div className="mt-4 text-center">
      <h2 className="text-lg font-bold">Room ID: {roomId}</h2>
      <h3 className="text-sm text-gray-600">Email: {email}</h3>
    </div>
  );
};

export default InterviewRoom;
