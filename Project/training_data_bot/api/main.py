
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from pydantic import BaseModel, Field
from pathlib import Path
from typing import Optional, List
from training_data_bot.models.enums import TaskType

from training_data_bot.bot import TrainingDataBot

from training_data_bot.services.research_assistant import PubMedResearchAssistant
from training_data_bot.tasks.templates import PubMedTemplate


from fastapi.middleware.cors import CORSMiddleware

import logging

logger = logging.getLogger(__name__)



app = FastAPI(title="Training Data Bot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], )

@app.on_event("startup")
async def startup():
    global bot
    bot = TrainingDataBot()
    logger.info("Application started")

class WebLoadRequest(BaseModel):
    source: str
    forget: bool = False


class QuestionRequest(BaseModel):
    question: str


class PubMedRequest(BaseModel):
    query: str
    limit: int = 20


class DatasetRequest(BaseModel):
    source: str
    
    task_types: Optional[List[TaskType]] = None

    save_dataset: bool = False

class SourceResponse(BaseModel):
    title: Optional[str] = None
    authors: List[str] = Field(default_factory=list)
    journal: Optional[str] = None
    doi: Optional[str] = None
    doi_url: Optional[str] = None
    pubmed_url: Optional[str] = None
    
class AnswerResponse(BaseModel):
    answer: str
    sources: List[SourceResponse] =  Field(default_factory=list)

class AnswerWeb(BaseModel):
    answer: str


@app.get("/")
async def root():
    return {"message": "Training Data Bot API Running"}

@app.post("/web/load")
async def load_web(req: WebLoadRequest):

    docs = await bot.load_web_documents(sources=req.source, forget=req.forget)

    return {
        "status": "success",
        "documents": len(docs)}

@app.post("/web/ask", response_model=AnswerWeb)
async def ask_web(req: QuestionRequest):

    answer = await bot.ask_web(req.question)

    if not answer:
        raise HTTPException(
            status_code=400,
            detail="No Web documents found"
        )

    return {"answer": answer}


@app.post("/pubmed/load")
async def load_pubmed(req: PubMedRequest):

    docs = await bot.load_pubmed_documents(query=req.query, limit=req.limit)

    return {"documents": len(docs)}

@app.post("/pubmed/ask", response_model=AnswerResponse)
async def ask_pubmed(req: QuestionRequest):

    result = await bot.ask_pubmed(req.question)

    if not result:
        raise HTTPException(
            status_code=400,
            detail="No PubMed documents found")

    return result

@app.post("/pubmed/research")
async def research_pubmed(req: PubMedRequest):

    assistant = PubMedResearchAssistant()

    result = await assistant.research(req.query, PubMedTemplate.LITERATURE_REVIEW)

    return { "result": result}

@app.post("/dataset/build")
async def build_dataset(req: DatasetRequest):

    result = await bot.dataset_pipeline(req.source, task_types= req.task_types, save_dataset=req.save_dataset)

    return {
        "report": str(result["report"]),
        "stats": result["stats"],
        "records": result["dataset"]}

@app.get("/stats")
async def stats():

    return bot.get_statistics()

@app.get("/dataset/load")
async def load_dataset():

    records = await bot.load_dataset()

    if not records:

        raise HTTPException(
            status_code=404, detail="No dataset found")

    return {"records": records}

@app.delete("/pubmed/delete")
async def delete_pubmed():

    return await bot.clear_pubmed()

@app.delete("/web/delete")
async def delete_web():

     await bot.clear_web_store()
     
     return {"status": "success"}

@app.delete("/dataset/delete")
async def delete_dataset():

    await bot.clear_dataset()

    return {"status": "success",
        
            "message": "Dataset cleared"}

@app.post("/dataset/upload")
async def upload_dataset(
    file: UploadFile = File(...),  task_types: Optional[List[TaskType]] = Form(None)):

    upload_dir = Path("uploads")

    upload_dir.mkdir(exist_ok=True)

    file_path = upload_dir / file.filename

    with open(file_path, "wb") as f:

        f.write(await file.read())

    result = await bot.dataset_pipeline(
        source=str(file_path),task_types = task_types,
        save_dataset=True )

    return {
    "filename": file.filename,
    "path": str(file_path),
    "report": str(result["report"]),
    "stats": result["stats"],
     "records": result["dataset"] }