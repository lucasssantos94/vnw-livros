/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

import styles from "./style.module.scss";

const CustomDatalist = forwardRef(
  (
    { options, placeholder, name, value = "", onChange, onBlur, error },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(value);
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
      onChange(e);
      setShowDropdown(true);
    };

    const handleOptionClick = (option) => {
      setInputValue(option);
      onChange({ target: { name, value: option } });
      setShowDropdown(false);
    };

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
        if (onBlur) onBlur(e);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [handleClickOutside]);

    // Expose a `reset` function to the parent using ref
    useImperativeHandle(ref, () => ({
      reset: () => setInputValue(""),
    }));

    return (
      <div className={styles["custom-datalist"]} ref={containerRef}>
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          autoComplete="off"
        />
        {showDropdown && (
          <ul className={styles["options-list"]}>
            {options
              .filter((option) =>
                option.toLowerCase().includes((inputValue || "").toLowerCase()),
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
        {error && <span className="error-message">{error.message}</span>}
      </div>
    );
  },
);

export default CustomDatalist;
