import Dashboard from "./pages/Dashboard";
import WebRAG from "./pages/WebRAG";
import PubMedRAG from "./pages/PubMedRAG";
import DatasetBuilder from "./pages/DatasetBuilder";
import UploadDataset from "./pages/UploadDataset";
import "./App.css";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        overflowY: "auto"
      }}
    >

      <div className="app-header">
        <h1>Training Data Bot</h1>
        <p>AI Powered RAG, PubMed Research & Dataset Generation</p>
      </div>

      <div className="section-card">
        <Dashboard />
      </div>

      <div className="section-card">
        <WebRAG />
      </div>

      <div className="section-card">
        <PubMedRAG />
      </div>

      <div className="section-card">
        <DatasetBuilder />
      </div>

      <div className="section-card">
        <UploadDataset />
      </div>

    </div>
  );
}
export default App;