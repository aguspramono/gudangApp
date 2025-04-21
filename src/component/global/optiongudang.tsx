import Select from "react-select";
import { useState, useEffect } from "react";
import { getAllDataGudang } from "./../../function/Gudang";

export const Optiongudang = (props: any) => {
  const [gudang, setGudang] = useState([]);

  async function getDataGudang() {
    const response = await getAllDataGudang();
    let gudangdata = response.map((item: any) => {
      return { value: item.Gudang, label: item.Gudang };
    });

    setGudang(gudangdata);
  }

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: any) => {
    props.onChange(event.value);
    setSelectedOption(event.value);
  };

  useEffect(() => {
    getDataGudang();
  }, []);

  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={handleChange}
        options={gudang}
        placeholder={"Gudang"}
        value={gudang.filter(function (option: any) {
          return option.value === props.state;
        })}
      />
    </div>
  );
};
