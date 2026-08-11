export default function ThemeSelector({
  themes,
  activeThemeId,
  onChange,
}) {
  return (
    <select
      value={activeThemeId}
      onChange={(event) => onChange(event.target.value)}
    >
      {themes.map((theme) => (
        <option key={theme.id} value={theme.id}>
          {theme.name}
        </option>
      ))}
    </select>
  );
}