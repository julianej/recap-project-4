import "./Color.css";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm.jsx";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard.jsx";

export default function Color({
  id,
  hex,
  role,
  contrastText,
  contrastResult,
  onDelete,
  onEdit,
}) {

  //handle Delete below in conditional rendering; if (showConfirmation) {condition && <Something />}
  // shows a confirmation prompt before deleting
  // const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeAction, setActiveAction] = useState(null);

  return (
    <div className="color-card" style={{ backgroundColor: hex }}>
        <div className="color-info-wrapper">
        <h2 className="color-hex color-card-headline">{hex}</h2>
        <p className="color-role" style={{ color: contrastText }}>{role}</p>
        <p className="color-contrast-text" style={{ color: contrastText }}>
          {contrastText}
        </p>
      </div>
       {contrastResult && (
          // Only render the <p> if contrastResult exists.
        <p>
          {contrastResult.overall === "Yup"
            ? "Contrast is Kinda ok"
            : "Contrast is a Nope"}
          {" "}({contrastResult.contrast}:1)
        </p>
      )}

  <div className="card-button-wrapper">
      <button onClick={() => setActiveAction("delete")}>
        Delete
      </button>

      <button onClick={() => setActiveAction("edit")}>
        Edit
      </button>

      <CopyToClipboard hex={hex} />

      {activeAction === "delete" && (
        <>
          <p>Are you sure you want to delete this color?</p>

          <button onClick={() => onDelete(id)}>
            Yes
          </button>

          <button onClick={() => setActiveAction(null)}>
            No
          </button>
        </>
      )}
       {activeAction === "edit" && (
        <ColorForm
          color={{
            id,
            role,
            hex,
            contrastText,
          }}
          onEdit={(updatedColor) => {
            onEdit(updatedColor);
            setActiveAction(null);
          }}
          onCancel={() => setActiveAction(null)}
        />
      )}
      </div>
    </div>
  );
}