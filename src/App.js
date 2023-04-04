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
  const dark = [114, 115, 145, 146, 177, 208, 593, 624, 625];

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

  function darkenColor(color) {
    // parse the hex color code and convert it to RGB values
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);

    // reduce each RGB value by 15%
    const darkenedRed = Math.floor(red * 0.65);
    const darkenedGreen = Math.floor(green * 0.65);
    const darkenedBlue = Math.floor(blue * 0.65);

    // convert the darkened RGB values back to hex color code
    const darkenedColor = `#${darkenedRed.toString(16)}${darkenedGreen.toString(
      16
    )}${darkenedBlue.toString(16)}`;

    return darkenedColor;
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
          let div = Math.floor(i / 30);
          if (
            i > 654 ||
            (i % 30) - div > 22 ||
            i % 30 < div + 3 ||
            dark.includes(i)
          )
            color = darkenColor(color);
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
