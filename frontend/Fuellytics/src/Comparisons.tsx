import React, { useState } from "react";
import "./App.css";

function App() {
  const [brand, setBrand] = useState<keyof typeof models | "">("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");

  const brands = ["Toyota", "Honda", "Ford", "Chevrolet"];
  const years = ["2022", "2023", "2024"];
  const models = {
    Toyota: ["Camry", "Corolla", "RAV4"],
    Honda: ["Civic", "Accord", "CR-V"],
    Ford: ["Mustang", "Explorer", "F-150"],
    Chevrolet: ["Malibu", "Silverado", "Equinox"],
  };

  const handleGoClick = () => {
    if (brand && year && model) {
      alert(`You selected: ${brand} ${model}, ${year}`);
    } else {
      alert("Please select all options before proceeding.");
    }
  };

  return (
    <div className="App">
      <h1 className="title">Car Selector</h1>
      <p className="description">Choose your preferred car details below:</p>

      <div className="form-container">
        {/* Dropdowns aligned to the right */}
        <div className="dropdown-container">
          <div className="dropdown">
            <label htmlFor="brand">Brand</label>
            <select
              id="brand"
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value as keyof typeof models); // Type assertion
                setModel(""); // Reset model when brand changes
              }}
            >
              <option value="">Select a Brand</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="dropdown">
            <label htmlFor="year">Year</label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Select a Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="dropdown">
            <label htmlFor="model">Model</label>
            <select
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={!brand}
            >
              <option value="">Select a Model</option>
              {brand &&
                models[brand].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Go Button */}
        <button className="go-button" onClick={handleGoClick}>
          Go
        </button>
      </div>
    </div>
  );
}

export default App;
