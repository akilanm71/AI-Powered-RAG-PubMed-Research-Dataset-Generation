import { useState } from "react";
import api from "../services/api";

function WebRAG() {

  const [url,setUrl] = useState("");
  const [question,setQuestion] = useState("");
  const [answer,setAnswer] = useState("");

  const loadWebsite = async () => {

    await api.post("/web/load",{
      source:url,
      forget:true
    });

    alert("Website Loaded");
  };

  const askQuestion = async () => {

    const response = await api.post("/web/ask",{
      question
    });

    setAnswer(response.data.answer);
  };

  return (

    <div>

      <h2>Web RAG</h2>

      <input
        value={url}
        onChange={(e)=>setUrl(e.target.value)}
        placeholder="Website URL"
      />

      <button onClick={loadWebsite}>
        Load Website
      </button>

      <br/><br/>

      <textarea
        value={question}
        onChange={(e)=>setQuestion(e.target.value)}
        placeholder="Ask Question"
      />

      <br/>

      <button onClick={askQuestion}>
        Ask
      </button>

      <p>{answer}</p>

    </div>
  );
}

export default WebRAG;
