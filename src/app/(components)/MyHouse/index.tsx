"use client";

import { useState } from "react";

const options = [
  { label: "Gryffindor", value: "gryffindor", color: "text-amber-400" },
  { label: "Hufflepuff", value: "hufflepuff", color: "text-amber-900" },
  { label: "Ravenclaw", value: "ravenclaw", color: "text-cyan-500" },
  { label: "Slytherin", value: "slytherin", color: "text-green-600" },
];

export default function MyHouse() {
  const [value, setValue] = useState(options[0].value);
  return (
    <div className="flex">
      <label className="text-purple-400 mr-1">My House:</label>
      <select
        className={`${options.find((option) => option.value === value)?.color}`}
        id="filter"
        name="filter"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
