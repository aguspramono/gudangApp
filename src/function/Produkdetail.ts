import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};


export const createProductDetail = async (Kode:string) => {
    try {
      var postData = {};

      const response = await axios.post(
        `${baseUrl}productdetail/save/${Kode}`,postData, {headers:headers});

      return response.data;
    } catch (error) {
      return error;
    }
  };