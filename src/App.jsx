import { initialColors } from "./lib/colors.js";
import Color from "./Components/Color/Color.jsx";
import ColorForm from "./Components/ColorForm/ColorForm.jsx";
import { useState } from "react";

import "./App.css";

function App() {

/*
  creates a React state variable.
  colors      → current value
  setColors   → function to change the value
*/
  const [colors, setColors] = useState(initialColors);

// handle child component ColorForm's new color submission
  function handleAddColor(newColor) {
    setColors((colors) => [{ id: crypto.randomUUID(), ...newColor }, ...colors]);
  }

  return (
    <>
      <h1>Theme Creator</h1>
        <main>
          <h2>Color Cards Overview</h2>
           {colors.map((color) => (
              <Color
              key={color.id}
              hex={color.hex}
              role={color.role}
              contrastText={color.contrastText}
              />
          ))}
        </main>
            <ColorForm onAddColor={handleAddColor} />
    </>
  );
}

export default App;
