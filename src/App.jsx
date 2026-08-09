import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>
        <main>
          <h1>Color Cards</h1>
         <form>
        <label for="role">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          placeholder="primary"
        />

        <label for="hex">Hex value</label>
        <input
          type="color"
          id="hex-color"
          name="hex-color"
        />
        <input
          type="text"
          id="hex"
          name="hex"
          placeholder="#ff0000"
        />

       <label for="contrast-text">Contrast text</label>
        <input
          type="color"
          id="contrast-color"
          name="contrast-color"
        />
        <input
          type="text"
          id="contrast-text"
          name="contrast-text"
          placeholder="#ffffff"
        />

        <button type="submit">Add color</button>
      </form>
           {initialColors.map((color) => (
              <Color
              key={color.hex}
              hex={color.hex}
              role={color.role}
              contrastText={color.contrastText}
              />
          ))}
        </main>
    </>
  );
}

export default App;
