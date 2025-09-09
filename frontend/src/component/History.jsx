export default function History() {
  // Dummy sessions for now — replace later with actual data
  const sessions = [
    { id: 1, title: "Session 1 - PDF on Finance", date: "2025-09-01" },
    { id: 2, title: "Session 2 - Legal Document", date: "2025-09-03" },
    { id: 3, title: "Session 3 - Research Notes", date: "2025-09-05" },
    { id: 4, title: "Session 4 - Resume Draft", date: "2025-09-07" },
    { id: 5, title: "Session 5 - Case Study", date: "2025-09-09" },
  ];

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>History</h2>
      </div>
      <div className="history-list">
        {sessions.map((session) => (
          <div key={session.id} className="history-item">
            <div className="history-title">{session.title}</div>
            <div className="history-date">{session.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
