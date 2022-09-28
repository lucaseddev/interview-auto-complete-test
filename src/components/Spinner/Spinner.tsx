import React from "react";
import './Spinner.styles.scss'

export interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl" | number;
  className?: string;
}

export function Spinner(props: SpinnerProps) {
  const { size = "md", className } = props;

  return (
    <div className={`deel-spinner size-${size} ${className || ''}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
      >
        <path d="M96.856 50.341C96.856 24.47 75.872 3.485 50 3.485S3.144 24.47 3.144 50.341m7.945 0c0-21.39 17.317-38.91 38.911-38.91s38.91 17.52 38.91 38.91">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
}
