import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>
      // display colors here
        <main>
          <h1>Color Cards</h1>
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
