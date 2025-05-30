import { AutoComplete, Select } from "antd";
import PhoneInput from "react-phone-input-2";
import { useMemo, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import countryList from "react-select-country-list";

export default function SearchRideAutocomplete() {
  const [selected, setSelected] = useState(null);
  console.log("selected", selected);
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };
  console.log(options);
  return (
    <div>
      <ReactFlagsSelect
        selected={selected}
        onSelect={(code, e) => console.log(code, e)}
        searchable
        showSelectedLabel={false}
        showOptionLabel={false}
      />
      {/* <Select
        options={options}
        value={value}
        onChange={changeHandler}
        showSearch
      /> */}
      <AutoComplete options={options} value={value} onChange={changeHandler} />
    </div>
  );
}
