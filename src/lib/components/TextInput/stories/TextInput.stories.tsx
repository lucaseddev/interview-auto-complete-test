import React from "react";
import { Meta, Story } from "@storybook/react";

import { TextInput as TextInputComponent, TextInputProps } from "../TextInput";

export default {
  title: "Components/TextInput",
  component: TextInputComponent,
} as Meta;

const Template: Story<TextInputProps> = (args) => (
  <TextInputComponent {...args} />
);

export const TextInput = Template.bind({});
