import { useState } from "react";
import api from "../services/api";

function PubMedRAG() {

  const [query,setQuery] = useState("");
  const [question,setQuestion] = useState("");
  const [result,setResult] = useState(null);

  const loadPubmed = async () => {

    await api.post("/pubmed/load",{
      query,
      limit:20
    });

    alert("PubMed Loaded");
  };

  const askPubmed = async () => {

    const response = await api.post("/pubmed/ask",{
      question
    });

    setResult(response.data);
  };

  return (

    <div>

      <h2>PubMed RAG</h2>

      <input
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        placeholder="Search Topic"
      />

      <button onClick={loadPubmed}>
        Load PubMed
      </button>

      <br/><br/>

      <textarea
        value={question}
        onChange={(e)=>setQuestion(e.target.value)}
        placeholder="Ask Question"
      />

      <button onClick={askPubmed}>
        Ask
      </button>

      <h3>Answer</h3>

      <p>{result?.answer}</p>

    </div>
  );
}

export default PubMedRAG;
