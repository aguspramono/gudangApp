import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

export const getStockOut = async (wherelike:string,pageprev:number,page:number,option:string,filter:string,tanggaldari:string,tanggalsampai:string,bulan:string,tahun:string) => {
  try {
    const response = await axios.get(
      `${baseUrl}stockout/all?like=${wherelike}&pageprev=${pageprev}&page=${page}&option=${option}&filter=${filter}&tanggaldari=${tanggaldari}&tanggalsampai=${tanggalsampai}&bulan=${bulan}&tahun=${tahun}`,{headers:headers}
    );

    return response.data.dataStockOut;
  } catch (error) {
    return error;
  }
};

export const getStockOutCount = async (wherelike:string,option:string,filter:string,tanggaldari:string,tanggalsampai:string,bulan:string,tahun:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}stockout/datacount?like=${wherelike}&option=${option}&filter=${filter}&tanggaldari=${tanggaldari}&tanggalsampai=${tanggalsampai}&bulan=${bulan}&tahun=${tahun}`,{
          headers:headers
        }
      );
  
      return response.data.countStockOut;
    } catch (error) {
      return error;
    }
}; 

export const insertStockOut = async(mydata:any,gudang:string,tanggal:string,invoice:string,departemen:string,keterangan:string,status:string,keGudang:string,TglUbah:string,Username:string)=>{
  try {
    var postData = {
      data:mydata,
      gudang:gudang,
      tanggal:tanggal,
      invoice:invoice,
      departemen:departemen,
      keterangan:keterangan,
      status:status,
      keGudang:keGudang,
      TglUbah:TglUbah,
      Username:Username
    };

    const response = await axios.post(
      `${baseUrl}stockout/save`,postData, {headers:headers});

    return response.data;
  } catch (error) {
    return error;
  }
}
