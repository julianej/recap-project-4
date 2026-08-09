import "./Color.css";
import { useState } from "react";

export default function Color({ hex, role, contrastText, onDelete }) {

  //handle Delete in conditional rendering; if (showConfirmation) {condition && <Something />}
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <div className="color-card" style={{ backgroundColor: hex }}>
      <h2>{hex}</h2>
      <p>{role}</p>
      <p className="color-contrast-text" style={{ color: contrastText }}>
        {contrastText}
      </p>

      <button onClick={() => setShowConfirmation(true)}>
        Delete
      </button>

      {showConfirmation && (
        <div>
          <p>Are you sure you want to delete this color?</p>

          <button onClick={() => onDelete(hex)}>
            Yes
          </button>

          <button onClick={() => setShowConfirmation(false)}>
            No
          </button>
        </div>
      )}
    </div>
  );
}