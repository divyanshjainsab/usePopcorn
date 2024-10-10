import { useState } from "react";
export default function TextExpander({
  children,
  wordCount = 10,
  isCollapsed: X = true,
  linkStyle = {
    all: "unset",
    color: "blue",
    textDecoration: "none",
    cursor: "pointer",
  },
  showText = "Show More",
  hideText = "Show Less",
}) {
  const [isCollapsed, setCollapsed] = useState(X);
  const newString =
    children
      .split(" ")
      .slice(0 , wordCount)
      .join(" ") + "... ";
  return (
    <div>
      {isCollapsed ? newString : children }
      <a onClick={() => setCollapsed(!isCollapsed)} style={linkStyle} href="#" >{" "}
        {isCollapsed ? showText : hideText}
      </a>
    </div>
  );
}
