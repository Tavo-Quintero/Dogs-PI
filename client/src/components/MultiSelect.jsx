import React, { useState } from 'react';
import Select from 'react-select';

const MultiSelect = ({ options, name, onChange, value }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
    const selectedIds = selected.map(option => option.value);
    onChange({
      target: {
        name: name,
        value: selectedIds
      }
    });
  };

  const selectOptions = options.map(option => ({
    value: option.id,
    label: option.nombre
  }));

  const selectedValues = selectOptions.filter(option => value.includes(option.value));

  return (
      <Select
          isMulti={true}
          options={selectOptions}
          value={selectedValues}
          onChange={handleSelectChange}
      />
  );
};

export default MultiSelect;