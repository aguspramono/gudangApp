import Select from "react-select";
import { useState, useEffect } from "react";
import { getDataAllDepartemen } from "./../../function/Departemen";

export const Optiondepartemen = (props: any) => {
  const [depart, setDepart] = useState([]);

  async function getDataDepartemen() {
    const response = await getDataAllDepartemen();
    let departdata = response.map((item: any) => {
      return { value: item.Departemen, label: item.Departemen };
    });

    setDepart(departdata);
  }

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: any) => {
    props.onChange(event.value);
    setSelectedOption(event.value);
  };

  useEffect(() => {
    getDataDepartemen();
  }, []);

  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={handleChange}
        options={depart}
        placeholder={"Departemen"}
        value={depart.filter(function (option: any) {
          return option.value === props.state;
        })}
      />
    </div>
  );
};
