import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>
        <main>
          <h2>Color Cards</h2>
           {initialColors.map((color) => (
              <Color
              key={color.id}
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
