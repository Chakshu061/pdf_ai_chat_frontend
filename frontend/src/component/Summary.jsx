import { FiCopy } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function Summary({ sessionId }) {
  const [copied, setCopied] = useState(false);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  useEffect(() => {
    if (!sessionId) return;

    let pollInterval;

    const pollStatus = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/status/${sessionId}`);
        const data = await res.json();

        if (data.error) {
          setError(data.error);
          return;
        }

        setStatus(data.status);
        setProgress(data.progress || 0);

        if (data.status === "ready") {
          clearInterval(pollInterval);
          fetchSummary();
        }
      } catch (err) {
        console.error("Error checking status:", err);
        setError("Failed to check processing status.");
      }
    };

    const fetchSummary = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://127.0.0.1:8000/summarize/${sessionId}`, {
          method: "POST",
        });
        const data = await res.json();

        if (data.summary) {
          setSummary(data.summary);
        } else {
          setError("No summary found.");
        }
      } catch (err) {
        console.error("Failed to fetch summary:", err);
        setError("Error fetching summary.");
      } finally {
        setLoading(false);
      }
    };

    // start polling every 2 seconds
    pollInterval = setInterval(pollStatus, 2000);
    pollStatus();

    return () => clearInterval(pollInterval);
  }, [sessionId]);

  return (
    <div className="summary-container">
      <div className="summary-header">
        <h2>Summary</h2>
        <button
          className="copy-btn"
          onClick={handleCopy}
          title="Copy summary"
          disabled={!summary}
        >
          <FiCopy />
        </button>
        {copied && <span className="copy-feedback">Copied!</span>}
      </div>

      <div className="summary-content">
        {!sessionId && <p>Upload a PDF to see its summary.</p>}
        {status && status !== "ready" && (
          <p>
            Processing… ({status}, {progress}%)
          </p>
        )}
        {loading && <p>Generating summary…</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && summary && <p>{summary}</p>}
      </div>
    </div>
  );
}
