import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

export const getOrderBarang = async (wherelike:string,pageprev:number,page:number,option:string,filter:string,tanggaldari:string,tanggalsampai:string,bulan:string,tahun:string) => {
  try {
    const response = await axios.get(
      `${baseUrl}stockpo/alldata?like=${wherelike}&pageprev=${pageprev}&page=${page}&option=${option}&filter=${filter}&tanggaldari=${tanggaldari}&tanggalsampai=${tanggalsampai}&bulan=${bulan}&tahun=${tahun}`,{headers:headers}
    );

    return response.data.datastockpo;
  } catch (error) {
    return error;
  }
};

export const getPoCount = async (wherelike:string,option:string,filter:string,tanggaldari:string,tanggalsampai:string,bulan:string,tahun:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}stockpo/datacount?like=${wherelike}&option=${option}&filter=${filter}&tanggaldari=${tanggaldari}&tanggalsampai=${tanggalsampai}&bulan=${bulan}&tahun=${tahun}`,{
          headers:headers
        }
      );
  
      return response.data.countStockPo;
    } catch (error) {
      return error;
    }
  };

export const getDataPo = async(nopo:string) =>{
  try {
    const response = await axios.get(
      `${baseUrl}stockpo/detail?id=${nopo}`,{
        headers:headers
      }
    );

    return response.data.dataStockPo;
  } catch (error) {
    return error;
  }
}


export const getDataPoDetail = async(nopo:string) =>{
  try {
    const response = await axios.get(
      `${baseUrl}stockpodetail/detail?id=${nopo}`,{
        headers:headers
      }
    );

    return response.data.dataStockPoDetail;
  } catch (error) {
    return error;
  }
}


export const deleteDatapo = async(nopo:string) =>{
  try {
    const response = await axios.get(
      `${baseUrl}stockpo/delete?id=${nopo}`,{
        headers:headers
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
}

export const deleteDataDetailpo = async(nopo:string) =>{
  try {
    const response = await axios.get(
      `${baseUrl}stockpodetail/delete?id=${nopo}`,{
        headers:headers
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
}

export const insertpo = async(NoPo:string,Tgl:string,sNo_Acc:string,PayDueDay:number,Gudang:string,Disc:number,PPn:number ,NominalPPn:number,NominalDisc:number,Keterangan:string,TglUbah:string,Username:string)=>{
  try {
    var postData = {
      NoPo:NoPo,
      Tgl: Tgl,
      sNo_Acc:sNo_Acc,
      PayDueDay: PayDueDay,
      Gudang: Gudang,
      Disc: Disc,
      PPn: PPn,
      NominalPPn:NominalPPn,
      NominalDisc:NominalDisc,
      Keterangan:Keterangan,
      TglUbah:TglUbah,
      Username:Username,
    };

    const response = await axios.post(
      `${baseUrl}stockpo/save`,postData, {headers:headers});

    return response.data;
  } catch (error) {
    return error;
  }
}


export const insertpodetail = async(mydata:any,departemen:string,nopo:string)=>{
  try {
    var postData = {
      data:mydata,
      depart:departemen,
      nopo:nopo 
    };

    const response = await axios.post(
      `${baseUrl}stockpodetail/savebatch`,postData, {headers:headers});

    return response.data;
  } catch (error) {
    return error;
  }
}

export const getItemDetailPo = async (wherelike:string,pageprev:number,page:number,option:string,filter:string,tanggaldari:string,tanggalsampai:string,bulan:string,tahun:string) => {
  try {
    const response = await axios.get(
      `${baseUrl}stockpodetail/itempo?like=${wherelike}&pageprev=${pageprev}&page=${page}&option=${option}&filter=${filter}&tanggaldari=${tanggaldari}&tanggalsampai=${tanggalsampai}&bulan=${bulan}&tahun=${tahun}`,{headers:headers}
    );

    return response.data.dataStockPoDetail;
  } catch (error) {
    return error;
  }
};


export const getItemDetailPoCount = async (wherelike:string,option:string,filter:string,tanggaldari:string,tanggalsampai:string,bulan:string,tahun:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}stockpodetail/datacount?like=${wherelike}&option=${option}&filter=${filter}&tanggaldari=${tanggaldari}&tanggalsampai=${tanggalsampai}&bulan=${bulan}&tahun=${tahun}`,{
          headers:headers
        }
      );
  
      return response.data.countStockPoDetail;
    } catch (error) {
      return error;
    }
  };

  export const getDataPoDetailWithKodeBarang = async(nopo:string,kode:string) =>{
  try {
    const response = await axios.get(
      `${baseUrl}stockpodetail/detailwithkodebarang?id=${nopo}&kodebarang=${kode}`,{
        headers:headers
      }
    );

    return response.data.dataStockPoDetail;
  } catch (error) {
    return error;
  }
}






