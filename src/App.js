import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const rows = 31;
  const cols = 31;
  const radius = 15;

  const [colors, setColors] = useState(Array(rows * cols).fill("#FFFFFF"));

  const shine = [
    198, 199, 200, 228, 229, 230, 258, 259, 260, 288, 289, 290, 318, 319, 320,
    350, 378, 379, 409, 410,
  ];
  const dark = [
    687, 718, 719, 788, 720, 555, 585, 586, 615, 616, 617, 645, 646, 647, 675,
    676, 677, 678, 705, 706, 707, 708, 735, 736, 737, 738, 739, 734, 762, 763,
    764, 765, 766, 767, 768, 769, 750, 752, 751, 753,
  ];

  const handleMagicMarble = () => {
    const randomColors = [
      "#" + Math.floor(Math.random() * 16777215).toString(16),
      "#" + Math.floor(Math.random() * 16777215).toString(16),
      "#" + Math.floor(Math.random() * 16777215).toString(16),
      "#" + Math.floor(Math.random() * 16777215).toString(16),
    ];

    const newColors = colors.map((color, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const dist = Math.sqrt(
        Math.pow(row - rows / 2, 2) + Math.pow(col - cols / 2, 2)
      );
      if (dist <= radius) {
        return dist <= radius - 2
          ? randomColors[Math.floor(Math.random() * randomColors.length)]
          : "#FFFFFF";
      } else {
        return "#FFFFFF";
      }
    });
    setColors(newColors);
  };

  function adjust(color, amount) {
    return (
      "#" +
      color
        .replace(/^#/, "")
        .replace(/../g, (color) =>
          (
            "0" +
            Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(
              16
            )
          ).substr(-2)
        )
    );
  }

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
        {colors.map((color, i) => {
          if (shine.includes(i)) color = "white";
          if (i > 781 || dark.includes(i)) color = adjust(color, -80);
          return (
            <div key={i} style={{ backgroundColor: color }} id={`${i}`}></div>
          );
        })}
      </div>
      <button onClick={handleMagicMarble}>Find Magic Marble</button>
    </div>
  );
}

export default App;
