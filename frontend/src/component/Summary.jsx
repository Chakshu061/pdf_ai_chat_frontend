import { FiCopy } from "react-icons/fi"; // Feather copy icon
import { useState } from "react";

export default function Summary() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const content = document.querySelector(".summary-content").innerText;
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="summary-container">
      {/* Title row */}
      <div className="summary-header">
        <h2>Summary</h2>
        <button className="copy-btn" onClick={handleCopy} title="Copy summary">
          <FiCopy />
        </button>
        {copied && <span className="copy-feedback">Copied!</span>}
      </div>

      {/* Content */}
      <div className="summary-content">
        <p>
          This is the first summary paragraph. It spreads across the full box,
          using the clean Delius font.
        </p>
        <p>
          This is the second paragraph. No notebook lines, no margins — just a
          clean content area.
        </p>
        <p>
          You can keep writing and the text area will scroll if needed.
        </p>
      </div>
    </div>
  );
}
