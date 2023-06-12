import React, { useState } from "react";
import "./App.css";
import PinInput from "./components/PinInput";
import { FIREBASE_DB_URL, PIN_END_POINT, postData } from "./api";

function App() {
  const [isPosting, setIsPosting] = useState(false);
  const [message, setMessage] = useState("Please enter your Pin ^^");

  const handleCompletePinInput = async (value: string) => {
    setIsPosting(true);

    await postData(FIREBASE_DB_URL + PIN_END_POINT, value)
      .then((res) => {
        setMessage("Success: " + JSON.stringify(res, null, 2));
      })
      .catch((error) => {
        setMessage("Error: " + JSON.stringify(error, null, 2));
      })
      .finally(() => {
        setIsPosting(false);
      });
  };

  return (
    <div className="App">
      <div className="App-card">
        <h1 className="App-header">Pin Input</h1>
        <span className="App-message">{message}</span>

        <PinInput
          defaultValue="000000"
          isSecret={false}
          validatePattern={/[A-Z]/}
          length={6}
          onComplete={handleCompletePinInput}
          isDisable={isPosting}
        />
      </div>
    </div>
  );
}

export default App;
