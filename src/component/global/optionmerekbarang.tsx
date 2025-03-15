import Select from "react-select";
import { useState, useEffect } from "react";
import { getAllMerk } from "./../../function/Merk";

export const Optionmerkbarang = (props: any) => {
  const [merek, setMerek] = useState([]);

  async function getDataMerek() {
    const response = await getAllMerk();
    let merekdata = response.map((item: any) => {
      return { value: item.Merek, label: item.Merek };
    });

    setMerek(merekdata);
  }

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (event: any) => {
    props.onChange(event.value);
    setSelectedOption(event.value);
  };

  useEffect(() => {
    getDataMerek();
  }, []);

  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={handleChange}
        options={merek}
        placeholder={"Pilih Merek"}
        value={merek.filter(function (option: any) {
          return option.value === props.state;
        })}
      />
    </div>
  );
};
