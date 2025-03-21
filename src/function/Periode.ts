import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

  export const getPeriode = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}periode`,{
          headers:headers
        }
      );

      return response.data.dataperiode;
    } catch (error) {
      return error;
    }
  };  

  export const getPeriodeAktif = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}periode/data`,{
          headers:headers
        }
      );

      return response.data.dataperiode;
    } catch (error) {
      return error;
    }
  };  

    export const updatePeriode = async (id:number) => {
      try {
        var postData = {};

        const response = await axios.post(
          `${baseUrl}periode/update/${id}`,postData, {headers:headers});
  
        return response.data;
      } catch (error) {
        return error;
      }
    };

