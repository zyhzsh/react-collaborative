import React, { useEffect } from "react";
import "./App.css";
import Whiteboard from "./components/WhiteBoard/WhiteBoard";
import { connectWithSocketServer } from "../socketConn/socketConn";
import CursorOverlay from "./components/CursorOverlay/CursorOverlay";

function App() {

  useEffect(() => {
    connectWithSocketServer();
  }, []);

  return (
    <div className="App">
      <Whiteboard />
      <CursorOverlay />
    </div>
  );
}

export default App;
