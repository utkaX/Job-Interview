import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useSocket } from "../context/Socket";
import { usePeer } from "../context/Peer";

const InterviewRoom = () => {
  const { socket } = useSocket();
  const {
    peer,
    createOffer,
    createAnswer,
    setRemoteAns,
    sendStream,
    remoteStream,
  } = usePeer();

  const [myStream, setMyStream] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [remoteEmailId, setRemoteEmailId] = useState(null);
  const [isRemoteStreamActive, setIsRemoteStreamActive] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get("roomId");
  const emailid = queryParams.get("email");
  const userRole = queryParams.get("role");
  let role  = "";
  if(userRole === "interviewer"){
    role = "Job Seeker"
  }
  else{
    role = "Interviewer"
  }
  

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const handleNewUserJoined = useCallback(
    async (data) => {
      const { email } = data;
      console.log("New user joined:", email);
      const offer = await createOffer();
      socket.emit("call-user", { email, offer });
      setRemoteEmailId(email);
    },
    [createOffer, socket]
  );

  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      console.log("Incoming Call from", from);
      const ans = await createAnswer(offer);
      socket.emit("call-accepted", { email: from, ans });
      setRemoteEmailId(from);
    },
    [createAnswer, socket]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      console.log("Call got accepted", ans);
      await setRemoteAns(ans);
    },
    [setRemoteAns]
  );

  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);

    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [socket, handleNewUserJoined, handleIncomingCall, handleCallAccepted]);

  const getUserMediaStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing user media", error);
    }
  }, []);

  const stopStream = useCallback(() => {
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
      setIsStreaming(false);
    }
  }, [myStream]);

  const startStream = useCallback(() => {
    if (myStream) {
      sendStream(myStream);
      setIsStreaming(true);
    } else {
      getUserMediaStream(); // Attempt to get the stream again if it's not available
    }
  }, [myStream, sendStream, getUserMediaStream]);

  const handleNegotiation = useCallback(() => {
    const localOffer = peer.localDescription;
    socket.emit("call-user", { email: remoteEmailId, offer: localOffer });
  }, [peer, remoteEmailId, socket]);

  useEffect(() => {
    peer.addEventListener("negotiationneeded", handleNegotiation);
    return () => {
      peer.removeEventListener("negotiationneeded", handleNegotiation);
    };
  }, [handleNegotiation, peer]);

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
      setIsRemoteStreamActive(true);
      remoteStream.getTracks().forEach((track) => {
        track.addEventListener("ended", () => {
          console.log("Remote stream ended");
          setIsRemoteStreamActive(false);
        });
      });
    }
  }, [remoteStream]);

  return (
    <div className="flex flex-col items-center mt-4 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800">Room ID: {roomId}</h2>
      <h3 className="text-md text-gray-600">Email: {emailid}</h3>
      <h3 className="text-lg text-gray-700 my-2">
        You are connected to {remoteEmailId}
      </h3>


      {/* Buttons to start/stop video stream */}
      <div className="my-4">
        <button
          onClick={startStream}
          disabled={isStreaming}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md mr-2 transition"
        >
          Start Stream
        </button>
        <button
          onClick={stopStream}
          disabled={!isStreaming}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition"
        >
          Stop Stream
        </button>
      </div>

      {/* Video Streams Container */}
      <div className="flex space-x-4">
        {/* Local Video Stream */}
        <div>
          <h3 className="text-lg font-semibold">Your Stream</h3>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="border border-gray-400 rounded-md shadow-md"
            style={{ width: "600px", height: "400px" }}
          />
        </div>

        {/* Remote Video Stream */}
        <div>
          <h3 className="text-lg font-semibold">{remoteEmailId} ({role} Stream)</h3>
          {isRemoteStreamActive ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="border border-gray-400 rounded-md shadow-md"
              style={{ width: "600px", height: "400px" }}
            />
          ) : (
            <div
              className="border border-gray-400 rounded-md shadow-md"
              style={{
                width: "600px",
                height: "400px",
                backgroundColor: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4 className="text-white">Remote Stream Ended</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;
