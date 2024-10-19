import React, { useMemo, useEffect, useState } from "react";

const PeerContext = React.createContext(null);
export const usePeer = () => React.useContext(PeerContext);

export const PeerProvider = (props) => {
  const [remoteStream, setRemoteStream] = useState(null);

  // Initialize Peer Connection
  
  const peer = useMemo(
    () =>
      new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      }),
    []
  );

  // Create Offer
  const createOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };

  // Create Answer
  const createAnswer = async (offer) => {
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  };

  // Send Stream (Attach tracks to peer)
  const sendStream = (stream) => {
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      peer.addTrack(track, stream);
    });
  };

  // Set Remote Answer
  const setRemoteAns = async (ans) => {
    await peer.setRemoteDescription(ans);
  };

  // Handle Track Event (Receiving remote streams)
  const handleTrackEvent = (ev) => {
    const [stream] = ev.streams;
    setRemoteStream(stream);
  };

  // Add event listener for 'track'
  useEffect(() => {
    peer.addEventListener("track", handleTrackEvent);

    return () => {
      peer.removeEventListener("track", handleTrackEvent);
      peer.close();  // Clean up the peer connection
    };
  }, [peer]);

  return (
    <PeerContext.Provider
      value={{
        peer,
        createOffer,
        setRemoteAns,
        createAnswer,
        sendStream,
        remoteStream,
      }}
    >
      {props.children}
    </PeerContext.Provider>
  );
};

export default PeerProvider;
