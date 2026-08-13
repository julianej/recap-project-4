import { useState } from "react";

export default function ThemeSelector({
  themes,
  activeThemeId,
  onChange,
  onUpdateTheme,
  onDeleteTheme,
}) {
  const activeTheme = themes.find(
    (theme) => theme.id === activeThemeId
  );

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");

  const handleEdit = () => {
    setName(activeTheme.name);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName("");
  };

  const handleUpdate = () => {
    onUpdateTheme(activeThemeId, name);
    setIsEditing(false);
  };
  


  return (
    <>
    <div className="theme-select-wrapper">
      {!isEditing ? (
        <>
          <label htmlFor="theme-select">Choose a Theme</label>

          <select
            id="theme-select"
            value={activeThemeId}
            onChange={(event) => onChange(event.target.value)}
          >
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>

    
           <button
            type="button"
            onClick={handleEdit}
          >
            Edit
          </button>

       {activeThemeId !== "default" && (
            <button
              type="button"
              onClick={() => onDeleteTheme(activeThemeId)}
            >
              Delete
            </button>
          )}
        </>
      ) :(
        <>
          <label htmlFor="theme-name">
            My new Theme name
          </label>

          <input
            id="theme-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <button
            type="button"
            onClick={handleUpdate}
          >
            Update
          </button>

          <button
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </>
      )}
      </div>
    </>
  );
}
