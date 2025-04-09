import PropTypes from "prop-types";
import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
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
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange && onChange({ target: { name, value: newValue } });
      setShowDropdown(true);
    };

    const handleOptionClick = (option) => {
      setInputValue(option);
      onChange && onChange({ target: { name, value: option } });
      setShowDropdown(false);
    };

    const handleClickOutside = useCallback(
      (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
          setShowDropdown(false);
          onBlur && onBlur(e);
        }
      },
      [onBlur],
    );

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [handleClickOutside]);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setInputValue("");
        onChange && onChange({ target: { name, value: "" } });
      },
      setValue: (value) => {
        setInputValue(value);
        onChange && onChange({ target: { name, value } });
      },
      getValue: () => inputValue,
      focus: () => {
        containerRef.current?.querySelector("input")?.focus();
      },
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
          aria-invalid={!!error}
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
        {error && (
          <span className={styles["error-message"]}>{error.message}</span>
        )}
      </div>
    );
  },
);

CustomDatalist.displayName = "CustomDatalist";

CustomDatalist.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.object,
};

export default CustomDatalist;
