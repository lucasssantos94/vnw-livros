/* eslint-disable react/prop-types */
import { useState } from "react";

import styles from "./style.module.scss";

const CustomDatalist = ({ options, placeholder, name, value, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    onChange(e);
    setShowDropdown(true);
  };

  const handleOptionClick = (option) => {
    onChange({ target: { name, value: option } });
    setShowDropdown(false);
  };

  return (
    <div className={styles["custom-datalist"]}>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
        autoComplete="off"
      />
      {showDropdown && (
        <ul className={styles["options-list"]}>
          {options
            .filter((option) =>
              option.toLowerCase().includes(value.toLowerCase()),
            )
            .map((option, index) => (
              <li
                key={index}
                className={styles["option-item"]}
                onMouseDown={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDatalist;
