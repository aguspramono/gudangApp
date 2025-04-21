import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

  
  export const getDepartmenCount = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}departemen/datacount?like=${wherelike}`,{
          headers:headers
        }
      );

      return response.data.countdepartemen;
    } catch (error) {
      return error;
    }
  };

  export const getDetailDepartemen = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}departemen/detail?id=${wherelike}`,{
          headers:headers
        }
      );

      return response.data.datadepartemen;
    } catch (error) {
      return error;
    }
  };

  export const getDepartemen = async (wherelike:string,pageprev:number,page:number) => {
      try {
        const response = await axios.get(
          `${baseUrl}departemen?like=${wherelike}&pageprev=${pageprev}&page=${page}`,{headers:headers}
        );
  
        return response.data.datadepartemen;
      } catch (error) {
        return error;
      }
    };


    export const getDataAllDepartemen = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}departemen/all`,{headers:headers}
        );
  
        return response.data.datadepartemen;
      } catch (error) {
        return error;
      }
    };

  export const createDepartemen = async (Departemen:string,Keterangan:string,TglUbah= new Date(),Username:string) => {
      try {
        var postData = {
            Departemen:Departemen,
            Keterangan: Keterangan,
            TglUbah:TglUbah,
            Username: Username,
        };

        const response = await axios.post(
          `${baseUrl}departemen/save`,postData, {headers:headers});
  
        return response.data;
      } catch (error) {
        return error;
      }
    };

    export const updateDepartemen = async (Departemen:string,Keterangan:string,TglUbah= new Date(),Username:string) => {
      try {
        var postData = {
            Keterangan: Keterangan,
            TglUbah:TglUbah,
            Username: Username,
        };

        const response = await axios.post(
          `${baseUrl}departemen/update/${Departemen}`,postData, {headers:headers});
  
        return response.data;
      } catch (error) {
        return error;
      }
    };

    export const deleteDepartemen = async (depart:string) => {
      try {
        const response = await axios.get(
          `${baseUrl}departemen/delete?id=${depart}`,
          {
            headers: headers,
          }
        );
  
        return response.data;
      } catch (error) {
        return error;
      }
    };