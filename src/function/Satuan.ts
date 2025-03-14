import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

  
  export const getSatuanCount = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}satuan/datacount?like=${wherelike}`,{
          headers:headers
        }
      );

      return response.data.countsatuan;
    } catch (error) {
      return error;
    }
  };

  export const getDataallsatuan = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}satuan/all`,{
          headers:headers
        }
      );

      return response.data.datasatuan;
    } catch (error) {
      return error;
    }
  };

  export const getDetailSatuan = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}satuan/detail?id=${wherelike}`,{
          headers:headers
        }
      );

      return response.data.datasatuan;
    } catch (error) {
      return error;
    }
  };

  export const getSatuan = async (wherelike:string,pageprev:number,page:number) => {
      try {
        const response = await axios.get(
          `${baseUrl}satuan?like=${wherelike}&pageprev=${pageprev}&page=${page}`,{headers:headers}
        );
  
        return response.data.datasatuan;
      } catch (error) {
        return error;
      }
    };

  export const createSatuan = async (Satuan:string,Keterangan:string,TglUbah= new Date(),Username:string) => {
      try {
        var postData = {
            Satuan:Satuan,
            Keterangan: Keterangan,
            TglUbah:TglUbah,
            Username: Username,
        };

        const response = await axios.post(
          `${baseUrl}satuan/save`,postData, {headers:headers});
  
        return response.data;
      } catch (error) {
        return error;
      }
    };

    export const updateSatuan = async (Satuan:string,Keterangan:string,TglUbah= new Date(),Username:string) => {
      try {
        var postData = {
            Keterangan: Keterangan,
            TglUbah:TglUbah,
            Username: Username,
        };

        const response = await axios.post(
          `${baseUrl}satuan/update/${Satuan}`,postData, {headers:headers});
  
        return response.data;
      } catch (error) {
        return error;
      }
    };

    export const deleteSatuan = async (satuan:string) => {
      try {
        const response = await axios.get(
          `${baseUrl}satuan/delete?id=${satuan}`,
          {
            headers: headers,
          }
        );
  
        return response.data;
      } catch (error) {
        return error;
      }
    };