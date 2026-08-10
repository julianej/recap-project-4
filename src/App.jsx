import { useState } from "react";
import { initialColors } from "./lib/colors.js";
import Color from "./Components/Color/Color.jsx";
import ColorForm from "./Components/ColorForm/ColorForm.jsx";
import { uid } from "uid";

import "./App.css";

function App() {

/*
  creates a React state variable.
  colors      → current value
  setColors   → function to change the value
*/
  const [colors, setColors] = useState(initialColors);

// AUFGABE 02
  function handleAddColor(newColor) {
    setColors((colors) => [{  id: uid(), ...newColor }, ...colors]);
  }

// AUFGABE 03
// handle child component Color' and delete color key = hex
   function handleDeleteColor(hex) {
    setColors((colors) => {
      return colors.filter((color) => color.hex !== hex);
    });
  }

// AUFGABE 04
   function handleEditColor(updatedColor) {
      setColors((colors) =>
        colors.map((color) => 
          color.id === updatedColor.id
            ? updatedColor
            : color
        )
      );
    }

  return (
    <>
      <h1>Theme Creator</h1>
        <main>
          <h2>Color Cards Overview</h2>
           {colors.map((color) => (
              <Color
              key={color.id}
              id={color.id}
              hex={color.hex}
              role={color.role}
              contrastText={color.contrastText}
              onDelete={handleDeleteColor}
              onEdit={handleEditColor}
              />
          ))}
        </main>
            <ColorForm onAddColor={handleAddColor} />
    </>
  );
}

export default App;
