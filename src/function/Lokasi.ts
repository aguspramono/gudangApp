import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

  
  export const getLokasiCount = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}lokasi/datacount?like=${wherelike}`,{
          headers:headers
        }
      );

      return response.data.countlokasi;
    } catch (error) {
      return error;
    }
  };

  export const getDetailLokasi = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}lokasi/detail?id=${wherelike}`,{
          headers:headers
        }
      );

      return response.data.datalokasi;
    } catch (error) {
      return error;
    }
  };

  export const getLokasi = async (wherelike:string,pageprev:number,page:number) => {
      try {
        const response = await axios.get(
          `${baseUrl}lokasi?like=${wherelike}&pageprev=${pageprev}&page=${page}`,{headers:headers}
        );
  
        return response.data.datalokasi;
      } catch (error) {
        return error;
      }
    };

  export const createLokasi = async (Lokasi:string,Keterangan:string,TglUbah= new Date(),Username:string) => {
      try {
        var postData = {
            Lokasi:Lokasi,
            Keterangan: Keterangan,
            TglUbah:TglUbah,
            Username: Username,
        };

        const response = await axios.post(
          `${baseUrl}lokasi/save`,postData, {headers:headers});
  
        return response.data;
      } catch (error) {
        return error;
      }
    };

    export const updateLokasi = async (Lokasi:string,Keterangan:string,TglUbah= new Date(),Username:string) => {
      try {
        var postData = {
            Keterangan: Keterangan,
            TglUbah:TglUbah,
            Username: Username,
        };

        const response = await axios.post(
          `${baseUrl}lokasi/update/${Lokasi}`,postData, {headers:headers});
  
        return response.data;
      } catch (error) {
        return error;
      }
    };

    export const deleteLokasi = async (lok:string) => {
      try {
        const response = await axios.get(
          `${baseUrl}lokasi/delete?id=${lok}`,
          {
            headers: headers,
          }
        );
  
        return response.data;
      } catch (error) {
        return error;
      }
    };