import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";
import config from "../utils/config";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

const SocketProvider = (props) => {
  const socket = useMemo(() => io("http://localhost:5050"), []); 

  return (
    <SocketContext.Provider value={{socket}}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
