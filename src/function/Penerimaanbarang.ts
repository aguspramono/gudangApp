import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

export const getPurchBarang = async (wherelike:string,pageprev:number,page:number,option:string,filter:string,tanggaldari:string,tanggalsampai:string,bulan:string,tahun:string) => {
  try {
    const response = await axios.get(
      `${baseUrl}stockpurch/all?like=${wherelike}&pageprev=${pageprev}&page=${page}&option=${option}&filter=${filter}&tanggaldari=${tanggaldari}&tanggalsampai=${tanggalsampai}&bulan=${bulan}&tahun=${tahun}`,{headers:headers}
    );

    return response.data.dataStockPurch;
  } catch (error) {
    return error;
  }
};

export const getPurchCount = async (wherelike:string,option:string,filter:string,tanggaldari:string,tanggalsampai:string,bulan:string,tahun:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}stockpurch/datacount?like=${wherelike}&option=${option}&filter=${filter}&tanggaldari=${tanggaldari}&tanggalsampai=${tanggalsampai}&bulan=${bulan}&tahun=${tahun}`,{
          headers:headers
        }
      );
  
      return response.data.countStockPurch;
    } catch (error) {
      return error;
    }
};

export const getRpurchbyivnum = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}stockpurch/detailbyivnum?ivnum=${wherelike}`,{
          headers:headers
        }
      );
  
      return response.data.dataStockRPurch;
    } catch (error) {
      return error;
    }
};

export const getPurchbyivnum = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}stockpurch/detail?id=${wherelike}`,{
          headers:headers
        }
      );
  
      return response.data.dataStockPurch;
    } catch (error) {
      return error;
    }
};

export const getPurchdetailbyivnum = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}stockpurchdetail/detail?id=${wherelike}`,{
          headers:headers
        }
      );
  
      return response.data.dataStockPurchDetail;
    } catch (error) {
      return error;
    }
};



export const getHutanglunasbyivnum = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}stocklunashutang/detailbyivnum?ivnum=${wherelike}`,{
          headers:headers
        }
      );
  
      return response.data.dataStockLunasHutang;
    } catch (error) {
      return error;
    }
};

export const getCekRpurchbyivnum = async (wherelike:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}stockpurch/detailcekbyivnum?ivnum=${wherelike}`,{
          headers:headers
        }
      );
  
      return response.data.dataStockPurch;
    } catch (error) {
      return error;
    }
};




export const insertpurch = async(InvNum:string,Tgl:string,sNo_Acc:string,PayDueDay:number,NominalDisc:number,NominalPPn:number,Disc:number,PPn:number ,Keterangan:string,TglUbah:string,Username:string)=>{
  try {
    var postData = {
      InvNum:InvNum,
      Tgl: Tgl,
      sNo_Acc:sNo_Acc,
      PayDueDay: PayDueDay,
      NominalPPn:NominalPPn,
      NominalDisc:NominalDisc,
      Disc: Disc,
      PPn: PPn,
      Keterangan:Keterangan,
      TglUbah:TglUbah,
      Username:Username,
    };

    const response = await axios.post(
      `${baseUrl}stockpurch/save`,postData, {headers:headers});

    return response.data;
  } catch (error) {
    return error;
  }
}

export const insertpurchdetail = async(mydata:any,gudang:string,invoice:string)=>{
  try {
    var postData = {
      data:mydata,
      gudang:gudang,
      invoice:invoice 
    };

    const response = await axios.post(
      `${baseUrl}stockpurchdetail/savebatch`,postData, {headers:headers});

    return response.data;
  } catch (error) {
    return error;
  }
}



export const deletePurch = async(noinv:string) =>{
  try {
    const response = await axios.get(
      `${baseUrl}stockpurch/delete?id=${noinv}`,{
        headers:headers
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
}

export const deleteDetailPurch = async(noinv:string) =>{
  try {
    const response = await axios.get(
      `${baseUrl}stockpurchdetail/delete?id=${noinv}`,{
        headers:headers
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
}







