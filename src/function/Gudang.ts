import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

  
  export const getGudangCount = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}gudang/datacount?like=${wherelike}`,{
          headers:headers
        }
      );

      return response.data.countgudang;
    } catch (error) {
      return error;
    }
  };

  export const getDetailGudang = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}gudang/detail?id=${wherelike}`,{
          headers:headers
        }
      );

      return response.data.datagudang;
    } catch (error) {
      return error;
    }
  };

  export const getGudang = async (wherelike:string,pageprev:number,page:number) => {
      try {
        const response = await axios.get(
          `${baseUrl}gudang?like=${wherelike}&pageprev=${pageprev}&page=${page}`,{headers:headers}
        );
  
        return response.data.datagudang;
      } catch (error) {
        return error;
      }
    };

  export const createGudang = async (Gudang:string,Keterangan:string,TglUbah= new Date(),Username:string) => {
      try {
        var postData = {
            Gudang:Gudang,
            Keterangan: Keterangan,
            TglUbah:TglUbah,
            Username: Username,
        };

        const response = await axios.post(
          `${baseUrl}gudang/save`,postData, {headers:headers});
  
        return response.data;
      } catch (error) {
        return error;
      }
    };

    export const updateGudang = async (Gudang:string,Keterangan:string,TglUbah= new Date(),Username:string) => {
      try {
        var postData = {
            Keterangan: Keterangan,
            TglUbah:TglUbah,
            Username: Username,
        };

        const response = await axios.post(
          `${baseUrl}gudang/update/${Gudang}`,postData, {headers:headers});
  
        return response.data;
      } catch (error) {
        return error;
      }
    };

    export const deleteGudang = async (gudang:string) => {
      try {
        const response = await axios.get(
          `${baseUrl}gudang/delete?id=${gudang}`,
          {
            headers: headers,
          }
        );
  
        return response.data;
      } catch (error) {
        return error;
      }
    };