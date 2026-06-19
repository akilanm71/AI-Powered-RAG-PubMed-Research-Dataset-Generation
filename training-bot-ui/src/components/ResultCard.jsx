function ResultViewer({ result }) {

return ( <div className="result-box"> <h2>Result</h2>


  <pre>
    {JSON.stringify(result, null, 2)}
  </pre>
</div>


);
}

export default ResultViewer;
