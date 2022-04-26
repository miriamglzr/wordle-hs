import React from 'react';
import PropTypes from 'prop-types';
import './Letterbox.css';

export default function Letterbox({
  correctLetter,

  size,
  label,
  misplacedLetter,
  incorrectLetter,
  ...props
}) {
  const mode = correctLetter
    ? 'storybook-letterbox--correctLetter'
    : misplacedLetter
        ? 'storybook-letterbox--misplacedLetter'
        : 'storybook-letterbox--incorrectLetter';
  return (
    <div
      className={[
        'storybook-letterbox',
        `storybook-letterbox--${size}`,
        mode,
      ].join (' ')}
      {...props}
    >
      {label}
    </div>
  );
}

Letterbox.propTypes = {
  size: PropTypes.oneOf (['small', 'medium', 'large']),
};
