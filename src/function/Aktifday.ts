import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

  
  export const getAktifday = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}aktifday`,{
          headers:headers
        }
      );

      return response.data.dataaktifday;
    } catch (error) {
      return error;
    }
  };

  export const updateAktifDay = async (primaryk:number,Tgl=new Date(),TglUbah=new Date(),Username:string) => {
    try {
        var postData = {
            Tgl: Tgl,
            TglUbah:TglUbah,
            Username: Username
          };
    
          const response = await axios.post(
            `${baseUrl}aktifday/update/${primaryk}`,postData, {headers:headers});
    
          return response.data;
    } catch (error) {
      return error;
    }
  };




