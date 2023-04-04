import "./App.css";
import React, { useState } from "react";

function App() {
  const rows = 31;
  const cols = 31;
  const radius = 15;

  const [colors, setColors] = useState(Array(rows * cols).fill("#FFFFFF"));

  const handleMagicStone = () => {
    const newColors = colors.map((color, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const dist = Math.sqrt(
        Math.pow(row - rows / 2, 2) + Math.pow(col - cols / 2, 2)
      );
      if (dist <= radius) {
        return dist <= radius - 2
          ? "#" + Math.floor(Math.random() * 16777215).toString(16)
          : "#FFFFFF";
      } else {
        return "#FFFFFF";
      }
    });
    setColors(newColors);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "300px",
          height: "300px",
          border: "1px solid black",
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 10px)`,
          gap: "0",
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        {colors.map((color, i) => (
          <div key={i} style={{ backgroundColor: color }}></div>
        ))}
      </div>
      <button onClick={handleMagicStone}>Find Magic Stone</button>
    </div>
  );
}

export default App;
