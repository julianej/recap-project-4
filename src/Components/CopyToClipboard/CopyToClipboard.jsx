import { useState } from "react";

/* 
Coponents: CopyToClipboard
useState: isCopied boolean: false
async handle function: handleCopy
Api: try {await..} catch (error) 
*/

export default function CopyToClipboard({ hex }) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    try {
     // navigator.clipboard.writeText() 
      await navigator.clipboard.writeText(hex);

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to copy color:", error);
    }
  }

  return (
    <>
      <button onClick={handleCopy}>
        Copy to Clipboard
      </button>

      {isCopied && (
        <p>Color {hex} copied successfully!</p>
      )}
    </>
  );
}