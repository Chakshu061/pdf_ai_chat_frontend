import { useRef } from "react";
import UploadPDF from "../assets/uploadpdf.svg"; // Import the SVG file

export default function PDFUpload() {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      console.log("PDF uploaded:", file.name);
    } else {
      alert("Please upload a valid PDF file.");
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
  
        <h3 className="pdf-heading">Drop PDF file here<br></br> or click to browse</h3>
  
        <div className="pdf-icon">
          <img src={UploadPDF} alt="Upload PDF Icon" /> {/* Render the SVG */}
        </div>
      </div>
    </div>
  );
}
