import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { initialColors } from "./lib/colors.js";
import Color from "./Components/Color/Color.jsx";
import ColorForm from "./Components/ColorForm/ColorForm.jsx";
import { uid } from "uid";

import "./App.css";

function App() {

// AUFGABE 01
// creates a React state variable.
// colors      → current array value, state that can change
// setColors   → function to change the value
// const [colors, setColors] = useState(() => {

 // AUFGABE 01 + 05
  const [colors, setColors] = useLocalStorageState("colors", { defaultValue: initialColors });  
  // Check if colors are already saved in localStorage in console
  // If saved colors exist, use them.
  // Otherwise, use the initial colors.
  
  // const [colors, setColors] = useState(() => {
  // const savedColors = localStorage.getItem("colors");
  // return savedColors ? JSON.parse(savedColors) : initialColors;

  // AUFGABE 05
  // Save colors to localStorage whenever colors changes.
  useEffect(() => {
    // console.log("Saving colors:", colors);

    localStorage.setItem("colors", JSON.stringify(colors));
  }, [colors]);

// AUFGABE 02
  function handleAddColor(newColor) {
    setColors((colors) => [{ id: uid(), ...newColor },
    ...colors,
  ]);
  }

// AUFGABE 03
// handle child component Color' and delete color key = hex
   function handleDeleteColor(id) {
    setColors((colors) => {
      return colors.filter((color) => color.id !== id);
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
          {/* condition ? valueIfTrue : valueIfFalse */}
          {colors.length === 0
              ? <p>No colors yet, add one to get started!</p>
              : colors.map((color) => (
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
