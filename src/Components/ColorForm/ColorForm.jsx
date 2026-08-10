import { useState } from "react";
import Input from "../Input/Input.jsx";

// handle new Color form submission and pass the new color to the parent component
// onAddColor is a function passed down from the parent component to handle the new color data
// onXYZ for props passed to a component;
export default function ColorForm({ onAddColor }) {

// hook state to hold the new color information
// newColor      → the current state/value
// setNewColor   → the function that changes that state
  const [newColor, setNewColor] = useState({
    role: "primary",
    hex: "#000000",
    contrastText: "#ffffff",
  });

// handle Input change
function handleChange(event) {
    const { name, value } = event.target;

    setNewColor((currentColor) => ({
      ...currentColor,
      [name]: value,
    }));
  }

// handle form submission
function handleSubmit(event) {
    event.preventDefault();
 // call the onAddColor function passed down from the parent component with the new color data
    onAddColor(newColor);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Color Card</h2>
       <Input
        label="Role"
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
        placeholder="primary"
      />

      <Input
        label="Hex Value"
        id="hex-color"
        name="hex"
        type="color"
        value={newColor.hex}
        onChange={handleChange}
      />

      <Input
        id="hex"
        name="hex"
        value={newColor.hex}
        onChange={handleChange}
        placeholder="#ff0000"
      />

      <Input
        label="Contrast text"
        id="contrast-color"
        name="contrastText"
        type="color"
        value={newColor.contrastText}
        onChange={handleChange}
      />

       <Input
        id="contrast-text"
        name="contrastText"
        value={newColor.contrastText}
        onChange={handleChange}
        placeholder="#ffffff"
      />


      {/* example IMPORT INPUT COMPONENT
      
      <label htmlFor="contrast-color" className="visually-hidden">Contrast text color picker</label>

      <input
        type="text"
        id="contrast-text"
        name="contrastText"
        value={newColor.contrastText}
        onChange={handleChange}
        // onChange={(event) =>
        //   setNewColor({
        //     ...newColor,
        //     contrastText: event.target.value,
        //   })
        // }
        placeholder="#ffffff"
      /> */}

      <button type="submit">Add color</button>
    </form>
  );
}