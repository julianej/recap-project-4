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

// --------- CREATE REACT STATE  ------- AUFGABE 01
// creates a React state variable.
// colors      → current array value, state that can change
// setColors   → function to change the value
// const [colors, setColors] = useState(() => {


// --------- USE LOCAL STORAGE  ------- AUFGABE 01 + 05
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


// --------- ACTIVE THEME EDIT & DELETE  ------- AUFGABE 07
const [activeThemeId, setActiveThemeId] = useState("default");
// Find the currently selected theme
// const found = array.find( (element) => element.id === 10);
const activeTheme = themes.find((theme) => 
  theme.id === activeThemeId)
//if nothing is found, use the first theme in the array; undefined ?? themes[0]
?? themes[0];

console.log(activeTheme, activeThemeId);
console.log(activeThemeId, "active theme ID");

// --------- HANDLE ADD THEME  -------
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

// --------- HANDLE DELETE -------
function handleDeleteTheme(id) {
    // if (id === "default") return;

    setThemes((themes) =>
        themes.filter((theme) => theme.id !== id)
    );

    // if (id === activeThemeId) {
    //     setActiveThemeId("default");
    // }
}

// --------- HANDLE UPDATE -------
function handleUpdateTheme(id, newName) {
  setThemes((themes) =>
    themes.map((theme) =>
      theme.id === id
        ? {
            ...theme,
            name: newName,
          }
        : theme
    )
  );
}

// --------- HANDLE CONTRAST-------

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
      }
    );

    const result = await response.json();

    console.log("contrastResult:", result);

    return result;

  } catch (error) {
    console.error("Contrast check failed:", error);
    return null;
  }
}

// --------- HANDLE ADD COLOUR ------- // AUFGABE 02
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

// --------- HANDLE DELETE COLOUR ------- // AUFGABE 03

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

// --------- HANDLE EDIT COLOUR ------- // AUFGABE 04
async function handleEditColor(updatedColor) {
  const contrastResult = await checkContrast(updatedColor);

  setThemes((themes) =>
    themes.map((theme) =>
      theme.id === activeThemeId
        ? {
            ...theme,
            colors: theme.colors.map((color) =>
              color.id === updatedColor.id
                ? {
                    ...updatedColor,
                    contrastResult,
                  }
                : color
            ),
          }
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
          onUpdateTheme={handleUpdateTheme}
          onDeleteTheme={handleDeleteTheme}
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
                  contrastResult={color.contrastResult}
                />
              ))
            )}
        </main>
          <ColorForm onAddColor={handleAddColor} />
    </>
  );
}

export default App;
