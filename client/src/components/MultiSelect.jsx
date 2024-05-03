import React, { useState } from 'react';
import Select from 'react-select';

const MultiSelect = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
    const selectedIds = selected.map(option => option.value);
    onChange(selectedIds);
  };

  const selectOptions = options.map(option => ({
    value: option.id,
    label: option.nombre
  }));

  return (
    <Select
      isMulti={true}
      options={selectOptions}
      value={selectedOptions}
      onChange={handleSelectChange}
    />
  );
};

export default MultiSelect;