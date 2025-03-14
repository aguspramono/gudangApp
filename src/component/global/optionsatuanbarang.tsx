import Select from "react-select";
import { useState, useEffect } from "react";
import { getDataallsatuan } from "./../../function/Satuan";

export const Optionsatuanbarang = (props: any) => {
  const [satuan, setSatuan] = useState([]);

  async function getDatasatuan() {
    const response = await getDataallsatuan();
    let satuandata = response.map((item: any) => {
      return { value: item.Satuan, label: item.Satuan };
    });

    setSatuan(satuandata);
  }

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (event: any) => {
    props.onChange(event.value);
    setSelectedOption(event.value);
  };

  useEffect(() => {
    getDatasatuan();
  }, []);

  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={handleChange}
        options={satuan}
      />
    </div>
  );
};
