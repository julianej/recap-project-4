import { useState } from "react";

// handle new Color form submission and pass the new color to the parent component
// addColor is a prop, passed down from the parent component to handle the new color data
// addColor specifically is a function that ColorForm receives from its parent (App).

// export default function ColorForm({ addColor..add more props}
export default function ColorForm({
  addColor,
  color,
  onEdit,
  onCancel,
}) {
// is destructuring the addColor prop.
// as hook state? to hold the new color information
// newColor      → the current state/value
// setNewColor   → the function that changes that state
const [newColor, setNewColor] = useState(
// edit color operator | and color Object
  color || {
    role: "color role",
    hex: "#000000",
    contrastText: "#ffffff",
  }
);

// handle Input change
function handleChange(event) {
    const { name, value } = event.target;
// setter Function with new Variable
    setNewColor((currentColor) => ({
      ...currentColor,
      [name]: value,
    }));
  }

// handle form submission extended handling
function handleSubmit(event) {
    event.preventDefault();
    if (color){
      onEdit({
        ...newColor,
        originalHex: color.hex,
      });
    }
 // call the addColor function passed down from the parent component with the new color data
    else addColor(newColor);
  }

   return (
  <form onSubmit={handleSubmit}>

    <h2>
      {color ? "Edit Color Card" : "Add a Color Card"}
    </h2>

      <label htmlFor="role">Role</label>
      <input
        type="text"
        id="role"
        name="role"
        value={newColor.role}

        onChange={handleChange}
        // When the input changes, run this function.
        // onChange={(event) =>
        // // event.target = the input
        // // event.target.value = what the user entered
        //   setNewColor({
        //     ...newColor,
        //     role: event.target.value,
        //   })
        placeholder="color role"
      />

      <label htmlFor="hex">Hex value</label>

      <input
        type="color"
        id="hex-color"
        name="hex"
        value={newColor.hex}
        onChange={handleChange}
        // onChange={(event) =>
        //   setNewColor({
        //     ...newColor,
        //     hex: event.target.value,
        //   })
        //}
      />

      <input
        type="text"
        id="hex"
        name="hex"
        value={newColor.hex}
        onChange={handleChange}
        // onChange={(event) =>
        //   setNewColor({
        //     ...newColor,
        //     hex: event.target.value,
        //   })
        // }
        placeholder="#ff0000"
      />

      <label htmlFor="contrast-text">Contrast text</label>

      <input
        type="color"
        id="contrast-color"
        // WRONG name="color"
        name="contrastText"
        // because ..{newColor.contrastText}
        value={newColor.contrastText}
        onChange={handleChange}
        // onChange={(event) =>
        //   setNewColor({
        //     ...newColor,
        //     contrastText: event.target.value,
        //   })
        // }
      />

      <input
        type="text"
        id="contrast-text"
       // WRONG  name="contrast-text"
        name="contrastText"
        // because ..{newColor.contrastText}
        value={newColor.contrastText}
        onChange={handleChange}
        // onChange={(event) =>
        //   setNewColor({
        //     ...newColor,
        //     contrastText: event.target.value,
        //   })
        // }
        placeholder="#ffffff"
      />

      <button 
       // make the button/submit reusable
      type="submit">
        {color ? "Save" : "Add color"}</button> 
        {color && (
           // "If color exists, render this button."
           // if (color) { // show Cancel button
          // else .. Cancel now shown
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          )}
    </form>
  );
}