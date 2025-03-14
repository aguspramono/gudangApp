import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

export const getProduk = async (wherelike:string,pageprev:number,page:number,option:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}product?like=${wherelike}&pageprev=${pageprev}&page=${page}&option=${option}`,{headers:headers}
      );

      return response.data.dataproduct;
    } catch (error) {
      return error;
    }
  };


  export const getProdukCount = async (wherelike:string,option:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}product/datacount?like=${wherelike}&option=${option}`,{
          headers:headers
        }
      );

      return response.data.countproduct;
    } catch (error) {
      return error;
    }
  };
