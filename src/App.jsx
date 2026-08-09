import { useState } from "react";
import { initialColors } from "./lib/colors.js";
import Color from "./Components/Color/Color.jsx";
import ColorForm from "./Components/ColorForm/ColorForm.jsx";

import "./App.css";

function App() {

// AUFGABE 01
// creates a React state variable.
// colors      → current array value, state that can change
// setColors   → function to change the value
  const [colors, setColors] = useState(initialColors);

// AUFGABE 02
// handle child component ColorForm's new color submission
  function handleAddColor(newColor) {
    setColors((colors) => [newColor, ...colors]);
  }

// AUFGABE 03
// handle child component Color' and delete color key = hex
   function handleDeleteColor(hex) {
    setColors((colors) => {
      return colors.filter((color) => color.hex !== hex);
    });
  }

// AUFGABE 04
// handle child component Color' and edit color key = hex
   function handleEditColor(hex) {
    setColors((colors) => {
      return colors.filter((color) => color.hex !== hex);
    });
  }

  return (
    <>
      <h1>Theme Creator</h1>
       <main>
        <h2>Color Cards Overview</h2>

        {colors.map((color) => (
          <Color
            key={color.hex}
            hex={color.hex}
            role={color.role}
            contrastText={color.contrastText}
            onDelete={handleDeleteColor}
            onEdit={handleEditColor}
          />
        ))}
      </main>

      <ColorForm addColor={handleAddColor} />
    </>
  );
}

export default App;
