import { Option, Options } from "@/types/dropdown";
import CheckMarkIcon from "@assets/images/icon-checkmark.svg";

type DropdownItemProps = {
  title?: string;
  type?: string;
  groupKey?: string;
  options: Option[];
  children?: Options[];
  selectedValue?: string | {};
  onChange?: Function;
};

const DropdownItem = ({
  title,
  type,
  groupKey,
  options,
  children,
  selectedValue,
  onChange,
}: DropdownItemProps) => {
  const isSelected = (value: string) => {
    return selectedValue && value === selectedValue;
  };

  if (type === "toggle") {
    const selectedOption = selectedValue[groupKey];
    options = options.filter((opt) => opt.value !== selectedOption);
    return (
      <>
        <div className="dropdown-toggle">
          {options.map((option, index) => {
            const { label, value } = option;
            return (
              <li
                key={index}
                className={`dropdown-option ${isSelected(value) ? "selected" : ""}`}
                onClick={() => onChange({ ...option, groupKey })}
              >
                {label}
              </li>
            );
          })}
        </div>
        {children &&
          children.map((child, index) => {
            const selectedChild =
              selectedValue[child.groupKey] || selectedOption;
            return (
              <DropdownItem
                key={index.toString()}
                {...child}
                selectedValue={selectedChild}
                onChange={onChange}
              />
            );
          })}
      </>
    );
  }

  return (
    <div className={type ? `dropdown-item ${type}` : "dropdown-item"}>
      {title && <label className="dropdown-option-label">{title}</label>}
      {options.map((option, index) => {
        const { label, value } = option;
        return (
          <li
            key={index}
            className={`dropdown-option ${isSelected(value) ? "selected" : ""}`}
            onClick={() => onChange({ ...option, groupKey })}
          >
            <span>{label}</span>
            {isSelected(value) && (
              <img
                width={15}
                src={CheckMarkIcon}
                alt="Checkmark Icon"
                className="checkmark-icon"
              />
            )}
          </li>
        );
      })}
    </div>
  );
};

export default DropdownItem;
