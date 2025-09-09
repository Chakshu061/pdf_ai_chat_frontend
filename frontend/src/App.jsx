import { Rnd } from "react-rnd";
import Summary from "./component/Summary";
import PDFUpload from "./component/PDFUpload";
import FAQ from "./component/FAQ";
import History from "./component/History";
import Chat from "./component/Chat";
import Welcome from "./assets/welcome.png"

export default function App() {
  const boxes = [
    { id: "summary", component: <Summary />, default: { x: 550, y: 150, width: 500, height: 550 }, resizable: true },
    { id: "pdf", component: <PDFUpload />, default: { x: 40, y: 400, width: 450, height: 320 }, resizable: false }, // fixed size
    { id: "faq", component: <FAQ />, default: { x: 1100, y: 40, width: 450, height: 350 }, resizable: true },
    { id: "history", component: <History />, default: { x: 40, y: 70, width: 400, height: 300 }, resizable: true },
    { id: "chat", component: <Chat />, default: { x: 1100, y: 400, width: 450, height: 400 }, resizable: true },
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
          <img src={Welcome} alt="Welcome" style={{ position: "absolute", top: "10%", left: "50%", transform: "translate(-50%, -50%)", opacity: 1, width: "40%", pointerEvents: "none" }} />
          {boxes.map((box) => (
            <Rnd
              key={box.id}
              default={box.default}
              bounds="parent"
              enableResizing={box.resizable}
              dragHandleClassName="" // not needed anymore
              style={{
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                cursor: "move", // show drag cursor
              }}
            >
              {box.component}
            </Rnd>

          ))}
        </div>

        {/* Bottom Bar */}
        <div className="bottom-bar">
          <div className="bottom-bar-title">Footer Content</div>
        </div>
      </div>
    </div>
  );
}
