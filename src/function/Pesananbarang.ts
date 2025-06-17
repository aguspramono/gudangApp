import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

export const getPesananBarang = async (wherelike:string,pageprev:number,page:number,option:string,filter:string,tanggaldari:string,tanggalsampai:string,bulan:string,tahun:string) => {
  try {
    const response = await axios.get(
      `${baseUrl}stockpesanan/all?like=${wherelike}&pageprev=${pageprev}&page=${page}&option=${option}&filter=${filter}&tanggaldari=${tanggaldari}&tanggalsampai=${tanggalsampai}&bulan=${bulan}&tahun=${tahun}`,{headers:headers}
    );

    return response.data.datastockpesanan;
  } catch (error) {
    return error;
  }
};

export const getPesananCount = async (wherelike:string,option:string,filter:string,tanggaldari:string,tanggalsampai:string,bulan:string,tahun:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}stockpesanan/datacount?like=${wherelike}&option=${option}&filter=${filter}&tanggaldari=${tanggaldari}&tanggalsampai=${tanggalsampai}&bulan=${bulan}&tahun=${tahun}`,{
          headers:headers
        }
      );
  
      return response.data.countStockPesanan;
    } catch (error) {
      return error;
    }
  };

  export const getPesananDetailBarang = async (wherelike:string,pageprev:number,page:number,option:string,filter:string,tanggaldari:string,tanggalsampai:string,bulan:string,tahun:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}stockpesanandetail/all?like=${wherelike}&pageprev=${pageprev}&page=${page}&option=${option}&filter=${filter}&tanggaldari=${tanggaldari}&tanggalsampai=${tanggalsampai}&bulan=${bulan}&tahun=${tahun}`,{headers:headers}
      );
  
      return response.data.datapesananbarangdetail;
    } catch (error) {
      return error;
    }
  };
  
  export const getPesananDetailCount = async (wherelike:string,option:string,filter:string,tanggaldari:string,tanggalsampai:string,bulan:string,tahun:string) => {
      try {
        const response = await axios.get(
          `${baseUrl}stockpesanandetail/datacount?like=${wherelike}&option=${option}&filter=${filter}&tanggaldari=${tanggaldari}&tanggalsampai=${tanggalsampai}&bulan=${bulan}&tahun=${tahun}`,{
            headers:headers
          }
        );
    
        return response.data.countStockPesananDetail;
      } catch (error) {
        return error;
      }
    };


    export const getPesananDetailByID = async (wherelike:string,kodebarang:string) => {
      try {
        const response = await axios.get(
          `${baseUrl}stockpesanandetail/detail?id=${wherelike}&kodebarang=${kodebarang}`,{
            headers:headers
          }
        );
    
        return response.data.dataStockPesananDetail;
      } catch (error) {
        return error;
      }
    };

    export const getPesananDetailTglClosing = async (wherelike:string) => {
      try {
        const response = await axios.get(
          `${baseUrl}stockpesanandetail/detailtglclosing?id=${wherelike}`,{
            headers:headers
          }
        );
    
        return response.data.dataStockPesananDetail;
      } catch (error) {
        return error;
      }
    };


    export const getPesananDetailNopesOnly = async (wherelike:string) => {
      try {
        const response = await axios.get(
          `${baseUrl}stockpesanandetail/detailnopesonly?id=${wherelike}`,{
            headers:headers
          }
        );
    
        return response.data.dataStockPesananDetail;
      } catch (error) {
        return error;
      }
    };

    export const getPesananbyID = async (wherelike:string) => {
      try {
        const response = await axios.get(
          `${baseUrl}stockpesanan/detail?id=${wherelike}`,{
            headers:headers
          }
        );
    
        return response.data.dataStockPesanan;
      } catch (error) {
        return error;
      }
    };

    export const deleteDatapesanan = async(nopo:string) =>{
      try {
        const response = await axios.get(
          `${baseUrl}stockpesanan/delete?id=${nopo}`,{
            headers:headers
          }
        );
    
        return response.data;
      } catch (error) {
        return error;
      }
    }

    export const deleteDatapesanandetail = async(nopo:string) =>{
      try {
        const response = await axios.get(
          `${baseUrl}stockpesanandetail/delete?id=${nopo}`,{
            headers:headers
          }
        );
    
        return response.data;
      } catch (error) {
        return error;
      }
    }

    export const insertpesanan = async(NoPesanan:string,Tgl:string,Gudang:string,Keterangan:string,TglUbah:string,Username:string)=>{
      try {
        var postData = {
          NoPesanan:NoPesanan,
          Tgl: Tgl,
          Gudang:Gudang,
          Keterangan: Keterangan,
          TglUbah:TglUbah,
          Username:Username,
        };
    
        const response = await axios.post(
          `${baseUrl}stockpesanan/save`,postData, {headers:headers});
    
        return response.data;
      } catch (error) {
        return error;
      }
    }

    export const insertpesanandetail = async(mydata:any,departemen:string,nomorpesanan:string)=>{
      try {
        var postData = {
          data:mydata,
          depart:departemen,
          nomorpesanan:nomorpesanan
        };
    
        const response = await axios.post(
          `${baseUrl}stockpesanandetail/savebatch`,postData, {headers:headers});
    
        return response.data;
      } catch (error) {
        return error;
      }
    }
   



