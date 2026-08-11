import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { initialColors } from "./lib/colors.js";
import Color from "./Components/Color/Color.jsx";
import ThemeSelector from "./Components/ThemeSelector/ThemeSelector.jsx";
import ThemeForm from "./Components/ThemeForm/ThemeForm.jsx";
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
// const [colors, setColors] = useLocalStorageState("colors", { defaultValue: initialColors });  

const [themes, setThemes] = useLocalStorageState("themes", {
  defaultValue: [
    {
      id: "default",
      name: "Default Theme",
      colors: initialColors,
    },
  ],
});

// AUFGABE 07

function handleAddTheme(name) {
  const newTheme = {
    id: uid(),
    name: name,
    colors: [],
  };

  setThemes((themes) => [
    ...themes,
    newTheme,
  ]);

  setActiveThemeId(newTheme.id);
}

 const [activeThemeId, setActiveThemeId] = useState("default");

  // Find the currently selected theme
  // const found = array.find( (element) => element.id === 10);

  const activeTheme = themes.find(
    (theme) => theme.id === activeThemeId
  );


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

  setThemes((themes) =>
    // themes is an array of theme objects.
    themes.map((theme) =>
      // "Is this the theme the user is currently looking at?"
      theme.id === activeThemeId
      // if not condition..update Object
        ?  {
            ...theme,
            colors: [
              {
                id: uid(),
                ...newColor,
                contrastResult,
              },
              ...theme.colors,
            ],
          }
          // else.. leave that theme unchanged
        : theme
    )
  );
}

// AUFGABE 03

// function handleDeleteColor(id) {
//   setThemes((themes) => {
//     return theme.colors.filter((color) => color.id !== id);
//   });
// }

 function handleDeleteColor(id) {
  setThemes((themes) =>
    //map new array
    themes.map((theme) =>
      // item.id === condition false /true
      theme.id === activeThemeId
        ? {
            ...theme,
            colors: theme.colors.filter(
              (color) => color.id !== id
            ),
          }
        : theme
    )
  );
}

// AUFGABE 04
async function handleEditColor(updatedColor) {
const contrastResult = await checkContrast(updatedColor);

  setThemes((themes) =>
    themes.map((theme) =>
      // Find the active theme === is it this ?
      theme.id === activeThemeId
        ? { ...theme,
          // update array colors with map
          colors: theme.colors.map((color) =>
            // find the color being edited
             color.id === updatedColor.id
        ? {
            ...updatedColor,
            contrastResult,
          }
        : color
    ),}
    : theme
    )
  );
}



  return (
    <>
      <h1>Theme Creator</h1>
       <ThemeSelector
            themes={themes}
            activeThemeId={activeThemeId}
            onChange={setActiveThemeId}
          />
          <ThemeForm onAddTheme={handleAddTheme} />
        <main>
          <h2>Color Cards Overview</h2>
          {/* condition ? valueIfTrue : valueIfFalse */}
             {activeTheme.colors.length === 0 ? (
              <p>No colors yet, add one to get started!</p>
            ) : (
              activeTheme.colors.map((color) => (
                <Color
                  key={color.id}
                  id={color.id}
                  hex={color.hex}
                  role={color.role}
                  contrastText={color.contrastText}
                  onDelete={handleDeleteColor}
                  onEdit={handleEditColor}
                />
              ))
            )}
        </main>
          <ColorForm onAddColor={handleAddColor} />
    </>
  );
}

export default App;
