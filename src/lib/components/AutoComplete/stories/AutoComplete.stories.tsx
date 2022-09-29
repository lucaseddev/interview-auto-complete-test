import React from "react";
import { Meta, Story } from "@storybook/react";

import {
  AutoComplete as AutoCompleteComponent,
  AutoCompleteProps,
} from "../AutoComplete";

import { remoteSearchMovies } from '../../../../app/usecases'

export default {
  title: "Components/Auto-Complete",
  component: AutoCompleteComponent,
} as Meta;

const Template: Story<AutoCompleteProps> = (args) => (
  <AutoCompleteComponent {...args} />
);

export const AutoComplete = Template.bind({});
AutoComplete.args = {
  options: [
    { label: "Mango" },
    { label: "Apple" },
    { label: "Orange" },
    { label: "Tomato" },
    { label: "This is an apple" },
    { label: "Here we have a tomato" },
    { label: "Carrot" },
  ],
};

export const AutoCompleteAsyncFetch = Template.bind({});
AutoCompleteAsyncFetch.args = {
  filter: async (search: string) => remoteSearchMovies(search),
};
