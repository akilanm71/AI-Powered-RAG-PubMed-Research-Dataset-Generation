import api from "../services/api";

function DeleteButtons() {

  const deletePubMed = async () => {

    try {

      await api.delete("/pubmed/delete");

      alert("PubMed data deleted");

    } catch (error) {

      console.error(error);

      alert("Delete failed");
    }
  };

  const deleteWeb = async () => {

    try {

      await api.delete("/web/delete");

      alert("Web data deleted");

    } catch (error) {

      console.error(error);

      alert("Delete failed");
    }
  };

  const deleteDataset = async () => {

    try {

      await api.delete("/dataset/delete");

      alert("Dataset deleted");

    } catch (error) {

      console.error(error);

      alert("Delete failed");
    }
  };

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "15px",
        marginTop: "30px",
        width: "100%",
      }}
    >

      <button
        onClick={deletePubMed}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Reset PubMed Store
      </button>

      <button
        onClick={deleteWeb}
        style={{
          background: "#f97316",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Reset Web Store
      </button>

      <button
        onClick={deleteDataset}
        style={{
          background: "#7c3aed",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Reset Dataset Store
      </button>

    </div>
  );
}

export default DeleteButtons;