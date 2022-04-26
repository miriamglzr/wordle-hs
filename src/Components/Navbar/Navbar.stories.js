import React from 'react';

import Navbar from './Navbar';

export default {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = args => <Navbar {...args} />;

export const Title = Template.bind ({});
Title.args = {
  label: 'Foodle',
};

export const Color = Template.bind ({});
Color.args = {
  backgroundColor: 'gray',
  color: 'white',
};
