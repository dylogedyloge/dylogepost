import { useState } from "react";

const PrintSelectedText = () => {
  const [selectedText, setSelectedText] = useState("");
  const [showPrintButton, setShowPrintButton] = useState(false);

  const handleTextSelection = () => {
    const selection = window.getSelection().toString();
    setSelectedText(selection);

    if (selection) {
      setShowPrintButton(true);
    } else {
      setShowPrintButton(false);
    }
  };

  const handlePrintClick = () => {
    console.log("Selected Text:", selectedText);
  };

  return (
    <div onMouseUp={handleTextSelection}>
      <p>Select some text in this area.</p>
      {showPrintButton && <button onClick={handlePrintClick}>Print</button>}
    </div>
  );
};

export default PrintSelectedText;
