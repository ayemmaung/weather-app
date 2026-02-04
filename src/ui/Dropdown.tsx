import DropdownIcon from "@assets/images/icon-dropdown.svg";
import CheckMarkIcon from "@assets/images/icon-checkmark.svg";
import Button from "./Button";
import { useState } from "react";
import DropdownItem from "./DropdownItem";
import { Options } from "@/types/dropdown";

type DropdownProps = {
  title?: string;
  placeholder?: string;
  icon?: string;
  options: Options[];
  selectedValue?: string | {};
  onChange?: Function;
};

const Dropdown = ({
  title,
  placeholder,
  icon,
  options = [],
  selectedValue,
  onChange,
}: DropdownProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDropdown = () => {
    setIsExpanded((prev) => !prev);
  };

  const dropdownItemOnChange = (item: {
    label: string;
    value: string;
    key?: string;
  }) => {
    onChange(item);
    setIsExpanded(false);
  };

  return (
    <div className="dropdown-container">
      <Button className="dropdown-btn" type="custom" onClick={toggleDropdown}>
        {icon && (
          <img
            width={15}
            src={icon}
            alt="dropdown icon"
            className="dropdown-icon"
          />
        )}
        <span>{placeholder}</span>
        <img
          width={15}
          src={DropdownIcon}
          alt="Dropdown Icon"
          className={`dropdown-icon ${isExpanded ? "rotated" : ""}`}
        />
      </Button>
      {isExpanded && (
        <ul className="dropdown-select-options">
          {title && <div className="dropdown-title">{title}</div>}
          {options.map((option, index) => {
            return (
              <DropdownItem
                key={index}
                {...option}
                selectedValue={selectedValue}
                onChange={dropdownItemOnChange}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
