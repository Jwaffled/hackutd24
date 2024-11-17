import React, { useState } from "react";

const CarComparison = () => {
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
    <main className="absolute top-0 left-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/background.jpg')" }}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-4">Car Selector</h1>
          <p className="text-gray-600 text-center mb-6">Choose your preferred car details below:</p>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <select
                id="brand"
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value as keyof typeof models);
                  setModel("");
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a Brand</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                Model
              </label>
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={!brand}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
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

            <button
              onClick={handleGoClick}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CarComparison;