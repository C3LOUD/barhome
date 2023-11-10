import React from 'react';
import PropTypes from 'prop-types';

export default function Icon({ onClick, name, style }) {
  return (
    <div className="flex items-center justify-center" onClick={onClick}>
      <ion-icon name={name} class={style} />
    </div>
  );
}

Icon.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
};
