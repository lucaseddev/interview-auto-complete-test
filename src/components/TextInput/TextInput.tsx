import React from "react";

import "./TextInput.styles.scss";

export interface TextInputProps {}

export const TextInput = React.forwardRef(function TextInput(
  props: TextInputProps,
  ref?: React.Ref<HTMLInputElement>
) {
  return (
    <div className="deel-TextInput">
      <input />
    </div>
  );
});
