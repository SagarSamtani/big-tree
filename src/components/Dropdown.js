import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ handleSelectChange, options, type, value }) => {
  return (
    <select
      value={value}
      className="right-dropdwons"
      onChange={event => {
        handleSelectChange(type, event);
      }}>
      {options}
    </select>
  );
};

Dropdown.propTypes = {
  handleSelectChange: PropTypes.func,
  options: PropTypes.array,
  type: PropTypes.string,
  value: PropTypes.oneOfType(['number', 'string'])
  // value: PropTypes.string
};

export default Dropdown;
