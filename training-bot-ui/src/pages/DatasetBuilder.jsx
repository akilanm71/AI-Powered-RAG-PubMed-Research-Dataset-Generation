import { useState } from "react";
import api from "../services/api";

function DatasetBuilder() {

  const [url, setUrl] = useState("");
  const [taskType, setTaskType] = useState("classification");
  const [saveDataset, setSaveDataset] = useState(true);
  const [result, setResult] = useState(null);

  const buildDataset = async () => {

    try {

      const response = await api.post("/dataset/build", {
        source: url,
        task_types: [taskType],
        save_dataset: saveDataset
      });

      console.log(response.data);

      setResult(response.data);

    } catch (error) {

      console.error(error);
      alert("Dataset build failed");
    }
  };

  return (

    <div>

      <h2>Dataset Builder</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "20px"
        }}
      >

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Source URL"
          style={{
            padding: "10px",
            width: "350px",
            borderRadius: "8px"
          }}
        />

        <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            style={{
                padding: "10px",
                borderRadius: "8px"
                }}
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

        <select
            value={saveDataset.toString()}
            onChange={(e) => setSaveDataset(e.target.value === "true")}
            style={{
                adding: "10px",
                borderRadius: "8px"
            }}
        >
            <option value="true">Save Dataset: True</option>
            <option value="false">Save Dataset: False</option>
        </select>

        <button onClick={buildDataset}>
            Build Dataset
        </button>

      </div>

      {result && (

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap"
          }}
        >

          <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minWidth: "200px"
            }}
          >
            <h3>Records</h3>
            <h1>
              {result.records?.length || 0}
            </h1>
          </div>

          <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minWidth: "200px"
            }}
          >
            <h3>Task Type</h3>
            <h1>{taskType}</h1>
          </div>

        </div>

      )}

    </div>
  );
}

export default DatasetBuilder;