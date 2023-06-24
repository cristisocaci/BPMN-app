import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [response, setResponse] = useState("");

  const endpoint = "http://localhost:7200/repositories/exam";

  const query = `
  prefix :      <http://buchmann.ro#>
  prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX mm: <http://bee-up.omilab.org/rdf/1_6#>
  PREFIX cv: <http://www.comvantage.eu/mm#>
  select ?name ?y where
  {?x a mm:o_Pool_BPMN; rdfs:label ?name. 
    ?y mm:r_Is_inside ?x; a mm:o_Sub-Process_BPMN;}
  `;

  useEffect(() => {
    const params = new URLSearchParams();

    params.append("query", query);

    axios
      .get(`${endpoint}?${params.toString()}`)
      .then((res) => {
        console.log(res);
        console.log(res.data.results.bindings);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
