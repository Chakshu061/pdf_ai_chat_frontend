import { useEffect, useState } from "react";
import Draggable from "react-draggable"; // if you already have it, else swap with pure CSS draggable

export default function UploadProgressBox({ visible }) {
  const [progress, setProgress] = useState(0);

  // Fake progress increment while waiting
  useEffect(() => {
    if (visible) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 5 : prev));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Draggable>
      <div className="upload-box">
        <h4>Processing PDF...</h4>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </Draggable>
  );
}
