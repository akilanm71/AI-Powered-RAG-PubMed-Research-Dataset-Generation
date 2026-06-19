import { useState } from "react";
import api from "../services/api";

function UploadDataset() {

  const [file, setFile] = useState(null);
  const [taskType, setTaskType] = useState("classification");
  const [result, setResult] = useState(null);

  const upload = async () => {

    if (!file) {
      alert("Choose a file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("task_types", taskType);

    try {

      const response = await api.post(
        "/dataset/upload",
        formData
      );

      setResult(response.data);

      alert("Uploaded Successfully");

    } catch (error) {

      console.error(error);

      alert("Upload Failed");
    }
  };

  return (

    <div>

      <h2>Upload Dataset</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <select
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
        >
          <option value="classification">
            Classification
          </option>

          <option value="summarization">
            Summarization
          </option>

          <option value="qa_generation">
            QA Generation
          </option>
        </select>

        <button onClick={upload}>
          Upload Dataset
        </button>

      </div>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <pre>
            {JSON.stringify(result,null,2)}
          </pre>
        </div>
      )}

    </div>
  );
}

export default UploadDataset;