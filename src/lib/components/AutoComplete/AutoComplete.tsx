import { TextInput, TextInputProps, TextHighlight } from "lib/components";
import { useDebounceEffect } from "lib/hooks";
import { TOnFilterListAsync, TOnSelected } from "lib/types";
import React, { useRef, useState } from "react";

import "./AutoComplete.styles.scss";
import { AutoCompleteOption } from "./AutoComplete.types";

export interface AutoCompleteProps extends TextInputProps {
  options: AutoCompleteOption[];
  filter: TOnFilterListAsync<string, AutoCompleteOption>;
  onSelected: TOnSelected<AutoCompleteOption>;
}

const defaultFilter = (inputText: string, options: AutoCompleteOption[]) => {
  return Promise.resolve(
    options?.filter((option) =>
      option.label.toLowerCase().includes(inputText.toLowerCase())
    ) || []
  );
};

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  options = [],
  filter = defaultFilter,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>();
  const [controlledOptions, setControlledOptions] = useState<
    AutoCompleteOption[]
  >([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<AutoCompleteOption | null>(null);

  const isHoverDropdown = useRef<boolean>(false);

  useDebounceEffect(
    () => {
      if (isLoading) return;

      setIsLoading(true);

      const input = selected ? "" : inputText;

      filter(input, options)
        .then((result) => {
          setControlledOptions(result);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    },
    150,
    [inputText]
  );

  const handleSelectOption = (option: AutoCompleteOption) => {
    setSelected(option);
    setInputText(option.label);
    setIsOpen(false);
  };

  const handleInputChange = (input: string) => {
    setInputText(input);
    setSelected(null);
  };

  return (
    <div className="deel-AutoComplete" ref={wrapperRef}>
      <TextInput
        onFocus={() => setIsOpen(true)}
        onBlur={() => !isHoverDropdown.current && setIsOpen(false)}
        onChange={(e) => handleInputChange(e.target.value)}
        value={inputText}
        isLoading={isLoading}
      />

      {isOpen && (
        <ul
          onMouseEnter={() => (isHoverDropdown.current = true)}
          onMouseLeave={() => (isHoverDropdown.current = false)}
          style={{
            width: wrapperRef.current?.offsetWidth || "auto",
          }}
        >
          {/* A better approach here would be a virtual list, removing and adding DOM items
           * wether if they are visible or not, to handle large amounts of data. I didn't wanted to go too deep and
           * re-invent the wheel creating a list virtualizer.
           *
           * So since i'm not allowed to use any third party libs, this is enough for this case.
           */}
          {(controlledOptions.length &&
            controlledOptions.map((option) => (
              <li
                data-selected={option.label === selected?.label}
                onClick={() => handleSelectOption(option)}
                key={option.label}
              >
                <TextHighlight
                  text={option.label}
                  highlight={inputText || ""}
                />
              </li>
            ))) || <li data-nooption>No options</li>}
        </ul>
      )}
    </div>
  );
};
