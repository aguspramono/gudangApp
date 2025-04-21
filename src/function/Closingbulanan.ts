import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

  
  export const closingbulanan = async (periode:string,tanggal:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}closingbulanan?periode=${periode}&tgl=${tanggal}`,{
          headers:headers
        }
      );

      return response.data;
    } catch (error) {
      return error;
    }
  };





