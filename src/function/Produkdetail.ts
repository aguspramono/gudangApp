import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};


export const createProductDetail = async (Kode:string,Gudang:string,sAwal:number) => {
    try {
      var postData = {
        Kode:Kode,
        Gudang: Gudang,
        sAwal:sAwal,
      };

      const response = await axios.post(
        `${baseUrl}productdetail/save`,postData, {headers:headers});

      return response.data;
    } catch (error) {
      return error;
    }
  };