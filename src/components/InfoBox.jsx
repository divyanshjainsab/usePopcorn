import { useState } from "react";
import ToggleButton from "./ToggleButton.jsx";
export default function InfoBox({children}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ToggleButton toSet={isOpen} setter={setIsOpen} />
      {isOpen && children}
    </div>
  );
}
