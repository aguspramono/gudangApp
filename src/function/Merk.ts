import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

  
  export const getMerkCount = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}merk/datacount?like=${wherelike}`,{
          headers:headers
        }
      );

      return response.data.countmerk;
    } catch (error) {
      return error;
    }
  };

  export const getDetailMerk = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}merk/detail?id=${wherelike}`,{
          headers:headers
        }
      );

      return response.data.datamerk;
    } catch (error) {
      return error;
    }
  };

  export const getMerk = async (wherelike:string,pageprev:number,page:number) => {
      try {
        const response = await axios.get(
          `${baseUrl}merk?like=${wherelike}&pageprev=${pageprev}&page=${page}`,{headers:headers}
        );
  
        return response.data.datamerk;
      } catch (error) {
        return error;
      }
    };

  export const createMerk = async (Merek:string,Keterangan:string,TglUbah= new Date(),Username:string) => {
      try {
        var postData = {
            Merek:Merek,
            Keterangan: Keterangan,
            TglUbah:TglUbah,
            Username: Username,
        };

        const response = await axios.post(
          `${baseUrl}merk/save`,postData, {headers:headers});
  
        return response.data;
      } catch (error) {
        return error;
      }
    };

    export const updateMerk = async (Merek:string,Keterangan:string,TglUbah= new Date(),Username:string) => {
      try {
        var postData = {
            Keterangan: Keterangan,
            TglUbah:TglUbah,
            Username: Username,
        };

        const response = await axios.post(
          `${baseUrl}merk/update/${Merek}`,postData, {headers:headers});
  
        return response.data;
      } catch (error) {
        return error;
      }
    };

    export const deleteMerk = async (merk:string) => {
      try {
        const response = await axios.get(
          `${baseUrl}merk/delete?id=${merk}`,
          {
            headers: headers,
          }
        );
  
        return response.data;
      } catch (error) {
        return error;
      }
    };