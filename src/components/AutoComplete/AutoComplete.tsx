import { TextInput, TextInputProps } from "components";
import useDebounceEffect from "hooks/useDebounceEffect";
import React, { useEffect, useRef, useState } from "react";

import "./AutoComplete.styles.scss";
import { AutoCompleteOption } from "./AutoComplete.types";

export interface AutoCompleteProps extends TextInputProps {
  options: AutoCompleteOption[];
  filter: AutoCompleteSearchCallback;
}

export type AutoCompleteSearchCallback = (
  inputText: string,
  options: AutoCompleteOption[]
) => Promise<AutoCompleteOption[]>;

const defaultFilter: AutoCompleteSearchCallback = (inputText, options) => {
  return Promise.resolve(
    options.filter((option) =>
      option.label.toLowerCase().includes(inputText.toLowerCase())
    )
  );
};

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  options = [],
  filter = defaultFilter,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>();
  const [dropdownWidth, setDropdownWidth] = useState<number>();
  const [controlledOptions, setControlledOptions] = useState<
    AutoCompleteOption[]
  >([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      wrapperRef.current &&
      wrapperRef.current.offsetWidth !== dropdownWidth
    ) {
      setDropdownWidth(wrapperRef.current.offsetWidth);
    }
  }, [wrapperRef.current]);

  useDebounceEffect(
    () => {
      setIsLoading(true);

      !isLoading && filter(inputText, options)
        .then((result) => {
          setControlledOptions(result);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    },
    100,
    [inputText]
  );

  return (
    <div className="deel-AutoComplete" ref={wrapperRef}>
      <TextInput
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onChange={(e) => setInputText(e.target.value)}
        isLoading={isLoading}
      />

      {isOpen && (
        <ul
          style={{
            width: dropdownWidth || "auto",
          }}
        >
          {(controlledOptions.length &&
            controlledOptions.map((option) => (
              <li key={option.label}>{option.label}</li>
            ))) || <li data-nooption>No options</li>}
        </ul>
      )}
    </div>
  );
};
