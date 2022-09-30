import { TextInput, TextInputProps, TextHighlight } from "lib/components";
import { useDebounceEffect } from "lib/hooks";
import { TOnFilterListAsync, TOnSelected } from "lib/types";
import React, { useCallback, useEffect, useRef, useState } from "react";

import "./AutoComplete-styles.scss";
import { AutoCompleteOption } from "./AutoComplete-types";

export interface AutoCompleteProps extends Omit<TextInputProps, 'isLoading'> {
  options?: AutoCompleteOption[];
  filter: TOnFilterListAsync<string, AutoCompleteOption>;
  onSelected?: TOnSelected<AutoCompleteOption | null>;
}

const defaultFilter = (inputText: string, options: AutoCompleteOption[]) => {
  return Promise.resolve(
    options?.filter((option) =>
      option.label.toLowerCase().includes(inputText.toLowerCase())
    ) || []
  );
};

const FIXED_ITEM_HEIGHT = 32;
const FIXED_LIST_HEIGHT = 192;

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  options = [],
  filter = defaultFilter,
  onSelected,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>();
  const [controlledOptions, setControlledOptions] = useState<
    AutoCompleteOption[]
  >([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [listRef, setListRef] = useState<HTMLUListElement | null>(null);

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

  const handleOpen = () => {
    setIsOpen(true);
    if (!selected) {
      setFocus(0);
    }
  };

  const handleClose = () => {
    if (!isHoverDropdown.current) {
      setIsOpen(false);
    }
  };

  const handleSelectOption = (option: AutoCompleteOption, focusIndex: number) => {
    setSelected(option);
    setInputText(option.label);
    setIsOpen(false);
    setFocus(focusIndex);
    isHoverDropdown.current = false;
    onSelected?.(option);
  };

  const handleInputChange = (input: string) => {
    setInputText(input);
    setSelected(null);
    handleOpen();
    onSelected?.(null);
  };

  const handleScrollToFocus = (index: number) => {
    const fixedListHalf = FIXED_LIST_HEIGHT / 2 - FIXED_ITEM_HEIGHT / 2 - 4;
    const positionFromTop = index * FIXED_ITEM_HEIGHT - fixedListHalf;
    listRef?.scrollTo({ top: positionFromTop });
  };

  /** This is not the best accecibility approach to make it possible for going through a List
   *  because there is no tabIndex ordering happening and therefore the actual list item doesn't hold any focus
   *  But to keep it short, since i don't have much time, this is still a user friendly working example
   * */
  const [focus, setFocus] = useState<number>(-1);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown" && focus < controlledOptions.length) {
        e.preventDefault();
        setFocus(focus + 1);

        handleScrollToFocus(focus + 1);
      } else if (e.key === "ArrowUp" && focus >= 0) {
        e.preventDefault();
        setFocus(focus - 1);

        handleScrollToFocus(focus - 1);
      } else if (
        (e.key === "Tab" || e.key === "Enter") &&
        focus >= 0 &&
        focus < controlledOptions.length
      ) {
        handleSelectOption(controlledOptions[focus], focus);
      }
    },
    [controlledOptions, focus, setFocus]
  );

  useEffect(() => {
    handleScrollToFocus(focus);
  }, [listRef])

  return (
    <div
      onKeyDown={handleKeyDown}
      className="deel-AutoComplete"
      ref={wrapperRef}
    >
      <TextInput
        onFocus={handleOpen}
        onBlur={handleClose}
        onChange={(e) => handleInputChange(e.target.value)}
        value={inputText}
        isLoading={isLoading}
        {...rest}
      />

      {isOpen && (
        <ul
          ref={setListRef}
          onMouseEnter={() => (isHoverDropdown.current = true)}
          onMouseLeave={() => (isHoverDropdown.current = false)}
          style={{
            width: wrapperRef.current?.offsetWidth || "auto",
            maxHeight: FIXED_LIST_HEIGHT,
          }}
        >
          {/* A better approach here would be a virtual list, removing and adding DOM items
           * wether if they are visible or not, to handle large amounts of data. I didn't wanted to go too deep and
           * re-invent the wheel creating a list virtualizer.
           *
           * So since i'm not allowed to use any third party libs, this is enough for this case.
           */}
          {(controlledOptions.length &&
            controlledOptions.map((option, index) => (
              <li
                style={{ height: FIXED_ITEM_HEIGHT }}
                data-focus={index === focus}
                data-selected={option.label === selected?.label}
                onClick={() => handleSelectOption(option, index)}
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
