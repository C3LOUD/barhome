import React from 'react';
import PropTypes from 'prop-types';

export default function Icon({ onClick, name, className }) {
  return (
    <button
      className="flex items-center justify-center"
      onClick={onClick}
      type="button"
    >
      <ion-icon name={name} class={className} />
    </button>
  );
}

Icon.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

Icon.defaultProps = {
  onClick: (e) => {
    e.preventDefault();
    e.stopPropagation();
  },
};
