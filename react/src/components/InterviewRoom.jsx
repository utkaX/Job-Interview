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

  // Update remote video srcObject when a remote stream is available
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
    <div className="mt-4 text-center">
      <h2 className="text-lg font-bold">Room ID: {roomId}</h2>
      <h3 className="text-sm text-gray-600">Email: {emailid}</h3>
      <h3>You are connected to {remoteEmailId}</h3>

      {/* Buttons to start/stop video stream */}
      <div className="my-4">
        <button
          onClick={startStream}
          disabled={isStreaming}
          className="px-4 py-2 bg-green-500 text-white rounded mr-2"
        >
          Start Stream
        </button>
        <button
          onClick={stopStream}
          disabled={!isStreaming}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Stop Stream
        </button>
      </div>

      {/* Local Video Stream */}
      <div>
        <h3>Your Stream</h3>
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          style={{ width: "600px", height: "400px", border: "1px solid black" }}
        />
      </div>

      {/* Remote Video Stream */}
      <div>
        <h3>Remote Stream</h3>
        {isRemoteStreamActive ? (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{
              width: "600px",
              height: "400px",
              border: "1px solid black",
            }}
          />
        ) : (
          <div
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
  );
};

export default InterviewRoom;
