import Select from "react-select";
import { useState, useEffect } from "react";
import { getDataKategori } from "./../../function/Kategori";

export const Optionkategoribarang = (props: any) => {
  const [kategori, setKategori] = useState([]);

  async function getDatakategori() {
    const response = await getDataKategori();
    let kategoridata = response.map((item: any) => {
      return { value: item.Kategori, label: item.Kategori };
    });

    setKategori(kategoridata);
  }

  const [selectedOption, setSelectedOption] = useState("ALAT LISTRIK");

  const handleChange = (event: any) => {
    props.onChange(event.value);
    setSelectedOption(event.value);
  };

  useEffect(() => {
    getDatakategori();
  }, []);

  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={handleChange}
        options={kategori}
        placeholder={"Pilih Kategori"}
        value={kategori.filter(function (option: any) {
          return option.value === props.state;
        })}
      />
    </div>
  );
};
