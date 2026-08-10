import "./Color.css";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm.jsx";

export default function Color({ id, hex, role, contrastText, onDelete, onEdit }) {

  //handle Delete in conditional rendering; if (showConfirmation) {condition && <Something />}
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="color-card" style={{ backgroundColor: hex }}>
      <h2 className="color-hex color-card-headline">{hex}</h2>
      <p className="color-role" style={{ color: contrastText }}>{role}</p>
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

      <button onClick={() => setIsEditing(true)}>
        Edit
      </button>
       {isEditing && (
        <ColorForm
          color={{ role, hex, contrastText }}
          onEdit={(updatedColor) => {
            // You pass a function to the ColorForm component:
            // inline callback function
            onEdit({
              ...updatedColor,
              id,
            });

            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
       )}
    </div>
  );
}