import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

  
  export const getStokDistribusi = async (gudang:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}stockdistribusi?gudang=${gudang}`,{
          headers:headers
        }
      );

      return response.data.datastokdistribusi;
    } catch (error) {
      return error;
    }
  };

