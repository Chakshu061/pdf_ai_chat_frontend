import { useRef, useState } from "react";
import UploadPDF from "../assets/uploadpdf.svg"; // Import the SVG file

export default function PDFUpload({ setSessionId }) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload_pdf/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.session_id) {
        setSessionId(data.session_id); // save session ID globally
      }

      console.log("Uploaded:", file.name);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdf-wrapper">
      <div className="pdf-upload" onClick={handleClick}>
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <h3 className="pdf-heading">
          {loading
            ? "Uploading & Processing..."
            : "Drop PDF file here or click to browse"}
        </h3>

        <div className="pdf-icon">
          <img src={UploadPDF} alt="Upload PDF Icon" />
        </div>
      </div>
    </div>
  );
}
