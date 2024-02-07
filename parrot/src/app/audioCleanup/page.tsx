import React from "react";
import { Inter } from "@next/font/google";

const AudioCleanupHeader: React.FC = () => {
  return (
    <h1
      style={{
        fontFamily: "Roboto, sans-serif",
        fontSize: "3rem",
        fontWeight: "900",
        color: "white",
        textAlign: "center",
        marginTop: "2rem",
        marginBottom: "1rem",
      }}
    >
      Audio Cleanup
    </h1>
  );
};

const ImportButton: React.FC = () => {
  return (
    <button
      style={{
        fontFamily: "jura",
        fontSize: "2.5rem",
        color: "white",
        background:
          "linear-gradient(90deg, #B059C8 0%, #9449AB 40%, #6C2D7A 70%, #562059 90%, #330F29 100%)",
        height: "56px",
        padding: "0 10px",
        marginTop: "30px",
        marginLeft: "37%",
        marginRight: "25%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        border: "none",
        borderRadius: "22px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "27%",
      }}
    >
      <span style={{ width: "100%" }}>Import your audio</span>
    </button>
  );
};

const NegativePrompt: React.FC = () => {
  return (
    <button
      style={{
        fontFamily: "Roboto, sans-serif",
        fontSize: "1rem",
        color: "GrayText",
        backgroundPosition: "center",
        backgroundColor: "white",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "10px 20px",
        cursor: "pointer",
        marginTop: "40px",
        width: "27%",
        height: "35px",
        marginLeft: "37%",
        marginRight: "25%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        borderRadius: "22px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      Negative Prompt
    </button>
  );
};

const Cleanup: React.FC = () => {
  return (
    <button
      style={{
        fontFamily: "jura",
        fontSize: "33px",
        color: "white",
        background:
          "linear-gradient(90deg, #B059C8 0%, #9449AB 40%, #6C2D7A 70%, #562059 90%, #330F29 100%)",
        height: "40px",
        // padding: "5 5px",
        padding: "20px",
        marginLeft: "43%",
        marginRight: "40%",
        marginTop: "40px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        border: "none",
        borderRadius: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "15%",
      }}
    >
      <span style={{ width: "100%" }}>CLEANUP</span>
    </button>
  );
};

const Cleanedaudio: React.FC = () => {
  return (
    <button
      style={{
        fontFamily: "Roboto, sans-serif",
        fontSize: "1rem",
        color: "black",
        backgroundColor: "white",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "5px 10px",
        cursor: "pointer",
        marginTop: "70px",
        marginLeft: "43%",
        marginRight: "25%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        borderRadius: "22px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "15%",
      }}
    >
      Cleaned audio
    </button>
  );
};

const AudioCleanupPage = () => {
  return (
    <div
      style={{
        paddingTop: "70px",
        marginTop: "30px",
        marginLeft: "150px",
      }}
    >
      <AudioCleanupHeader />
      <ImportButton />
      <NegativePrompt />
      <Cleanup />
      <Cleanedaudio />
      {}
    </div>
  );
};

export default AudioCleanupPage;
