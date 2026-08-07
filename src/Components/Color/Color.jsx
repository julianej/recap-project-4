import "./Color.css";


export default function Color({ hex, role, contrastText }) {
  // returns div container with the color card information
  return (
    <div className="color-card" style={{ backgroundColor: hex }}>
      <h2 className="color-hex color-card-headline">{hex}</h2>
      <p className="color-role">{role}</p>
      <p className="color-contrast-text" style={{ color: contrastText }}>
        {contrastText}
      </p>
    </div>
  );
}
