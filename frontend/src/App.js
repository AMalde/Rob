import logo from './logo.svg';
import './App.css';
import Scene from "./Scene";
import React, { useState } from "react";

const ws = new WebSocket("ws://raspberrypi.local:8000/ws");

ws.onmessage = (event) => {
  console.log("Received:", event.data);
};

ws.onopen = () => {
  ws.send("Hello from React!");
};


function App() {
  const [pingResult, setPingResult] = useState(null);

  const pingServer = async () => {
    try {
      const response = await fetch(" http://0.0.0.0:8000/ping");
      const data = await response.json();
      setPingResult(data.status);
    } catch (error) {
      console.error("Error pinging server:", error);
      setPingResult("error");
    }
  };

  return (
    <div className="App">
      <button onClick={pingServer}>Ping Server</button>
      {pingResult && <p>Server says: {pingResult}</p>}
      <Scene />;
    </div>
  );
}

export default App;
