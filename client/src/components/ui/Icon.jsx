import React from 'react';
import PropTypes from 'prop-types';

export default function Icon({ onClick, name, className }) {
  return (
    <div className="flex items-center justify-center" onClick={onClick}>
      <ion-icon name={name} class={className} />
    </div>
  );
}

Icon.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
