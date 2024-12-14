"use client";

import { useState } from "react";
import { Bounded } from "@/components/Bounded";

const houseTypes = ["Terraced", "Semi-detached", "Detached", "Flat"];
const bedroomOptions = [1, 2, 3, 4, 5];
const bathroomOptions = [1, 2, 3, 4, 5];

// Simulated average yearly running costs (£) for different house types
const averageRunningCosts = {
  Terraced: 1500,
  "Semi-detached": 2000,
  Detached: 3000,
  Flat: 1200,
};

const SavingsCalculator = () => {
  const [houseType, setHouseType] = useState(houseTypes[0]);
  const [bedrooms, setBedrooms] = useState(bedroomOptions[0]);
  const [bathrooms, setBathrooms] = useState(bathroomOptions[0]);
  const [savings, setSavings] = useState(null);

  const calculateSavings = () => {
    const cost =
      averageRunningCosts[houseType] + bedrooms * 200 + bathrooms * 100;
    setSavings(cost);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* House Type Selector */}
        <select
          value={houseType}
          onChange={(e) => setHouseType(e.target.value)}
          className="bg-white text-black rounded-md p-2 w-full md:w-auto"
        >
          {houseTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Bedrooms Selector */}
        <select
          value={bedrooms}
          onChange={(e) => setBedrooms(parseInt(e.target.value))}
          className="bg-white text-black rounded-md p-2 w-full md:w-auto"
        >
          {bedroomOptions.map((num) => (
            <option key={num} value={num}>
              {num} bedroom{num > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        {/* Bathrooms Selector */}
        <select
          value={bathrooms}
          onChange={(e) => setBathrooms(parseInt(e.target.value))}
          className="bg-white text-black rounded-md p-2 w-full md:w-auto"
        >
          {bathroomOptions.map((num) => (
            <option key={num} value={num}>
              {num} bathroom{num > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        {/* Calculate Button */}
        <button
          onClick={calculateSavings}
          className="bg-vertoLightGreen text-vertoBlack py-2 px-6 rounded-md w-full md:w-auto"
        >
          CALCULATE
        </button>
      </div>

      {/* Display Savings */}
      {savings !== null && (
        <div className="text-center mt-14">
          <p className="text-2xl mb-2 text-white">
            You would save an estimated
          </p>
          <p className="text-7xl font-bold text-vertoLightGreen my-6">
            £{savings.toLocaleString()}
          </p>
          <p className="text-2xl mt-2 text-white">
            over a five year period by moving into a Zero Bills home
          </p>
        </div>
      )}
    </div>
  );
};

export default SavingsCalculator;
