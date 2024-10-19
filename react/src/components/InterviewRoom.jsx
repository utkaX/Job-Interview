import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSocket } from "../context/Socket";
import { usePeer } from "../context/Peer";
import ReactPlayer from "react-player";

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
  const [remoteEmailId, setRemoteEmailId] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get("roomId");
  const emailid = queryParams.get("email");

  const handleNewUserJoined = async (data) => {
    const { email } = data;
    console.log("new user joined ", email);
    const offer = await createOffer();
    socket.emit("call-user", { email, offer });
    setRemoteEmailId(email);
  };

  const handleIncomingCall = async (data) => {
    const { from, offer } = data;
    console.log("Incoming Call from", from, offer);
    const ans = await createAnswer(offer);
    socket.emit("call-accepted", { email: from, ans });
    setRemoteEmailId(from);
  };

  const handleCallAccepted = async (data) => {
    const { ans } = data;
    console.log("call got accepted", ans);
    await setRemoteAns(ans);
  };

  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incoming-call", handleIncomingCall); // Fixed typo here
    socket.on("call-accepted", handleCallAccepted);

    // Cleanup socket event listeners
    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incoming-call", handleIncomingCall); // Fixed typo here
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [socket]); // Reduced dependencies to socket

  const getUserMediaStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    setMyStream(stream);
  };

  const hadleNegositation = () => {
    const localOffer = peer.localDescription;
    socket.emit("call-user", { email: remoteEmailId, offer: localOffer });
  };
  useEffect(() => {
    peer.addEventListener("negotiationneeded", hadleNegositation);
    return () => {
      peer.removeEventListener("negotiationneeded", hadleNegositation);
    };
  }, [hadleNegositation]);
  useEffect(() => {
    getUserMediaStream();
  }, []);

  return (
    <>
      <div className="mt-4 text-center">
        <h2 className="text-lg font-bold">Room ID: {roomId}</h2>
        <h3 className="text-sm text-gray-600">Email: {emailid}</h3>
        <h3> you are connected to {remoteEmailId}</h3>
        <button onClick={(e) => sendStream(myStream)}>Send my Video</button>
        <ReactPlayer url={myStream} playing muted />
        <ReactPlayer url={remoteStream} playing />
      </div>
    </>
  );
};

export default InterviewRoom;
