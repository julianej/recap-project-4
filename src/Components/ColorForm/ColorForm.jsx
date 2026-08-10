import { useState } from "react";
import ColorInput from "../Input/Input.jsx";

// handle new Color form submission and pass the new color to the parent component
// onAddColor is a function passed down from the parent component to handle the new color data
// onXYZ for props passed to a component;
// export default function ColorForm({ addColor..add more props}
export default function ColorForm({
  onAddColor,
  color,
  onEdit,
  onCancel,
}) {
// is destructuring the addColor prop.
// as hook state? to hold the new color information
// newColor      → the current state/value
// setNewColor   → the function that changes that state
  const [newColor, setNewColor] = useState({
    role: "primary",
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
 // call the onAddColor function passed down from the parent component with the new color data
  if (color) {
    onEdit(newColor);
  } else {
    onAddColor(newColor);
  }
}

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Color Card</h2>
       <ColorInput
        label="Role"
        id="role"
        name="role"
        value={newColor.role}

        onChange={handleChange}
      />

      <ColorInput
        label="Hex Value"
        id="hex-color"
        name="hex"
        type="color"
        value={newColor.hex}
        onChange={handleChange}
      />

      <ColorInput
        label="Hex Value Color"
        id="hex"
        name="hex"
        value={newColor.hex}
        onChange={handleChange}
        placeholder="#ff0000"
      />

      <ColorInput
        label="Contrast Text"
        id="contrast-color"
        name="contrastText"
        type="color"
        value={newColor.contrastText}
        onChange={handleChange}
      />

       <ColorInput
        label="Contrast Text Color"
        id="contrast-text"
        name="contrastText"
        value={newColor.contrastText}
        onChange={handleChange}
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
  )}