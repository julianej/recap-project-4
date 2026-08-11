import { useState } from "react";

export default function ThemeForm({ onAddTheme }) {
  const [themeName, setThemeName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!themeName.trim()) {
      return;
    }

    onAddTheme(themeName);
    setThemeName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="theme-name">Theme name</label>

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
  );
}