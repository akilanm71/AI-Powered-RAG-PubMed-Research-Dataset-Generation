# Training Data Bot

## Overview

Training Data Bot is an AI-powered platform for:

* Web RAG (Retrieval Augmented Generation)
* PubMed Literature Research
* Dataset Generation
* File Upload Processing
* Vector Search using ChromaDB
* LLM-powered Question Answering using Groq

The system can ingest web pages, PubMed articles, and uploaded documents, generate AI training datasets, and answer questions using Retrieval-Augmented Generation (RAG).

---

# Architecture

```text
┌────────────────────┐
│   React Frontend   │
│   (Vite + React)   │
└─────────┬──────────┘
          │ HTTP
          ▼

┌────────────────────┐
│     FastAPI API    │
│ Training Data Bot  │
└─────────┬──────────┘
          │
 ┌────────┼────────┐
 │        │        │
 ▼        ▼        ▼

Web    PubMed   File Upload
Loader Loader   Processor

 │        │        │
 └────────┼────────┘
          ▼

┌────────────────────┐
│  Chunking Engine   │
└─────────┬──────────┘
          ▼

┌────────────────────┐
│ Embedding Model    │
└─────────┬──────────┘
          ▼

┌────────────────────┐
│ Chroma Vector DB   │
└─────────┬──────────┘
          ▼

┌────────────────────┐
│ Retriever          │
└─────────┬──────────┘
          ▼

┌────────────────────┐
│ Groq LLM           │
│ Llama 3.3 70B      │
└─────────┬──────────┘
          ▼

     Generated Answer
```

---

# Features

* Web RAG
* PubMed Research Assistant
* Dataset Builder
* File Upload Dataset Generation
* Chroma Vector Database
* Groq LLM Integration
* FastAPI REST APIs
* React Dashboard
* Dockerized Deployment

---

# Tech Stack

## Backend

* Python
* FastAPI
* LangChain
* ChromaDB
* Groq
* Docker

## Frontend

* ReactJS
* Vite
* Axios

## Deployment

* Docker
* Render
* Vercel

---

# API Endpoints

## Web RAG

POST /web/load

POST /web/ask

---

## PubMed

POST /pubmed/load

POST /pubmed/ask

POST /pubmed/research

---

## Dataset

POST /dataset/build

POST /dataset/upload

GET /dataset/load

DELETE /dataset/delete

---

## Administration

GET /stats

DELETE /pubmed/delete

DELETE /web/delete

---

# Project Structure

```text
training-data-bot
│
├── Project
│   ├── training_data_bot
│   ├── requirements.txt
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── training-bot-ui
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

# Running Locally

## Backend

```bash
cd Project

pip install -r requirements.txt

uvicorn training_data_bot.api.main:app --reload
```

## Frontend

```bash
cd training-bot-ui

npm install

npm run dev
```

---

# Docker Deployment

```bash
docker compose up --build
```

---

# 🚀 Getting Started

## Prerequisites

Before running the project, make sure you have the following installed:

* Docker Desktop
* Docker Compose
* Node.js (v18 or later)
* npm
* Python 3.11+ (if running the backend locally)

---

## 1. Clone the Repository

```bash
git clone https://github.com/akilanm71/AI-Powered-RAG-PubMed-Research-Dataset-Generation.git

cd AI-Powered-RAG-PubMed-Research-Dataset-Generation
```

---

## 2. Configure Environment Variables

Create a `.env` file in the backend directory and add the required API keys.

Example:

```env
GROQ_API_KEY=your_groq_api_key
```

Add any additional environment variables required by your application.

---

## 3. Build and Start the Backend

From the project root, run:

```bash
docker compose up --build
```

This command will:

* Build all Docker images
* Start the backend services
* Launch the API and supporting containers

---

## 4. Start the React Frontend

Open a new terminal.

Navigate to the frontend directory:

```bash
cd training-bot-ui
```

Install dependencies (first time only):

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## 5. Open the Application

After the frontend starts, open your browser and visit:

```text
http://localhost:5173
```

(The port may vary depending on your Vite configuration.)

---

## 6. Using the Application

You can now:

* Search PubMed research articles
* Perform Retrieval-Augmented Generation (RAG)
* Generate biomedical datasets
* Upload and manage datasets
* View project statistics from the dashboard

---

## Stopping the Application

To stop the backend:

```bash
Ctrl + C
```

To remove containers:

```bash
docker compose down
```


# Future Improvements

* Airflow Workflow Orchestration
* CI/CD using GitHub Actions
* Authentication & Authorization
* Persistent Cloud Vector Database
* Multi-user Support
* Monitoring & Logging

---

# Author

Akilan M

AI / Data Science / Python Development Project

Linkedin Link of Tutorial: https://www.linkedin.com/feed/update/urn:li:activity:7477279011744890880/
