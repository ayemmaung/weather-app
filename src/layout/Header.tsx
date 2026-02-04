import Dropdown from "@/ui/Dropdown";
import UIHeader from "@ui/Header";
import UnitsIcon from "@assets/images/icon-units.svg";
import { HEADER_DROPDOWN_OPTIONS } from "@/data";
import { useWeatherContext } from "@/context/useWeatherContext";

const Header = () => {
  const { units, toggleUnit } = useWeatherContext();
  return (
    <UIHeader>
      <Dropdown
        placeholder="Units"
        icon={UnitsIcon}
        selectedValue={units}
        options={HEADER_DROPDOWN_OPTIONS}
        onChange={toggleUnit}
      />
    </UIHeader>
  );
};

export default Header;
