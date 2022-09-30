import React from "react";

export interface TextHighlightProps {
  text: string;
  highlight: string;
}

export const TextHighlight: React.FC<TextHighlightProps> = ({
  text,
  highlight,
}) => {
  const start = text.toLowerCase().indexOf(highlight.toLowerCase());
  const end = start + highlight.length;

  if (start >= 0) {
    return (
      <span>
        {text.substring(0, start)}
        <strong>{text.substring(start, end)}</strong>
        {text.substring(end)}
      </span>
    );
  }

  return <span>{text}</span>;
};
