import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

  
  export const getSupplierNoFilt = async (wherelike:string,option:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}supplier?like=${wherelike}&option=${option}`,{
          headers:headers
        }
      );

      return response.data.countsupplier;
    } catch (error) {
      return error;
    }
  };

  export const getSupplierId = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}supplierid?id=${wherelike}`,{
          headers:headers
        }
      );

      return response.data.datasupplier;
    } catch (error) {
      return error;
    }
  };

  export const getMaxNoAcc = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}maxnoacc`,{headers:headers}
      );

      return response.data.maxnosupp;
    } catch (error) {
      return error;
    }
  };


  export const getSupplier = async (wherelike:string,pageprev:number,page:number,option:string) => {
      try {
        const response = await axios.get(
          `${baseUrl}filtersupplier?like=${wherelike}&pageprev=${pageprev}&page=${page}&option=${option}`,{headers:headers}
        );
  
        return response.data.datasupplier;
      } catch (error) {
        return error;
      }
    };

  export const createSupplier = async (sNo_Acc:string,Nama:string,Alamat:string,Kota:string,Phone:string,Email:string,TglUbah= new Date(),Username:string,Person:string) => {
      try {
        var postData = {
          sNo_Acc:sNo_Acc,
          Nama: Nama,
          Alamat: Alamat,
          Kota: Kota,
          Phone: Phone,
          Email: Email,
          TglUbah:TglUbah,
          Username: Username,
          Person: Person,
        };

        const response = await axios.post(
          `${baseUrl}savesupplier`,postData, {headers:headers});
  
        return response.data;
      } catch (error) {
        return error;
      }
    };

    export const updateSupplier = async (sNo_Acc:string,Nama:string,Alamat:string,Kota:string,Phone:string,Email:string,TglUbah= new Date(),Username:string,Person:string) => {
      try {
        var postData = {
          Nama: Nama,
          Alamat: Alamat,
          Kota: Kota,
          Phone: Phone,
          Email: Email,
          TglUbah:TglUbah,
          Username: Username,
          Person: Person,
        };

        const response = await axios.post(
          `${baseUrl}supplier/update/${sNo_Acc}`,postData, {headers:headers});
  
        return response.data;
      } catch (error) {
        return error;
      }
    };

    export const deleteSupplier = async (noacc:string) => {
      try {
        const response = await axios.get(
          `${baseUrl}supplier/delete?id=${noacc}`,
          {
            headers: headers,
          }
        );
  
        return response.data;
      } catch (error) {
        return error;
      }
    };