import React from "react";
import { Meta, Story } from "@storybook/react";

import {
  AutoComplete as AutoCompleteComponent,
  AutoCompleteProps,
} from "../AutoComplete";

export default {
  title: "Components/Auto-Complete",
  component: AutoCompleteComponent,
} as Meta;

const Template: Story<AutoCompleteProps> = (args) => (
  <AutoCompleteComponent {...args} />
);

export const AutoComplete = Template.bind({});
