# RAG Chatbot Architecture

This project implements an enterprise-grade RAG (Retrieval-Augmented Generation) chatbot using Google Gemini and Qdrant Vector Database.

## Tech Stack

- **LLM:** Google Gemini 1.5 Flash
- **Embeddings:** Google `text-embedding-004`
- **Vector DB:** Qdrant (Cloud or Local)
- **Metadata DB:** Supabase
- **Frontend:** Next.js App Router, Tailwind CSS, Framer Motion

## Setup Instructions

### 1. Environment Variables

Add the following to your `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
```

### 2. Dependencies

Ensure all dependencies are installed:

```bash
npm install @google/generative-ai @qdrant/js-client-rest pdf-parse mammoth cheerio uuid
```

### 3. Knowledge Ingestion

- Access the Admin Dashboard at `/admin`.
- Use the **Clinical Knowledge** tab to:
  - Upload PDF, DOCX, or TXT files.
  - Scrape content from URLs.
  - Manually enter protocols.
- Documents are chunked (1000 chars, 200 overlap), embedded using Gemini, and stored in Qdrant with metadata.

### 4. Chatbot Widget

- The `ChatWidget` component is available globally (usually in `layout.tsx`).
- It uses semantic search to retrieve the top 5 most relevant chunks from Qdrant.
- Answers are grounded strictly in the retrieved context.
- Citations and confidence scores are displayed for every response.

## Key Files

- `src/lib/ai.server.ts`: Gemini integration.
- `src/lib/qdrant.server.ts`: Qdrant client and collection management.
- `src/lib/kb.functions.ts`: Knowledge ingestion pipeline (parsing, chunking, embedding).
- `src/lib/chat.functions.ts`: RAG logic (retrieval + generation).
- `src/app/admin/page.tsx`: Admin interface for KB management.
- `src/components/chat/ChatWidget.tsx`: Premium Chatbot UI.

## Features

- **Semantic Search:** Uses vector embeddings for meaning-based retrieval.
- **Citations:** Automatically attributes answers to source documents.
- **Confidence Scores:** Visual indicator of how well the AI found an answer in the KB.
- **Lead Capture:** Detects booking intent and displays a professional intake form.
- **Multi-turn:** Maintains conversational context using local session persistence.
