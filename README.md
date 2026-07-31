# 🧠 BrainJi

<p align="center">
  <h3 align="center">AI-Powered Second Brain with Semantic Search & Retrieval-Augmented Generation (RAG)</h3>

  <p align="center">
    Save, organize, retrieve, and chat with your personal knowledge using Vector Embeddings, Pinecone, and Large Language Models.
  </p>
</p>

<p align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb)
![Pinecone](https://img.shields.io/badge/Pinecone-VectorDB-blueviolet?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

---

# 📖 Overview

BrainJi is an **AI-powered personal knowledge management platform** that enables users to store articles, notes, tweets, videos, and other resources while leveraging **Semantic Search** and **Retrieval-Augmented Generation (RAG)** to retrieve and interact with their knowledge intelligently.

Unlike traditional bookmarking applications that depend on keyword matching, BrainJi converts every saved document into **high-dimensional vector embeddings**, making it possible to search using meaning rather than exact words.

On top of semantic retrieval, BrainJi implements a **Retrieval-Augmented Generation (RAG)** pipeline that feeds the most relevant documents into an LLM, allowing users to receive contextual, AI-generated answers grounded in their own data.

---

# ✨ Features

### 🔐 Authentication

- JWT Authentication
- Secure password hashing using bcrypt
- Protected API routes
- User session management

---

### 📚 Knowledge Management

- Save articles
- Save tweets
- Save YouTube videos
- Save documents
- Delete content
- Organize personal knowledge

---

### 🧠 AI Semantic Search

- Transformer-based embeddings
- Context-aware similarity search
- Vector search using Pinecone
- Meaning-based retrieval
- Fast nearest-neighbor search

---

### 🤖 Retrieval-Augmented Generation (RAG)

- Generate embeddings for user queries
- Retrieve relevant documents
- Inject retrieved context into an LLM
- AI-generated answers based only on user's knowledge
- Minimize hallucinations through contextual grounding

---

### 🌍 Sharing

- Generate shareable links
- Public knowledge sharing
- Read-only shared collections

---

### 🛡 Security

- JWT Tokens
- Password Encryption
- Request Validation (Zod)
- MongoDB Schema Validation

---

# 🏗 System Architecture

```
                         ┌─────────────────────┐
                         │      Frontend       │
                         └──────────┬──────────┘
                                    │
                                    │ HTTP
                                    ▼
                     ┌─────────────────────────────┐
                     │      Express Backend        │
                     └──────────┬──────────────────┘
                                │
        ┌───────────────────────┼────────────────────────┐
        │                       │                        │
        ▼                       ▼                        ▼
 Authentication            Content APIs           Search APIs
        │                       │                        │
        ▼                       ▼                        ▼
    MongoDB              MongoDB Storage        Embedding Model
                                                        │
                                                        ▼
                                               Vector Embeddings
                                                        │
                                                        ▼
                                               Pinecone Vector DB
                                                        │
                                                        ▼
                                        Top-K Relevant Documents
                                                        │
                                                        ▼
                                         Retrieval-Augmented
                                               Generation
                                                        │
                                                        ▼
                                           Gemini / OpenAI LLM
                                                        │
                                                        ▼
                                            Contextual Response
```

---

# 🚀 Tech Stack

| Category | Technology |
|------------|------------|
| Language | TypeScript |
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Hashing | bcryptjs |
| Validation | Zod |
| AI Embeddings | Xenova Transformers |
| Embedding Model | all-MiniLM-L6-v2 |
| Vector Database | Pinecone |
| AI Generation | Gemini / OpenAI |
| Web Scraping | Cheerio |

---

# 📂 Folder Structure

```
brainji/

├── src/
│
├── controllers/
│   ├── auth.controller.ts
│   ├── content.controller.ts
│   ├── search.controller.ts
│   └── share.controller.ts
│
├── middleware/
│   └── auth.middleware.ts
│
├── routes/
│   ├── auth.routes.ts
│   ├── content.routes.ts
│   ├── search.routes.ts
│   └── share.routes.ts
│
├── model/
│   ├── user.model.ts
│   ├── content.model.ts
│   └── link.model.ts
│
├── validators/
│
├── db/
│
├── utils/
│
├── app.ts
└── index.ts
```

---

# ⚙ How BrainJi Works

## 1️⃣ User Authentication

```
Signup
    │
    ▼
Hash Password
    │
    ▼
MongoDB
    │
    ▼
Login
    │
    ▼
JWT Token
```

---

## 2️⃣ Saving Content

```
User
   │
POST /content
   │
   ▼
Store metadata
   │
   ▼
Generate Embedding
   │
   ▼
Store Vector in Pinecone
```

---

## 3️⃣ Semantic Search Pipeline

```
Search Query
      │
      ▼
Embedding Generation
      │
      ▼
Pinecone Similarity Search
      │
      ▼
Retrieve Top-K IDs
      │
      ▼
MongoDB Lookup
      │
      ▼
Relevant Documents
```

---

## 4️⃣ Retrieval-Augmented Generation (RAG)

```
User Question
      │
      ▼
Embedding Generation
      │
      ▼
Pinecone Retrieval
      │
      ▼
Top Relevant Documents
      │
      ▼
Context Construction
      │
      ▼
Prompt Template
      │
      ▼
Gemini / OpenAI
      │
      ▼
Grounded AI Response
```

Instead of relying solely on the LLM's internal knowledge, BrainJi retrieves the most relevant user documents and injects them into the model's prompt, ensuring responses remain grounded in the user's saved content.

---

# 🧠 Semantic Search Example

Suppose the user previously saved:

- Understanding Promises
- Async Await Guide
- Event Loop Explained
- JavaScript Concurrency

Searching for

```
javascript asynchronous programming
```

will retrieve all of these even if none contains the exact phrase.

---

# 🤖 RAG Example

User asks

> How does JavaScript handle asynchronous execution?

BrainJi performs:

1. Convert query to embedding
2. Search Pinecone
3. Retrieve relevant documents
4. Build prompt
5. Send prompt + retrieved context to Gemini/OpenAI
6. Return grounded answer

---

# 🔐 Authentication

Protected endpoints require

```
Authorization: Bearer <JWT_TOKEN>
```

Passwords are hashed using bcrypt before being stored.

---

# 📡 API Endpoints

## Authentication

### Signup

```
POST /api/auth/signup
```

```json
{
  "username": "john",
  "password": "password123"
}
```

---

### Signin

```
POST /api/auth/signin
```

Returns

```json
{
    "token":"jwt_token"
}
```

---

## Content

### Add Content

```
POST /api/content
```

```json
{
  "title":"Transformers Explained",
  "link":"https://...",
  "type":"article"
}
```

---

### Get Content

```
GET /api/content
```

---

### Delete Content

```
DELETE /api/content/:id
```

---

## Semantic Search

```
POST /api/search
```

```json
{
   "query":"Machine Learning"
}
```

---

## RAG Chat

```
POST /api/chat
```

```json
{
   "question":"Explain transformers using my notes."
}
```

Returns

```json
{
   "answer":"..."
}
```

---

## Share Brain

Generate Share Link

```
POST /api/share
```

---

Access Shared Brain

```
GET /api/share/:shareLink
```

---

# 🌍 Environment Variables

Create a `.env` file

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

PINECONE_API_KEY=

PINECONE_INDEX=

GOOGLE_API_KEY=

OPENAI_API_KEY=
```

---

# 🛠 Installation

Clone repository

```bash
git clone https://github.com/yourusername/brainji.git
```

Move into project

```bash
cd brainji
```

Install dependencies

```bash
npm install
```

Build

```bash
npm run build
```

Run

```bash
npm start
```

Development

```bash
npm run dev
```

---

# 📦 Major Dependencies

- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Zod
- Pinecone SDK
- Xenova Transformers
- Cheerio
- Google Gemini SDK / OpenAI SDK

---

# 🔮 Future Roadmap

- Folder Organization
- Collections
- Tags
- Browser Extension
- PDF Parsing
- OCR Support
- Chrome Bookmark Sync
- AI Summarization
- Hybrid Search (Keyword + Vector)
- Redis Caching
- Conversation Memory
- Multi-user Collaboration
- File Uploads
- Image Embeddings
- Voice Search
- Mobile Application

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

Distributed under the MIT License.

---

# 🌟 Why BrainJi?

Traditional note-taking applications only **store** information.

BrainJi helps users **understand**, **retrieve**, and **interact** with their knowledge using modern AI techniques such as:

- Semantic Search
- Vector Embeddings
- Pinecone Vector Database
- Retrieval-Augmented Generation (RAG)
- Large Language Models

Instead of asking:

> *"Where did I save that article?"*

You can simply ask:

> **"Explain the React rendering lifecycle using my saved resources."**

BrainJi retrieves the relevant knowledge and lets the AI generate a grounded, context-aware response—turning your personal notes into an intelligent, searchable second brain.

---

<p align="center">
Made with ❤️ using TypeScript, Express, MongoDB, Pinecone, and Generative AI.
</p>
