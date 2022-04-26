import React from 'react';

import Letterbox from './Letterbox';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Letterbox',
  component: Letterbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = args => <Letterbox {...args} />;

export const Size = Template.bind ({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Size.args = {
  correctLetter: false,
  misplacedLetter: false,
  incorrectLetter: false,
  label: 'S',
};

export const IncorrectLetter = Template.bind ({});
IncorrectLetter.args = {
  label: 'I',
  incorrectLetter: true,
};

export const CorrectLetter = Template.bind ({});
CorrectLetter.args = {
  size: 'large',
  label: 'C',
  correctLetter: true,
  misplacedLetter: false,
  incorrectLetter: false,
};

export const MisplacedLetter = Template.bind ({});
MisplacedLetter.args = {
  size: 'small',
  label: 'M',
  misplacedLetter: true,
  correctLetter: false,
  incorrectLetter: false,
};
