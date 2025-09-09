import { Rnd } from "react-rnd";
import { useState, useEffect } from "react";
import Summary from "./component/Summary";
import PDFUpload from "./component/PDFUpload";
import FAQ from "./component/FAQ";
import History from "./component/History";
import Chat from "./component/Chat";
import UploadProgressBox from "./component/UploadProgressBox"; 
import Welcome from "./assets/welcome.png";

export default function App() {
  const [sessionId, setSessionId] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle | uploading | ready

  // Poll backend for status if uploading
  useEffect(() => {
    if (uploadStatus !== "uploading") return;

    const poll = setInterval(async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/status");
        const data = await res.json();
        if (data.status === "ready") {
          clearInterval(poll);
          setUploadStatus("ready");
        }
      } catch (err) {
        console.error("Status check failed:", err);
      }
    }, 2000);

    return () => clearInterval(poll);
  }, [uploadStatus]);

  const boxes = [
    { id: "summary", component: <Summary sessionId={sessionId} />, default: { x: 550, y: 150, width: 500, height: 550 }, resizable: true },
    { id: "pdf", component: <PDFUpload setSessionId={setSessionId} setUploadStatus={setUploadStatus} />, default: { x: 40, y: 400, width: 450, height: 320 }, resizable: false },
    { id: "faq", component: <FAQ sessionId={sessionId} />, default: { x: 1100, y: 40, width: 450, height: 350 }, resizable: true },
    { id: "history", component: <History sessionId={sessionId} />, default: { x: 40, y: 70, width: 400, height: 300 }, resizable: true },
    { id: "chat", component: <Chat sessionId={sessionId} />, default: { x: 1100, y: 400, width: 450, height: 400 }, resizable: true },
  ];

  return (
    <div className="app-wrapper">
      <div className="macos-container">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-buttons">
            <div className="btn-red"></div>
            <div className="btn-yellow"></div>
            <div className="btn-green"></div>
          </div>
          <div className="top-bar-title">PDF Chat</div>
        </div>

        {/* Content */}
        <div className="content" style={{ position: "relative", overflow: "hidden" }}>
          <img
            src={Welcome}
            alt="Welcome"
            style={{
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 1,
              width: "40%",
              pointerEvents: "none",
            }}
          />
          {boxes.map((box) => (
            <Rnd
              key={box.id}
              default={box.default}
              bounds="parent"
              enableResizing={box.resizable}
              style={{
                background: "white",
                border: "1px dashed #4a90e2",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                cursor: "move",
              }}
            >
              {box.component}
            </Rnd>
          ))}

          {/* ✅ Upload progress box (floating while uploading) */}
          <UploadProgressBox visible={uploadStatus === "uploading"} />
        </div>

        {/* Bottom Bar */}
        <div className="bottom-bar">
          <div className="bottom-bar-title">Footer Content</div>
        </div>
      </div>
    </div>
  );
}
