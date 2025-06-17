import Select from "react-select";
import { useState, useEffect } from "react";
import { getAllLokasi } from "./../../function/Lokasi";

export const Optionstatus = (props: any) => {
  const [status, setStatus] = useState([]);

  async function getDatastatus() {
    const response = await getAllLokasi();
    let statusdata = response.map((item: any) => {
      return { value: item.Lokasi, label: item.Lokasi };
    });

    setStatus(statusdata);
  }

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (event: any) => {
    props.onChange(event.value);
    setSelectedOption(event.value);
  };

  useEffect(() => {
    getDatastatus();
  }, []);

  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={handleChange}
        options={status}
        placeholder={"Pilih Status"}
        value={status.filter(function (option: any) {
          return option.value === props.state;
        })}
      />
    </div>
  );
};
