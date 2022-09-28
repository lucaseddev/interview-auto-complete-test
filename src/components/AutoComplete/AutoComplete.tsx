import { TextInput, TextInputProps } from "components";
import React, { useEffect, useRef, useState } from "react";

import "./AutoComplete.styles.scss";

export interface AutoCompleteProps extends TextInputProps {}

export const AutoComplete: React.FC<AutoCompleteProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const [dropdownWidth, setDropdownWidth] = useState<number>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      wrapperRef.current &&
      wrapperRef.current.offsetWidth !== dropdownWidth
    ) {
      setDropdownWidth(wrapperRef.current.offsetWidth);
    }
  }, [wrapperRef.current]);

  return (
    <div className="deel-AutoComplete" ref={wrapperRef}>
      <TextInput
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      />

      {isOpen && (
        <ul
          style={{
            width: dropdownWidth || "auto",
          }}
        >
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      )}
    </div>
  );
};
