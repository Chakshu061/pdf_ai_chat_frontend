# 📄 PDF Summarizer + Chat (RAG)

## 🔎 About
A **lightweight PDF (upto 500+ pages) summarizer and chat app powered by local LLMs**.  
Upload a PDF, get instant summaries, and ask questions about the content — perfect for cutting through lengthy docs, research papers, or legal files.

The app runs **fully locally** using [Ollama](https://ollama.ai) for inference, FAISS for vector search, and FastAPI as the backend API server.  
This ensures **data privacy, low latency, and zero external dependencies**.

---

## 🚀 Features
- 📄 **Upload PDFs** and instantly parse them.
- ✂️ **Chunking + FAISS embeddings** for efficient semantic retrieval.
- 📝 **Automatic summarization** of uploaded documents.
- 💬 **Chat with the PDF** using a Retrieval-Augmented Generation (RAG) pipeline.
- ⏳ **Progress box** with animated progress bar while upload + processing is in progress.
- 📜 **History panel** of summaries and chat interactions.
- ⚡ Runs **entirely on local hardware** with no cloud dependency.

---

## 🖥️ Frontend

### Tech Stack
- **React** – UI framework
- **Redux** – state management
- **CSS / Tailwind** – styling
- **React Draggable** – draggable progress/status components

### Components
- **App.jsx** – Root container orchestrating UI.
- **Chat.jsx** – Chat input and output view.
- **History.jsx** – Scrollable history of interactions.
- **UploadProgressBox.jsx** – Small draggable upload/processing indicator.

### Flow
1. User uploads a PDF → triggers `/upload`.
2. Progress box appears with striped animated loader.
3. Frontend polls `/status` until processing = `ready`.
4. User can click **Summarize** or chat with the PDF.
5. Summaries + conversations are added to history.

---

## ⚙️ Backend

### Tech Stack
- **FastAPI** – REST API backend
- **Ollama** – Local LLM inference engine
- **SentenceTransformers** – Embedding model
- **FAISS** – Vector store for retrieval
- **PyPDF2 / pdfplumber** – PDF parsing
- **Uvicorn** – ASGI server

### Core Files
- `main.py` – FastAPI endpoints (`/upload`, `/status`, `/summarize`, `/chat`).
- `embedder.py` – Builds embeddings + FAISS index.
- `rag.py` – RAG pipeline integrating Ollama + FAISS.
- `utils.py` – PDF text extraction, chunking helpers.

### Endpoints
- **`POST /upload`**  
  - Accepts PDF.  
  - Extracts + chunks text.  
  - Embeds chunks into FAISS.  
  - Marks status → `processing`.

- **`GET /status`**  
  - Returns whether the backend is `ready` for summarization/chat.

- **`POST /summarize`**  
  - Uses Ollama to summarize the entire document.

- **`POST /chat`**  
  - Accepts user query.  
  - Retrieves top-k chunks from FAISS.  
  - Combines with query → sends to Ollama.  
  - Returns contextual answer.

---

## 🔄 Workflow
1. Upload PDF → `/upload` → progress box shown.
2. Backend processes → embeddings + FAISS index created.
3. Frontend polls `/status` until `ready`.
4. User can:
   - Generate summary (`/summarize`).
   - Ask contextual questions (`/chat`).
5. History view updated in real-time.

---

## ⚙️ Setup & Installation

### 1️⃣ Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate   # (Mac/Linux)
venv\Scripts\activate      # (Windows)

pip install -r requirements.txt
uvicorn main:app --reload
```
⚠️ Requires Ollama installed and running locally:
```bash ollama run llama2
```

Backend will run at:
👉 ```http://127.0.0.1:8000```

### 
```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:
👉 ```http://localhost:5173/```

---

## 🔗 API Flow

1. Upload PDF → POST /upload_pdf/
- Returns session_id.

2. Check status → GET /status/{session_id}
- Keep polling until "ready".
  
3. Summarize → POST /summarize/{session_id}
- Returns summarized text.

4. Chat → POST /chat/{session_id}
- Input: Question, Output: Answer.

5. History → GET /history/
- Returns all previous sessions.
