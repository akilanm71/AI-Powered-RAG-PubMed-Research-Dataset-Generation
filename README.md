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
