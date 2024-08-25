import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "21BCE2449";
  }, []);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    setError("");
    setResponse(null);
    setSelectedOptions([]);
    console.log(jsonInput);

    try {
      const parsedInput = JSON.parse(jsonInput);
      console.log(parsedInput);
      const res = await axios.post(
        "https://bajaj-finserv-1bi7.onrender.com/bfhl",
        { data: parsedInput.data }
      );
      console.log(res.data);
      setResponse(res.data);
    } catch (error) {
      setError("Invalid JSON input or Error fetching data");
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(value);
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    return (
      <div className="filtered-response">
        {selectedOptions.includes("numbers") && (
          <div>
            <h3>Numbers:</h3>
            <p>{response.numbers.join(", ")}</p>
          </div>
        )}
        {selectedOptions.includes("alphabets") && (
          <div>
            <h3>Alphabets:</h3>
            <p>{response.alphabets.join(", ")}</p>
          </div>
        )}
        {selectedOptions.includes("highest_alphabet") && (
          <div>
            <h3>Highest Alphabet:</h3>
            <p>{response.highest_alphabet.join(", ")}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>{"21BCE2449"}</h1>
      <input
        type="text"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder="Enter JSON input"
        className="json-input"
      />
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <select
            multiple
            onChange={handleOptionChange}
            className="multi-select"
          >
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          {renderFilteredResponse()}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="submit-button"
      >
        Submit
      </button>
    </div>
  );
}

export default App;
