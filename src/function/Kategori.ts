import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

  
  export const getKategoriCount = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}kategori/datacount?like=${wherelike}`,{
          headers:headers
        }
      );

      return response.data.countkategori;
    } catch (error) {
      return error;
    }
  };

  export const getDataKategori = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}kategori/all`,{
          headers:headers
        }
      );

      return response.data.datakategori;
    } catch (error) {
      return error;
    }
  };

  export const getDetailKategori = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}kategori/detail?id=${wherelike}`,{
          headers:headers
        }
      );

      return response.data.datakategori;
    } catch (error) {
      return error;
    }
  };

  export const getKategori = async (wherelike:string,pageprev:number,page:number) => {
      try {
        const response = await axios.get(
          `${baseUrl}kategori?like=${wherelike}&pageprev=${pageprev}&page=${page}`,{headers:headers}
        );
  
        return response.data.datakategori;
      } catch (error) {
        return error;
      }
    };

  export const createKategori = async (Kategori:string,t_NoAkunStock:string,t_NoAkunKas:string,t_NoAkunHutang:string,k_NoAkunBiaya:string,k_NoAkunStock:string,a_NoAkunBiaya:string,a_NoAkunStock:string,Keterangan:string,TglUbah= new Date(),Username:string) => {
      try {
        var postData = {
            Kategori:Kategori,
            t_NoAkunStock: t_NoAkunStock,
            t_NoAkunKas:t_NoAkunKas,
            t_NoAkunHutang: t_NoAkunHutang,
            k_NoAkunBiaya: k_NoAkunBiaya,
            k_NoAkunStock: k_NoAkunStock,
            a_NoAkunBiaya: a_NoAkunBiaya,
            a_NoAkunStock:a_NoAkunStock,
            Keterangan:Keterangan,
            TglUbah:TglUbah,
            Username:Username,
        };

        const response = await axios.post(
          `${baseUrl}kategori/save`,postData, {headers:headers});
  
        return response.data;
      } catch (error) {
        return error;
      }
    };

    export const updateKategori = async (Kategori:string,t_NoAkunStock:string,t_NoAkunKas:string,t_NoAkunHutang:string,k_NoAkunBiaya:string,k_NoAkunStock:string,a_NoAkunBiaya:string,a_NoAkunStock:string,Keterangan:string,TglUbah= new Date(),Username:string) => {
      try {
        var postData = {
            t_NoAkunStock: t_NoAkunStock,
            t_NoAkunKas:t_NoAkunKas,
            t_NoAkunHutang: t_NoAkunHutang,
            k_NoAkunBiaya: k_NoAkunBiaya,
            k_NoAkunStock: k_NoAkunStock,
            a_NoAkunBiaya: a_NoAkunBiaya,
            a_NoAkunStock:a_NoAkunStock,
            Keterangan:Keterangan,
            TglUbah:TglUbah,
            Username:Username,
        };

        const response = await axios.post(
          `${baseUrl}kategori/update/${Kategori}`,postData, {headers:headers});
  
        return response.data;
      } catch (error) {
        return error;
      }
    };

    export const deleteKategori = async (kateg:string) => {
      try {
        const response = await axios.get(
          `${baseUrl}kategori/delete?id=${kateg}`,
          {
            headers: headers,
          }
        );
  
        return response.data;
      } catch (error) {
        return error;
      }
    };