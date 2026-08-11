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


async function checkContrast(color) {
  try {
    const response = await fetch(
      "https://aremycolorsaccessible.com/api/are-they",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          colors: [color.hex, color.contrastText],
        }),
      });

    const result = await response.json();
    return result;

  } catch (error) {
    console.error(error);
    return null;
  }
}




// AUFGABE 02
  async function handleAddColor(newColor) {
  const contrastResult = await checkContrast(newColor);

  setColors((colors) => [
    {
      id: uid(),
      ...newColor,
      contrastResult,
    },
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
   async function handleEditColor(updatedColor) {
  const contrastResult = await checkContrast(updatedColor);

  setColors((colors) =>
    colors.map((color) =>
      color.id === updatedColor.id
        ? {
            ...updatedColor,
            contrastResult,
          }
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
              contrastResult={color.contrastResult}
              />
          ))}
        </main>
          <ColorForm onAddColor={handleAddColor} />
    </>
  );
}

export default App;
