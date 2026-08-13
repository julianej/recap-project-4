import { useState } from "react";

export default function ThemeForm({ onAddTheme }) {
  const [themeName, setThemeName] = useState("");

function handleSubmit(event) {
  event.preventDefault();

  const name = themeName.trim();

  if (!name) {
    return;
  }

  onAddTheme(name);
  setThemeName("");
}

  return (
      <div className="new-theme-wrapper">
        <form className="form-add-theme" onSubmit={handleSubmit}>
          <label htmlFor="theme-name">Create New Theme</label>

          <input
            id="theme-name"
            type="text"
            value={themeName}
            onChange={(event) => setThemeName(event.target.value)}
            placeholder="My Theme"
          />

          <button type="submit">
            Create Theme
          </button>
        </form>
       </div>
  );
}